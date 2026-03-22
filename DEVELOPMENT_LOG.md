# Development Log - 20/03/2026

## Summary of Work Completed Today

Today was focused on transforming a single-file React Native prototype into a professional, modular, and testable application with a premium UI/UX.

### 1. Modular Architecture Refactoring
- **Objective**: Improve maintainability and facilitate programmatic analysis.
- **Changes**:
    - Created `src/constants/theme.ts` for centralized design tokens.
    - Created `src/components/` for reusable atoms (`CustomInput`, `CustomButton`).
    - Created `src/screens/` for isolated functional logic (`LoginScreen`, `RegisterScreen`, `HomeScreen`).
    - Migrated the main entry point to consume these modular files.

### 2. Standardized Component Naming
- **Objective**: Enable script-based analysis without using `testID`.
- **Implementation**: Defined interactive elements using consistent variable names within the JSX (e.g., `emailInput`, `passwordInput`, `loginButton`, `addItemButton`).

### 3. Integrated Authentication Simulation
- **Objective**: Simulate real app behavior for end-to-end testing.
- **Features**:
    - **Registration Persistence**: Added state to store user credentials locally.
    - **Login Validation**: Implemented checks against the registered user data with specific error handling ("User not found", "Incorrect password").
    - **Protected Routing**: The Home screen is now locked behind a valid `loggedInUser` session.

### 4. UI/UX Overhaul (Indigo/Slate Theme)
- **Objective**: Create a high-end "startup" aesthetic.
- **Visuals**:
    - Centered card-based layouts for authentication forms.
    - Elevated dashboard cards with shadows and refined spacing.
    - High-contrast background (Slate 200) for better visibility.
- **Interactive UX**:
    - Focus states for inputs (glow and border transitions).
    - Loading spinners on primary actions.
    - Contextual feedback boxes (Success/Error) with iconography.

### 5. Project Relocation & Critical Fixes
- **Relocation**: Identified that the active project was in the `testApp` subdirectory and successfully migrated all modular files and the `expo-router` entry point.
- **Stability**: Resolved a critical "input focus jumping" bug by simplifying state management in `CustomInput` and stabilizing screen layouts using `ScrollView`.
- **Consistency**: Fixed missing imports (`TouchableOpacity`) and missing theme tokens (`white`, `black`).

---
**Status**: Application is stable, visually premium, and optimized for programmatic testing.
