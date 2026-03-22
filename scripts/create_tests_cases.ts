import fs from "fs";
import path from "path";

const screensPath = path.resolve(process.cwd(), "./src/screens");
const outputPath = path.resolve(process.cwd(), "maestro-tests.yaml");

// Helper to find the best matching testID using keywords, while avoiding already used IDs
function findId(ids: string[] = [], keywords: string[], exclude: string[] = []): string {
  // Try to find the best match based on keywords
  for (const keyword of keywords) {
    const found = ids.find(id => id.includes(keyword) && !exclude.includes(id));
    if (found) return found;
  }
  
  // Fallback to any unused ID
  const fallback = ids.find(id => !exclude.includes(id));
  return fallback || "generated_unknown_id";
}

function scanTestIDs(): Record<string, string[]> {
  console.log("Scanning testIDs...");
  const result: Record<string, string[]> = {};
  
  if (!fs.existsSync(screensPath)) {
    console.warn(`Warning: Could not find screens directory at ${screensPath}`);
    return result;
  }

  const files = fs.readdirSync(screensPath).filter(f => f.endsWith('.tsx'));
  
  for (const file of files) {
    const screenBase = file.replace(/Screen\.tsx$/i, '').replace('.tsx', '').toLowerCase(); // login, register, home
    const content = fs.readFileSync(path.join(screensPath, file), "utf-8");
    
    // RegEx to find all testID="..." attributes
    const regex = /testID=["']([^"']+)["']/g;
    const ids: string[] = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      const matchId = match[1];
      if (matchId) ids.push(matchId);
    }
    
    if (ids.length > 0) {
      result[screenBase] = ids;
    }
  }
  
  return result;
}

function generateYaml(testIDs: Record<string, string[]>) {
  console.log("Generating tests...");
  
  const loginIds = testIDs['login'] || [];
  const homeIds = testIDs['home'] || [];
  const registerIds = testIDs['register'] || [];
  
  // Intelligently map discovered testIDs to test actions
  const emailInputId = findId(loginIds, ['email', 'user']);
  const passInputId = findId(loginIds, ['password', 'pass'], [emailInputId]);
  const loginBtnId = findId(loginIds, ['login', 'submit', 'signin', 'button'], [emailInputId, passInputId]);
  const registerBtnId = findId(loginIds, ['register', 'signup', 'create'], [emailInputId, passInputId, loginBtnId]);
  
  // Use a home screen element for successful login assertion (e.g. logout button)
  const homeElementId = findId(homeIds, ['logout', 'add', 'home']);

  // Use a register screen element
  const registerElementId = findId(registerIds, ['register', 'signup', 'name']);

  // Build the YAML string in Maestro format
  const yamlContent = `appId: com.copilotmaestro.testapp
---
# 1. Login success
- launchApp:
    clearState: true
- tapOn:
    id: "${emailInputId}"
- inputText: "test@example.com"
- tapOn:
    id: "${passInputId}"
- inputText: "password123"
- tapOn:
    id: "${loginBtnId}"
- assertVisible:
    id: "${homeElementId}"

---
# 2. Login failure
- launchApp:
    clearState: true
- tapOn:
    id: "${emailInputId}"
- inputText: "wrong@example.com"
- tapOn:
    id: "${passInputId}"
- inputText: "wrongpassword"
- tapOn:
    id: "${loginBtnId}"
- assertVisible: "Incorrect email or password"

---
# 3. Navigate to register
- launchApp:
    clearState: true
- tapOn:
    id: "${registerBtnId}"
- assertVisible:
    id: "${registerElementId}"
`;

  fs.writeFileSync(outputPath, yamlContent, "utf-8");
  console.log("Tests generated");
}

function main() {
  const idsMap = scanTestIDs();
  generateYaml(idsMap);
}

main();