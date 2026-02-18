# Ruta de Aprendizaje Backend 2026

<div align="center">


</div>
He decidido formarme profesionalmente como desarrollador Backend, por lo que en este repositorio estaré agregando mis avances y prácticas. Mi objetivo principal es aprender Backend dedicándole horas diarias de estudio constante durante un periodo de 3 meses.

## Objetivos
* **Meta Final**: Desarrollar una aplicación web funcional que incorpore todo lo aprendido en este periodo.
* **Foco Actual**: Dominio de TypeScript y entornos de trabajo modernos.
* **Experiencia Previa**: Manejo de JavaScript y nociones de PHP.

## Stack Tecnológico

### Backend Core
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)

### Base de Datos
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)

### Testing & Calidad
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=flat-square)

### Seguridad & Validación
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square)
![bcrypt](https://img.shields.io/badge/bcrypt-003B57?style=flat-square)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square)

### Documentación
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square)

## 📁 Estructura Actual del Repositorio

```text
learning-path-2026/
│
├── month-01-foundations/
│   ├── api-evolution/     # Evolución progresiva de la API
│   ├── docs/              # Documentación técnica detallada del mes
│   ├── exercises/         # Ejercicios prácticos y fundamentos
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── jest.config.ts
│
├── .env.example
└── README.md
```

## Organización del Mes 01

El mes 01 está enfocado en fundamentos sólidos:

- Tipado avanzado con TypeScript
- Principios de Programación Orientada a Objetos
- Construcción progresiva de una API REST
- Aplicación de Arquitectura en Capas
- Testing y manejo centralizado de errores
- Integración con base de datos usando Prisma

La documentación técnica detallada (arquitectura, decisiones, estructura interna) se encuentra disponible en los siguientes documentos:

* 📖 **[Guía de Arquitectura](./month-01-foundations/docs/architecture.md)**: Explicación del patrón Layered Architecture y decisiones de diseño.
* 🛠 **[Guía de Setup y Ejecución](./month-01-foundations/docs/setup.md)**: Instrucciones paso a paso para clonar, instalar y ejecutar el entorno.
* 🗂 **[Índice de Módulos](./month-01-foundations/docs/modules.md)**: Desglose detallado de los 29 módulos y ejercicios realizados.

## Cómo Ejecutar el Proyecto

```bash
git clone https://github.com/MauroDevelop/learning-path-2026.git
cd learning-path-2026/month-01-foundations
npm install
npm run dev
```


## 🔒 Archivos Excluidos del Repositorio

Por motivos de seguridad y organización, los siguientes archivos y carpetas no se versionan:

- `node_modules/` → Dependencias instaladas
- `.env` → Variables de entorno y credenciales sensibles
- `data/` → Persistencia local en desarrollo
- `database.json`
- `productos.json`

Para configurar variables de entorno, utiliza un archivo `.env` basado en `.env.example` si está disponible.
