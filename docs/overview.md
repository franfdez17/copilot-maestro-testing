# Project Overview

## What Problem This Project Solves
Writing and maintaining End-to-End (E2E) tests for mobile applications is traditionally a manual, time-consuming, and brittle process. Developers often forget to add `testID` attributes to interactive elements, leading to test failures when UI structures change. Furthermore, writing the actual test scripts requires continuous context switching between the application code and the testing framework setup.

## Why Automated E2E Generation Matters
Automating the generation of E2E tests introduces several critical benefits:
- **Consistency**: Ensures that all interactable elements have standardized identifiers.
- **Speed**: Drastically reduces the time required to scaffold and write test flows for new screens.
- **Maintainability**: When the UI changes, regenerating tests keeps the testing suite up to date with minimal manual intervention.
- **Developer Experience**: Frees developers to focus on feature implementation rather than writing boilerplate testing code.

## Short Explanation of the Pipeline
This project solves the E2E bottleneck through a two-step automation pipeline:
1. **Code Modification**: Automatically scanning React Native code and deterministically injecting `testID` props into required elements using Regex approaches.
2. **Test Generation**: Scanning the newly modified code, extracting the active `testID`s grouped by screen, and mapping them to predefined user journeys to output runnable Maestro YAML test specifications.
