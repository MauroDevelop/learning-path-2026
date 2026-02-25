# Roadmap: Delivery API (Month 02)

**Objective:** Build a robust backend for a multi-actor delivery platform (Client, Restaurant Admin, Courier).

## 📅 Week 1: Foundations and Security (Identity Access Management)
- [x] Initial project setup (TypeScript, Express, Jest).
- [x] Database Schema Design (Prisma): Users and Roles.clear
- [x] Auth Implementation (Register/Login) with JWT and Bcrypt.
- [ ] Access Control Middleware (RBAC): `verifyRole(['ADMIN', 'COURIER'])`.

## 📅 Week 2: Menu Management (Complex CRUD)
- [ ] Modeling of Products, Categories, and Modifiers (e.g., "Extra cheese").
- [ ] Advanced validations with Zod (Non-negative prices, stock).
- [ ] "Soft Delete" implementation to preserve sales history.
- [ ] Image upload for products (Multer + Cloudinary/Local).

## 📅 Week 3: Business Core - Orders
- [ ] Order Modeling (Statuses: PENDING -> COOKING -> DELIVERING -> DELIVERED).
- [ ] Atomic Transactions with Prisma: (Create Order + Details + Update Stock).
- [ ] Status change logic: Validate that a Client cannot change an order status to "DELIVERED".

## 📅 Week 4: Geo, Search & Deploy
- [ ] Advanced filtering: Search products by name, category, and price.
- [ ] (Bonus) Basic geolocation: Save lat/long in addresses.
- [ ] API Dockerization.
- [ ] Deployment on Railway/Render with a production Database.