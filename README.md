# Copilot Maestro Testing

## Description
A proof-of-concept project demonstrating the automation of mobile end-to-end (E2E) testing for React Native applications. It leverages a deterministic pipeline to automatically inject test identifiers into UI components and generate Maestro UI testing scripts.

## Goal of the Project
The primary goal is to simplify and automate the creation of E2E test cases for mobile applications. By automatically adding `testID` attributes to React Native components and subsequently parsing them to generate Maestro YAML flows, this project reduces manual testing overhead and creates a reliable, repeatable testing pipeline.

## How it Works (High Level)
The workflow consists of two main automated steps:
1. **Identification**: A script scans the React Native source code (e.g., screens and components) and injects unique `testID` props into interactive or structural elements.
2. **Generation**: A second script analyzes the updated components, extracts the injected `testID`s, and generates deterministic Maestro YAML test flows based on predefined templates and a fallback semantic system.

## How to Run
Follow these steps to execute the full pipeline and start the testing environment:

1. **Inject Test IDs into the source code:**
   ```bash
   npm run add-ids
   ```
2. **Generate Maestro Test Cases based on the injected IDs:**
   ```bash
   npm run create-tests
   ```
3. **Start the Expo development server:**
   ```bash
   npx expo start
   ```