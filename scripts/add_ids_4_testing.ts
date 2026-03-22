import fs from "fs";
import path from "path";

const screensPath = "./src/screens";
const targetElements = ["TextInput", "TouchableOpacity", "Pressable", "CustomInput", "CustomButton"];

function generateTestID(screenBase: string, elementType: string, propsText: string, index: number): string {
  const typeSuffixes: Record<string, string> = {
    TextInput: "input",
    CustomInput: "input",
    TouchableOpacity: "button",
    Pressable: "button",
    CustomButton: "button",
  };
  
  const suffix = typeSuffixes[elementType] || elementType.toLowerCase();
  
  // Attempt to extract meaningful context from placeholders, labels, or titles
  const contextMatch = propsText.match(/(?:placeholder|label|accessibilityLabel|name|title)=["']([^"']+)["']/i);
  let contextToken = "";
  if (contextMatch) {
    const matchedText = contextMatch[1];
    if (matchedText) {
      const firstWord = matchedText.split(' ')[0];
      if (firstWord) {
        contextToken = firstWord.toLowerCase().replace(/[^a-z0-9]/g, '');
      }
    }
  }

  // Deep fallback for implicit contexts in onPress or styles
  if (!contextToken) {
    const lowerProps = propsText.toLowerCase();
    if (lowerProps.includes('register')) contextToken = 'register';
    else if (lowerProps.includes('signup') || lowerProps.includes('sign up')) contextToken = 'signup';
    else if (lowerProps.includes('login') || lowerProps.includes('sign in')) contextToken = 'login';
    else if (lowerProps.includes('logout')) contextToken = 'logout';
    else if (lowerProps.includes('add')) contextToken = 'add';
  }
  
  if (contextToken) {
    return `${screenBase}_${contextToken}_${suffix}`;
  }
  
  return `${screenBase}_${suffix}_${index}`;
}

async function main() {
  const fullScreensPath = path.resolve(process.cwd(), screensPath);

  if (!fs.existsSync(fullScreensPath)) {
    console.warn(`Directory not found: ${fullScreensPath}`);
    return;
  }

  const files = fs.readdirSync(fullScreensPath);

  for (const file of files) {
    if (!file.endsWith(".tsx")) continue;

    console.log(`Processing file...`);
    const filePath = path.join(fullScreensPath, file);
    
    let code = fs.readFileSync(filePath, "utf-8");
    const originalCode = code;

    // Wipe all existing testIDs to ensure a perfectly deterministic and upgraded generation pass
    code = code.replace(/\stestID=["'][^"']+["']/g, '');

    // Derived screen name, e.g. "LoginScreen.tsx" -> "login"
    const screenNameMatch = file.match(/^(.+?)(Screen)?\.tsx$/);
    const screenBase = (screenNameMatch && screenNameMatch[1] ? screenNameMatch[1] : file.replace('.tsx', '')).toLowerCase();

    console.log("Adding testIDs...");

    let index = 1;
    for (const elementType of targetElements) {
      // RegEx to match the opening tag of elements, allowing multiline props.
      // Negative lookbehind (?<!=) prevents stopping at "=>" inside inline functions.
      const elementRegex = new RegExp(`<${elementType}(\\s+[\\s\\S]*?)?(?<!=)(/?>)`, 'g');
      
      code = code.replace(elementRegex, (match, propsStr: string, closingStr: string) => {
        const props = propsStr || "";
        
        // Do not break JSX or duplicate testIDs
        if (props.includes("testID=")) {
          index++;
          return match;
        }

        const testID = generateTestID(screenBase, elementType, props, index);
        index++;

        // Add proper spacing before the testID attribute, regardless of what follows
        return `<${elementType} testID="${testID}"${props}${closingStr}`;
      });
    }

    if (code !== originalCode) {
      fs.writeFileSync(filePath, code, "utf-8");
      console.log(`File updated`);
    }
  }
}

main().catch(console.error);