
# 🍔 Delivery API - Month 03 Project

Professional RESTful API for managing a restaurant delivery service with real-time capabilities, simulating a real production environment with multiple actors, complex business rules, and live updates.

## 🚀 Technologies
- **Core:** Node.js, TypeScript, Express.
- **Database:** MySQL, Prisma ORM.
- **File Uploads:** Multer, Cloudinary.
- **Architecture:** Layered Architecture (Clean Code).
- **Security:** JWT, Bcrypt, RBAC (Role Based Access Control).
- **Quality:** Jest, Supertest, Zod.

## ✨ Current Features
- **Identity & Access Management:** Secure registration and login with JWT.
- **Role-Based Access Control (RBAC):** Distinct permissions for `CLIENT`, `ADMIN`, and `COURIER`.
- **Menu Management:** Full CRUD operations for Products, Categories, and Modifiers.
- **Cloud Storage:** Secure product image uploads using Cloudinary streams.
- **Soft Deletes:** Preserving historical data integrity for orders.

## 📂 Project Documentation
To understand the design and planning, check the `docs/` folder:
- 🗺 **[Roadmap](./docs/roadmap.md)**: Weekly work plan.
- 📝 **[Requirements](./docs/requeriments.md)**: Business rules and actors.
- 🏗 **[Architecture](./docs/architecture.md)**: Structure, data flow, and design patterns.

## 📋 Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js** (v18 or higher recommended).
- **MySQL** installed and running.
- A free **Cloudinary** account for image hosting.

## 🛠 Installation and Execution

**1. Install dependencies:**
```bash
npm install
```

**2. Environment & Cloudinary setup:**
Copy the `.env.example` file to `.env`:
```bash
cp .env.example .env
```
*Note: You will need to configure your database connection string and provide your own free Cloudinary credentials (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`) inside the `.env` file to enable image uploads.*

**3. Database setup (Prisma):**
Run the migrations to create the tables in your MySQL database.
```bash
npx prisma migrate dev
```

**4. Start in development:**
```bash
npm run dev
```