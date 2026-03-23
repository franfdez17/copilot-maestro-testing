# Automation Scripts

The project relies on two main Node.js scripts located in the `scripts/` directory to facilitate the end-to-end automation pipeline.

---

## `add_ids_4_testing.ts`

### How It Works
This script acts as a static analysis tool that traverses the application's source code files (specifically React components) and injects `testID` properties into UI elements that require testing visibility.

### Regex Approach
Instead of relying on heavy Abstract Syntax Tree (AST) parsers, the script utilizes a fast Regex parsing approach. It scans for component declarations and standard React Native element blocks like `<TextInput>` or `<TouchableOpacity>`. It checks for the existence of `testID` to prevent duplicated effort and modifies the code block string directly before rewriting to disk.

### Semantic Naming
To ensure tests are scalable and understandable by human developers reviewing test logs, test IDs are not randomly generated UUIDs. The script enforces semantic naming. Test IDs encapsulate contextual details—such as the surrounding component name or its semantic function within the screen hierarchy to form clear identifiers (e.g., `Input-Username` or `Button-Submit`).

---

## `create_tests_cases.ts`

### How It Works
Once the source code has been instrumented with `testID` properties, this script reads those modified files, identifies the context, and generates valid executable test flows tailored for Maestro testing pipelines.

### Grouping by Screen
It extracts all the matching `testID` references across the codebase and logically groups them by screen. By classifying these identifiers based on the visual screen scope, it understands what elements act together as part of a single user journey.

### `findId` Logic
The script applies specific `findId` helper logic. Since we know components on a login screen usually include an email input and a login button, `findId` looks up matching strings in the parsed IDs array to dynamically correlate extracted `testID` metadata into testing commands (like identifying the exact string for a `tapOn` action corresponding to a login submit event).

### Fallback System
Given that component structures vary, the script includes a deterministic fallback system. If standard mapping fails or predictable elements are missing, it falls back to broader search criteria, attempting to assign valid interactions to any available actionable elements to ensure the output Maestro flow remains structurally sound and runnable.
