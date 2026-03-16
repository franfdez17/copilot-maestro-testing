# Copilot Maestro Testing PoC

This project demonstrates how to use the GitHub Copilot SDK to automate mobile testing for a React Native application.

## Features

1.  **`add_ids_4_testing.ts`**: Automatically adds `testID` attributes to interactive React Native components (TouchableOpacity, Pressable, Button, TextInput) using AI analysis.
2.  **`create_tests_cases.ts`**: Detects existing `testID` attributes and generates valid Maestro YAML end-to-end test cases.

## Installation

```bash
npm install
```

## Usage

### 1. Add Test IDs
Analyze the `example_screen.tsx` and add missing `testID` attributes:
```bash
node scripts/add_ids_4_testing.ts
```

### 2. Generate Maestro Tests
Detect `testID`s in the screen and generate a Maestro YAML test file:
```bash
node scripts/create_tests_cases.ts
```

## Project Structure

- `scripts/`: Implementation of the Copilot SDK automation.
- `example_screen.tsx`: A sample React Native screen used for demonstration.
- `package.json`: Project dependencies and configuration.
- `README.md`: Project documentation.
