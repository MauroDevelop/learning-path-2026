# Ruta de Aprendizaje Backend 2026

<div align="center">


</div>
He decidido formarme profesionalmente como desarrollador Backend, por lo que en este repositorio estaré agregando mis avances y prácticas. Mi objetivo principal es aprender Backend dedicándole horas diarias de estudio constante durante un periodo de 3 meses.


<br>



## Objetivos
* **Meta Final**: Desarrollar una aplicación web funcional que incorpore todo lo aprendido en este periodo.
* **Foco Actual**: Dominio de TypeScript y entornos de trabajo modernos.
* **Experiencia Previa**: Manejo de JavaScript y nociones de PHP.


<br>


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



<br>
<br>



## 📁 Estructura del Repositorio

```text
learning-path-2026/
│
├── months/                     # 📂 Carpeta contenedora de los módulos mensuales
│   ├── month-01-foundations/   #   Etapa 1: Fundamentos (Completado)
│   │   ├── docs/
│   │   ├── api-evolution/
│   │   └── exercises/
│   │
│   └── month-02-delivery-api/  #   Etapa 2: Proyecto Real (En Desarrollo)
│       ├── docs/
│       ├── prisma/
│       └── src/
│
├── .env.example                # Plantilla de configuración
└── README.md                   # Índice principal
```

<br>
<br>



## 📅 Progreso Mensual

### [Mes 02: Delivery API Professional](./months/month-02-delivery-api/README.md)
**Estado: En Desarrollo**
Construcción de un backend para una plataforma de delivery con múltiples actores (Cliente, Restaurante, Repartidor).
* **Key Tech:** RBAC (Roles), Transacciones Prisma, Máquina de Estados, Docker, Geo-search.
* **Documentación:** [Roadmap](./months/month-02-delivery-api/docs/roadmap.md) | [Requerimientos](./months/month-02-delivery-api/docs/requirements.md)

### [Mes 01: Fundamentos Backend](./months/month-01-foundations/README.md)
**Estado: Completado ✅**
Enfoque en bases sólidas de TypeScript, POO y Arquitectura en Capas.
* **Logros:** 29 módulos de ejercicios prácticos, implementación de Auth (JWT), validaciones con Zod y Testing unitario.
* **Documentación:** [Arquitectura](./months/month-01-foundations/docs/architecture.md) | [Módulos](./months/month-01-foundations/docs/modules.md)

<br>
<br>


## Cómo Ejecutar los Proyectos

Cada mes funciona como un proyecto independiente.

**Para ver el proyecto actual (Delivery API):**
```bash
cd month-02-delivery-api
npm install
npm run dev
```
**Para revisar los fundamentos (Mes 01):**

```bash
cd month-01-foundations
npm install
npm run dev:29  # (Ejemplo para correr el último módulo)
```

<br>
<br>


## 🔒 Archivos Excluidos del Repositorio

Por motivos de seguridad y organización, los siguientes archivos y carpetas no se versionan:

- `node_modules/` → Dependencias instaladas
- `.env` → Variables de entorno y credenciales sensibles
- `data/` → Persistencia local en desarrollo
- `database.json`
- `productos.json`

Para configurar variables de entorno, utiliza un archivo `.env` basado en `.env.example` si está disponible.
