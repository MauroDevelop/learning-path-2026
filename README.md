# Backend Learning Path 2026

<div align="center">

</div>
I have decided to train professionally as a Backend Developer, so I will be adding my progress and practices to this repository. My main goal is to master Backend engineering by dedicating daily hours of consistent study over a 3-month period.

<br>

## Objectives
* **Final Goal**: Develop a fully functional, production-ready web application incorporating everything learned during this period.
* **Current Focus**: Mastery of TypeScript, modern frameworks, and cloud architectures.
* **Previous Experience**: JavaScript proficiency and basic PHP knowledge.

<br>

## Tech Stack

### Backend Core
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)

### Database & Cloud
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![TiDB](https://img.shields.io/badge/TiDB-3A26D1?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Render](https://img.shields.io/badge/Render-000000?style=flat-square&logo=render&logoColor=white)

### Testing & Quality
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000?style=flat-square)

### Security & Validation
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square)
![bcrypt](https://img.shields.io/badge/bcrypt-003B57?style=flat-square)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=flat-square)

### Documentation & Media
![OpenAPI](https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat-square)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

<br>
<br>

## 📁 Repository Structure

```text
learning-path-2026/
│
├── months/                     # 📂 Container folder for monthly milestones
│   ├── month-01-foundations/   #   Stage 1: Foundations (Completed)
│   │   ├── docs/
│   │   ├── api-evolution/
│   │   └── exercises/
│   │
│   └── month-02-delivery-api/  #   Stage 2: Real-World Project (Completed)
│       ├── docs/
│       ├── prisma/
│       └── src/
│
└── README.md                   # Main Index
```

<br>
<br>

## 📅 Monthly Progress

### [Month 02: Professional Delivery API](./months/month-02-delivery-api/README.md)
**Status: Completed ✅ (Deployed on Render)**
Building a backend for a delivery platform with multiple actors (Customer, Restaurant, Courier).
* **Key Tech:** Layered Architecture, RBAC (Roles), Prisma Transactions, Zod Validation, JWT Mocking, Dockerization, Serverless DB deployment.
* **Documentation:** [Roadmap](./months/month-02-delivery-api/docs/roadmap.md) | [Requirements](./months/month-02-delivery-api/docs/requeriments.md) | [Architecture](./months/month-02-delivery-api/docs/architecture.md)

### [Month 01: Backend Foundations](./months/month-01-foundations/README.md)
**Status: Completed ✅**
Focus on solid TypeScript foundations, OOP, and Layered Architecture.
* **Achievements:** 29 hands-on exercise modules, Auth (JWT) implementation, Zod validations, and unit testing.
* **Documentation:** [Architecture](./months/month-01-foundations/docs/architecture.md) | [Modules](./months/month-01-foundations/docs/modules.md)

<br>
<br>

## ⚙️ How to Run the Projects

Each month functions as an independent, standalone project workspace.

**To run the current project (Month 02 - Delivery API):**
```bash
cd months/month-02-delivery-api
npm install
npm run dev
```

**To review the foundations (Month 01):**
```bash
cd months/month-01-foundations
npm install
npm run dev:29  # (Example to run the final module)
```

<br>
<br>

## 🔒 Ignored Files (Version Control)

For security and organizational purposes, the following files and directories are not tracked in the repository:

- `node_modules/` → Installed dependencies.
- `dist/` → Compiled production code.
- `.env` → Environment variables and sensitive credentials.
- `data/` → Local persistence files used during development.
- `*.json` (Database mocks) → e.g., `database.json`, `productos.json`.

To set up environment variables locally, refer to the respective project's documentation.