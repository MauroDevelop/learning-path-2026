# Requerimientos Funcionales

## 🎭 Actores y Permisos

### 1. Cliente (Client)
- Puede registrarse y ver el menú.
- Puede crear una orden (Carrito de compras).
- Puede ver el historial de sus órdenes.
- **Restricción:** No puede ver órdenes de otros clientes.

### 2. Administrador del Restaurante (Admin)
- Puede crear/editar/eliminar Productos y Categorías.
- Puede ver todas las órdenes entrantes.
- Puede cambiar el estado de orden de `PENDING` a `COOKING` y `READY_FOR_PICKUP`.

### 3. Repartidor (Courier)
- Puede ver órdenes con estado `READY_FOR_PICKUP`.
- Puede "tomar" una orden (asignársela).
- Puede cambiar el estado a `DELIVERED` (Entregado).

## 📦 Reglas de Negocio (Business Logic)
1. **Integridad de Menú:** No se puede eliminar una categoría si tiene productos activos.
2. **Flujo de Orden:**
   - Una orden nace en `PENDING`.
   - Solo el Admin pasa a `COOKING`.
   - Solo el Repartidor pasa a `DELIVERED`.
3. **Validación de Stock:** Al crear una orden, se debe verificar y reservar el stock de los productos.