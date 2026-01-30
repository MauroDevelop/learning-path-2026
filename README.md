# Learning Path Backend 2026


<div align="center">

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)


</div>
He decidido formarme profesionalmente como desarrollador Backend, por lo que en este repositorio estaré agregando mis avances y prácticas. Mi objetivo principal es aprender Backend dedicándole horas diarias de estudio constante durante un periodo de 3 meses.

## Objetivos
* **Meta Final**: Desarrollar una aplicación web funcional que incorpore todo lo aprendido en este periodo.
* **Foco Actual**: Dominio de TypeScript y entornos de trabajo modernos.
* **Experiencia Previa**: Manejo de JavaScript y nociones de PHP.

## Estructura del Mes 01: Fundamentos
El proyecto está dividido en módulos prácticos:
* **01-introduction**: Variables y tipos de datos básicos.
* **02-functions-and-objects**: Arreglos, tuplas, enums y estructuras de objetos.
* **03-advanced-filtering**: Lógica de filtrado avanzado usando `Partial` y `Omit`.
* **04-modules**: Organización de servicios y exportación de interfaces.
* **05-array-practice**: Práctica intensiva de procesamiento de datos (`filter`, `map`, `find`).
* **06-enums-types**: Gestión de transacciones y estados con tipos de unión.
* **01-introduction**: Tipado estático básico (primitivos) y estructuras de control.
* **02-functions-and-objects**: Tipado fuerte en funciones, Arreglos, Tuplas y modelado de Objetos.
* **03-advanced-filtering**: Interfaces avanzadas, Type Guards, Utility Types (`Partial`, `Omit`) y filtrado complejo.
* **04-modules**: Modularización con ES Modules, encapsulamiento de lógica y separación de tipos.
* **05-array-practice**: Manipulación inmutable de datos con métodos de Array (`map`, `filter`, `find`).
* **06-enums-types**: Gestión de estados finitos con `Enums` y Union Types.
* **07-asynchrony-and-promises**: Manejo de asincronía, `Promises` y patrón `Async/Await` con manejo de errores.
* **08-express-basics**: Inicialización de servidor Express, manejo de `Request`/`Response` y Query Params.
* **09-data-persistence**: Persistencia en FileSystem usando módulos nativos (`fs/promises`, `path`) en entorno ESM.
* **10-persistence-refresher**: Verificación de integridad de datos y creación recursiva de directorios.
* **11-config-management**: Gestión de variables de entorno y seguridad con `dotenv`.
* **12-rest-api-post**: Desarrollo de endpoints POST, Body Parsing y validación básica de entrada ("Guard Clauses").
* **13-full-crud-persistence**: Integración completa de API REST con persistencia física en JSON.
* **14-layered-architecture**: Implementación del patrón **Service Layer** y Programación Orientada a Objetos (POO).
* **15-repaso-general**: Consolidación de arquitectura: Servicios, Controladores y manipulación asíncrona de I/O.
* **16-validaciones-zod**: Validación robusta de esquemas en tiempo de ejecución (runtime) utilizando **Zod**.
* **17-poo-basics**: Introducción a Programación Orientada a Objetos (Clases, Herencia y Constructores).
* **18-centralized-error-handling**: Implementación de Middleware de errores y Clases de Error personalizadas (`AppError`).
* **19-unit-testing**: Introducción al Testing Unitario con **Jest**, configuración de entorno y aserciones básicas.

## Ejecución
Para probar cualquiera de los módulos, primero asegúrate de estar dentro de la carpeta del mes y sigue estos pasos:

### 1. Instalar dependencias (solo la primera vez)
```bash
cd month-01-foundations
npm install
```
### 2. Ejecutar un módulo específico
Utiliza los scripts definidos en el package.json para correr el código con tsx en modo watch:

Módulo 04 (ejemplo):
```bash
npm run dev:04
```

## Estructura del Repositorio

```text
.
├── month-01-foundations/
│   ├── 01-introduction/
│   ├── 02-functions-and-objects/
│   ├── 03-advanced-filtering/
│   ├── 04-modules/
│   ├── 05-array-practice/
│   ├── 06-enums-types/
│   ├── 07-asynchrony-and-promises/
│   ├── 08-express-basics/
│   ├── 09-data-persistence/
│   ├── 10-persistence-refresher/
│   ├── 11-config-management/
│   ├── 12-rest-api-post/
│   ├── 13-full-crud-persistence/
│   ├── 14-layered-architecture/
│   ├── 15-repaso-general/
│   ├── 16-validaciones-zod/
│   ├── 17-poo-basics/
│   ├── 18-centralized-error-handling/
│   └── 19-unit-testing/
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
 ```
 