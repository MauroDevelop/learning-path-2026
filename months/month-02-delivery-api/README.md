# 🍔 Delivery API - Month 02 Project

Professional RESTful API for managing a restaurant delivery service, simulating a real production environment with multiple actors and complex business rules.

## 🚀 Technologies
- **Core:** Node.js, TypeScript, Express.
- **Database:** MySQL, Prisma ORM.
- **Architecture:** Layered Architecture (Clean Code).
- **Security:** JWT, Bcrypt, RBAC (Role Based Access Control).
- **Quality:** Jest, Supertest, Zod.

## 📂 Project Documentation
To understand the design and planning, check the `docs/` folder:
- 🗺 **[Roadmap](./docs/roadmap.md)**: Weekly work plan.
- 📝 **[Requirements](./docs/requeriments.md)**: Business rules and actors.
- 🏗 **[Architecture](./docs/architecture.md)**: Structure and design patterns.

## 🛠 Installation and Execution

1. **Install dependencies:**
```bash
npm install
```

2. **Environment setup:**
Copy the `.env.example` file to `.env` and configure your database connection string.
```bash
cp .env.example .env
```

3. **Start in development:**
```bash
npm run dev
```