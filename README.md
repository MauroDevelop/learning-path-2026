# Ruta de Aprendizaje Backend 2026


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
* **20-user-auth-validation**: Integración de validaciones (Zod), manejo de errores personalizados y Testing Unitario (Jest) en un flujo de registro.
* **21-password-hashing**: Introducción a la seguridad y criptografía. Hashing de contraseñas con **bcrypt** y verificación segura (Login Flow).
* **22-jwt-authentication**: Implementación de autenticación basada en Tokens (Stateless) utilizando **JSON Web Tokens (JWT)** para manejo de sesiones seguras.
* **23-middlewares-protection**: Creación de Middlewares de autorización para proteger rutas privadas y verificar la validez de los tokens en cada petición.
* **24-dependency-injection**: Desacoplamiento de componentes aplicando **Inyección de Dependencias**. Separación de la lógica de negocio de la implementación de base de datos.
* **25-api-integration-review**: **Arquitectura en Capas (Layered Architecture)**. Consolidación de todo lo aprendido creando un flujo completo (Controller -> Service -> Repository) con Entidades de dominio y Testing de integración (**Jest** + **Supertest**).
* **26-openapi-documentation**: Implementación de documentación automatizada bajo el estándar **OpenAPI 3.0** utilizando **Swagger UI** y generación de contratos a partir de código (JSDoc).

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
### 3. Ejecutar Tests (Pruebas Unitarias)
Este proyecto utiliza **Jest** para el testing unitario y de integración. Los tests están ubicados dentro de cada módulo junto a su código fuente.

Asegúrate de estar en la carpeta del mes 01:
```bash
cd month-01-foundations
```

**Comandos disponibles:**

**Ejecutar todos los tests:** (Verifica que todo el proyecto funcione bien)
```bash
npm run test
```
**Tests del Módulo 19 (Calculadora de Precios):**
```bash
npm run test:19
```

**Tests del Módulo 20 (Sistema de Registro & Validación):** 
```bash
npm run test:20
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
│   ├── 19-unit-testing/
│   ├── 20-user-auth-validation/
│   ├── 21-password-hashing/
│   ├── 22-jwt-authentication/
│   ├── 23-middlewares-protection/
│   ├── 24-dependency-injection/
│   ├── 25-api-integration-review/
│   └── 26-openapi-documentation/
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
 ```
 
## Estándar de Arquitectura (Layered Architecture)
A partir del Módulo 25, todos los desarrollos siguen una **Arquitectura en Capas** estricta. Este diseño busca separar las reglas de negocio de las herramientas externas (Express, Bases de Datos).

### Estructura de Carpetas
Cada módulo o funcionalidad debe respetar la siguiente organización dentro de `src/`:

```text
src/
├── core/                       # CAPA DE DOMINIO (El "Qué")
│   ├── entities/               # ➜ Clases puras que definen los datos (ej: User.ts, Product.ts)
│   └── interfaces/             # ➜ Contratos que deben cumplir los repositorios (Inversión de Dependencias)
│
├── services/                   # CAPA DE APLICACIÓN (El "Cómo")
│   └── [Name]Service.ts        # ➜ Lógica de negocio, validaciones y casos de uso.
│                               #    Solo se comunica con 'core' y nunca toca la BD directamente.
│
├── infrastructure/             # CAPA DE INFRAESTRUCTURA (Detalles Técnicos)
│   ├── controllers/            # ➜ Manejo de HTTP (req, res). Traduce peticiones web a llamadas de servicio.
│   └── repositories/           # ➜ Implementación real de la BD (Memoria, FS, SQL). Cumple las interfaces de 'core'.
│
├── middlewares/                # Validaciones transversales (Autenticación, Zod, Errores)
└── index.ts                    # PUNTO DE ENTRADA (Composition Root)
                                # ➜ Aquí se crean las instancias y se inyectan las    
                                dependencias manualmente.
```