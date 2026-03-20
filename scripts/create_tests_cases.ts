import fs from "fs"

function generateMaestroTest() {
  return `appId: com.luisetin.myerasmus
---
- launchApp
- tapOn:
    id: touchable-button
- assertVisible:
    id: input-field
`
}

function run() {
  console.log("Generando test Maestro...")

  const yaml = generateMaestroTest()

  fs.writeFileSync("maestro_test.yaml", yaml)

  console.log("Test generado correctamente")
}

run()