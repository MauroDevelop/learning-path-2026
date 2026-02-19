# Roadmap: Delivery API (Mes 02)

Objetivo: Construir el backend robusto para una plataforma de delivery multi-actor (Cliente, Restaurante, Repartidor).

## 📅 Semana 1: Cimientos y Seguridad (Identity Access Management)
- [ ] Configuración inicial del proyecto (TypeScript, Express, Jest).
- [ ] Diseño del Schema de Base de Datos (Prisma): Usuarios y Roles.
- [ ] Implementación de Auth (Registro/Login) con JWT y Bcrypt.
- [ ] Middleware de Control de Acceso (RBAC): `verifyRole(['ADMIN', 'COURIER'])`.

## 📅 Semana 2: Gestión del Menú (Complex CRUD)
- [ ] Modelado de Productos, Categorías y Modificadores (ej: "Extra queso").
- [ ] Validaciones avanzadas con Zod (Precios no negativos, stock).
- [ ] Implementación de "Soft Delete" para no perder historial de ventas.
- [ ] Carga de imágenes para productos (Multer + Cloudinary/Local).

## 📅 Semana 3: Core del Negocio - Pedidos (Orders)
- [ ] Modelado de la Orden (Estados: PENDING -> COOKING -> DELIVERING -> DELIVERED).
- [ ] Transacciones Atómicas con Prisma: (Crear Orden + Detalle + Actualizar Stock).
- [ ] Lógica de cambio de estados: Validar que un Cliente no pueda pasar una orden a "ENTREGADO".

## 📅 Semana 4: Geo, Search & Deploy
- [ ] Filtrado avanzado: Buscar productos por nombre, categoría y precio.
- [ ] (Bonus) Geolocalización básica: Guardar lat/long en direcciones.
- [ ] Dockerización de la API.
- [ ] Despliegue en Railway/Render con Base de Datos productiva.