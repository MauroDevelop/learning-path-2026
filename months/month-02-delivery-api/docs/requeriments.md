# Functional Requirements

## 🎭 Actors and Permissions

### 1. Client
- Can register and view the menu.
- Can create an order (Shopping cart).
- Can view their order history.
- **Restriction:** Cannot view orders from other clients.

### 2. Restaurant Administrator (Admin)
- Can create/edit/delete Products and Categories.
- Can view all incoming orders.
- Can change the order status from `PENDING` to `COOKING` and `READY_FOR_PICKUP`.

### 3. Courier
- Can view orders with the `READY_FOR_PICKUP` status.
- Can "take" an order (assign it to themselves).
- Can change the status to `DELIVERED`.

## 📦 Business Logic
1. **Menu Integrity:** A category cannot be deleted if it has active products.
2. **Order Flow:**
   - An order is created as `PENDING`.
   - Only the Admin can change the status to `COOKING`.
   - Only the Courier can change the status to `DELIVERED`.
3. **Stock Validation:** When creating an order, the stock of the products must be verified and reserved.