import fs from "fs"
import path from "path"

function addTestIdsManually(code: string) {
  return code
    .replace(/<TextInput/g, '<TextInput testID="input-field"')
    .replace(/<TouchableOpacity/g, '<TouchableOpacity testID="touchable-button"')
    .replace(/<Button/g, '<Button testID="button"')
    .replace(/<Pressable/g, '<Pressable testID="pressable"')
}

function run() {
  const filePath = path.join(process.cwd(), "example_screen.tsx")
  const code = fs.readFileSync(filePath, "utf8")

  console.log("Analizando código...")

  const modified = addTestIdsManually(code)

  fs.writeFileSync("output_with_ids.tsx", modified)

  console.log("testIDs añadidos correctamente")
}

run()