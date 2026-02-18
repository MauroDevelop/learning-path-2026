# Arquitectura del Módulo 25

Este proyecto sigue una **Arquitectura en Capas (Layered Architecture)** para asegurar que el código sea ordenado, escalable y fácil de probar.

## Estructura de Carpetas

### 1. Core (`src/core/`)
Es el corazón de la aplicación. Aquí viven las reglas de negocio y los modelos de datos. No depende de librerías externas ni frameworks.
* **entities/**: Define los objetos de negocio (ej. `Todo.ts`). Son simples y puros.
* **interfaces/**: Define los contratos (ej. `ITodoRepository.ts`). Dice "qué" necesitamos hacer, pero no "cómo".

### 2. Services (`src/services/`)
Contiene la **Lógica de Negocio**.
* Los servicios son los "directores de orquesta".
* Reciben datos del controlador, validan reglas de negocio y llaman a los repositorios.
* Ejemplo: Verificar que una tarea no tenga título vacío antes de guardarla.

### 3. Infrastructure (`src/infrastructure/`)
Contiene los detalles técnicos y herramientas externas.
* **repositories/**: Implementación real de la base de datos (Memoria, Archivos, SQL).
* **controllers/**: Manejo de HTTP (Express). Reciben `req` y devuelven `res`.

### 4. Middlewares (`src/middlewares/`)
Funciones intermedias que se ejecutan antes de llegar a los controladores.
* Se usan para validación transversal (ej. Autenticación, Manejo de Errores).