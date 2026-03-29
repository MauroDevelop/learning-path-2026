# Roadmap: Delivery API (Month 02)

**Objective:** Build a robust backend for a multi-actor delivery platform (Client, Restaurant Admin, Courier).

## 📅 Week 1: Foundations and Security (Identity Access Management)
- [x] Initial project setup (TypeScript, Express, Jest).
- [x] Database Schema Design (Prisma): Users and Roles.clear
- [x] Auth Implementation (Register/Login) with JWT and Bcrypt.
- [x] Access Control Middleware (RBAC): `verifyRole(['ADMIN', 'COURIER'])`.

## 📅 Week 2: Menu Management (Complex CRUD)
- [x] Modeling of Products, Categories, and Modifiers (e.g., "Extra cheese").
- [x] Advanced validations with Zod (Non-negative prices, stock).
- [x] Category CRUD implementation (Service with Soft Delete).
- [x] Category Controller and routing.
- [x] Product & Modifier CRUD implementation (Preserving sales history).
- [x] Image upload for products (Multer + Cloudinary/Local).

## 📅 Week 3: Business Core - Orders
- [x] Order Modeling (Statuses: PENDING -> COOKING -> DELIVERING -> DELIVERED).
- [x] Atomic Transactions with Prisma: (Create Order + Details + Update Stock).
- [x] Status change logic: Validate that a Client cannot change an order status to "DELIVERED".

## 📅 Week 4: Geo, Search & Deploy
- [x] Advanced filtering: Search products by name, category, and price.
- [x] (Bonus) Basic geolocation: Save lat/long in addresses.
- [x] API Dockerization.
- [x] Automated Testing: Setup Jest & Supertest for API endpoint validation.
- [ ] Deployment on Railway/Render with a production Database