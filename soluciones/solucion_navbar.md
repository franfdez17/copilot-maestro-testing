# Explicación: Solución de IDs en el Navbar

  

Este documento explica por qué los `testID` no funcionaban correctamente en el Navbar y cómo la solución actual garantiza una detección fiable para los tests de Maestro.

  

## El Problema: Propagación de IDs en React Navigation

  

Cuando usamos `createBottomTabNavigator` de `@react-navigation/bottom-tabs`, la propiedad estándar `tabBarTestID` a veces no se propaga correctamente a los elementos nativos de la interfaz, especialmente en entornos de **Expo Go**.

  

Esto ocurre porque:

1. **Abstracción del Navigatior**: El Navigator genera automáticamente los botones de la barra de pestañas.

2. **Jerarquía Nativa**: En Android, el `testID` puede quedar enterrado en un componente "contenedor" que no es el que recibe los eventos de clic del sistema.

3. **Optimización de Renderizado**: React Navigation intenta optimizar el árbol de componentes, lo que a veces hace que los atributos de testing se pierdan en la conversión a vistas nativas.

  

## La Solución: Views Anidados con testID

  

Para solucionar esto de forma definitiva, hemos aplicado una técnica de **View Injection**:

  

### 1. Intercepción del Botón

En lugar de dejar que React Navigation genere el botón por defecto, usamos la propiedad `tabBarButton`:

  

```jsx

tabBarButton: (props) => (

  <TouchableOpacity {...props}>

    <View testID="tab-home" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      {props.children}

    </View>

  </TouchableOpacity>

)

```

  

### 2. Por qué funciona ahora

*   **TouchableOpacity explícito**: Aseguramos que el componente que captura el toque sea un elemento estándar fácil de detectar.

*   **View Interno unívoco**: Al meter un `View` con el `testID` justo dentro del botón, garantizamos que el ID esté presente físicamente en el árbol de vistas que Maestro inspecciona.

*   **Jerarquía Plana**: Maestro puede buscar el `testID` "tab-home" y, al encontrarlo dentro de un elemento cliqueable, puede ejecutar el comando `tapOn` de forma precisa sin depender de coordenadas o texto que pueda cambiar con el idioma.

  

## Ajustes de Diseño (Centrado)

Hemos eliminado los desplazamientos manuales (`top: 12`) que causaban que los iconos se vieran "caídos" o descentrados. Ahora, la jerarquía de `View` con `flex: 1` y `justifyContent: 'center'` se encarga de que los iconos estén perfectamente alineados en el centro de la barra inferior.

  

---

**Nota**: Esta es una "best practice" en testing de React Native cuando los selectores automáticos de los frameworks de navegación fallan.