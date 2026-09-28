# Biblia Viva

**La Palabra contigo.**

Biblia Viva es una aplicación móvil de lectura y estudio bíblico, con una experiencia moderna y una identidad propia.

## Objetivo

Construir una aplicación para Android y iOS que permita leer la Biblia, buscar pasajes, guardar favoritos, crear notas y seguir planes de lectura.

## MVP

- Inicio y versículo del día
- Navegación por los 66 libros, capítulos y versículos
- Búsqueda bíblica
- Favoritos y resaltados
- Notas personales
- Planes de lectura con progreso local
- Navegación móvil inferior
- Arquitectura preparada para audio y sincronización

## Tecnología

- React Native
- Expo
- TypeScript
- Expo Router
- AsyncStorage
- GitHub Actions para verificación de TypeScript

## Contenido bíblico

La primera traducción seleccionada es **Reina-Valera 1909 (RV1909)**, identificada como de **dominio público** por eBible.org. La aplicación mantiene el contenido bíblico desacoplado del código para poder incorporar posteriormente otras traducciones con sus licencias correspondientes.

Fuente de referencia: https://ebible.org/details.php?id=spaRV1909

> El texto completo de RV1909 todavía debe importarse al repositorio de datos antes de sustituir el contenido de demostración del lector.

## Estado

MVP en desarrollo. La base de TypeScript pasa la verificación automática de GitHub Actions. Siguiente fase: importar RV1909, conectar capítulos reales, búsqueda por versículos y versículo del día dinámico.
