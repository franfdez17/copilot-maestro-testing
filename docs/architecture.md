# Architecture

## Directory Structure
The repository is structured to separate source code from automation scripts and testing outputs:

### `src/screens/`
Contains the primary React Native application screens (e.g., `HomeScreen`, `LoginScreen`). These are the primary targets for our automated testID injection, as they dictate the distinct sections a user navigates between during E2E journeys.

### `src/components/`
Stores reusable UI components (e.g., `CustomButton`). The automation scripts analyze these to ensure nested or shared elements that are interacted with across multiple screens are adequately identified and given meaningful `testID` attributes.

### `scripts/`
Houses the core Node.js automation scripts responsible for the magic behind the scenes. This code is responsible for analyzing the React Native application, modifying the source code to inject IDs, and ultimately generating the Maestro test cases.

## How Code is Analyzed
Code analysis is performed statically via the scripts in the `scripts/` directory. Target analysis revolves around string and Regex parsing rather than full AST traversal, to maintain high flexibility and speed across a variety of React component syntaxes.

1. **Target Evaluation**: The analyzer maps over files stored in the `screens` and `components` directories.
2. **Pattern Matching**: Using robust regex parsing, it identifies React Native functional components and native UI elements that typically require interaction, like `TouchableOpacity` or `TextInput`.
3. **Transformation**: It looks for the presence of `testID` properties. If missing, it computes a semantic name based on the element type and surrounding environment, injecting the property.
4. **Extraction Check**: It extracts all explicit semantic strings used for generation in a deterministic manner.
