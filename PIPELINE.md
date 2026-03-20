# Pipeline de Testing Automatizado con Copilot + Maestro

## Objetivo

Construir un pipeline automatizado para generar tests E2E de una aplicación React Native utilizando Copilot como motor de generación y Maestro como framework de testing.

---

## Arquitectura del Pipeline

El sistema sigue un flujo secuencial donde el código fuente se transforma progresivamente hasta convertirse en tests ejecutables.


React Native Code
↓
add_ids_4_testing.ts
↓
Code with testIDs
↓
create_tests_cases.ts
↓
Maestro YAML
↓
Maestro CLI
↓
E2E Tests


---

## Componentes del Sistema

### 1. Input: Código React Native

Archivo de entrada con componentes de interfaz sin atributos de testing:


example_screen.tsx


Contiene elementos como:

- TextInput  
- TouchableOpacity  
- Button  
- Pressable  

---

### 2. Script: add_ids_4_testing.ts

Responsable de preparar el código para testing.

#### Funcionalidad:

- Analiza el código fuente  
- Detecta componentes interactivos  
- Añade atributos `testID` a cada elemento relevante  

#### Ejecución:


node add_ids_4_testing.ts


#### Output:


output_with_ids.tsx


#### Integración con IA:

Este paso puede usar Copilot (CLI o SDK) para:

- Generar nombres semánticos de testID  
- Adaptarse dinámicamente a la estructura del código  

---

### 3. Script: create_tests_cases.ts

Genera automáticamente los casos de test en formato Maestro.

#### Funcionalidad:

- Lee código con testIDs  
- Construye flujos de interacción  
- Genera YAML válido para Maestro  

#### Ejecución:


node create_tests_cases.ts


#### Output:


maestro_test.yaml


#### Ejemplo de salida:

```yaml
appId: com.luisetin.myerasmus
---
- launchApp
- tapOn:
    id: login-button
- assertVisible:
    id: home-screen
4. Ejecución de Tests

Los tests generados se ejecutan con Maestro:

maestro test maestro_test.yaml
Uso de Copilot
Copilot CLI

Permite generar contenido a partir de prompts directamente desde terminal.

Uso típico:

Generación de testIDs

Generación de YAML

Copilot SDK

Permite integrar Copilot dentro de scripts para automatizar completamente el flujo.

Diferencia clave:

CLI → interacción manual

SDK → integración programática dentro del pipeline

Flujo Automatizado

El objetivo final es ejecutar todo el proceso sin intervención manual:

node add_ids_4_testing.ts
node create_tests_cases.ts
maestro test maestro_test.yaml
Estado Actual

Pipeline definido e implementado

Scripts funcionales

Integración preparada para Copilot CLI y SDK

Ejecución dependiente de activación de Copilot (suscripción)

Próximos Pasos

Integrar completamente Copilot SDK como motor de generación

Recorrer automáticamente todas las pantallas del proyecto

Generar tests dinámicos sin reglas hardcodeadas

Integrar con MCP para exploración automática de la UI

Conclusión

Este proyecto implementa un sistema de generación automática de tests E2E basado en IA, donde:

El código fuente se transforma en tests ejecutables

Copilot actúa como motor de generación

Maestro ejecuta los tests