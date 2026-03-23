# The Automation Pipeline

This document explains the step-by-step flow of the automated testing pipeline.

## 1. React Native Code (Raw)
The process begins with standard React Native `.tsx` files located in the `src/` directory. These files outline everything from core components to comprehensive screens but currently lack explicit testing hooks (`testID` props), making deterministic testing impossible.

## 2. add_ids_4_testing.ts
The developer runs the first automation script: `npm run add-ids`.
- The script traverses targeting directories to read all the code.
- It parses the file content using string and regex operations to detect all interactable UI components.
- It determines logical test identification names.

## 3. Code with testIDs
The script proceeds to augment the `.tsx` files directly. It modifies the source string and writes the output back to disk. At this stage, components look like:
`<TouchableOpacity testID="LoginScreen-Button-Submit">`.
The app remains functionally identical but is now fully reachable and identifiable by testing frameworks.

## 4. create_tests_cases.ts
Next, the developer runs: `npm run create-tests`.
- This script targets the modified source code files.
- It analyzes the code explicitly extracting the newly added `testID` values, keeping track of grouping contextual ties.
- It utilizes predefined mapping to determine UI flow intentions (e.g., which `testID` acts as an interactable button and which is simply viewable text or an input box).

## 5. Maestro YAML
The test generator logic formats the retrieved context into a standard specification supported by Maestro. It outputs a `maestro-tests.yaml` containing the complete e2e scenarios.

## 6. Execution
The generated YAML artifact can now run. The developer uses the Maestro CLI natively (e.g., `maestro test maestro-tests.yaml`) directly against their running Expo mobile application. The testing loops trigger deterministic human-like actions based entirely on the generated AI-assisted layout context.
