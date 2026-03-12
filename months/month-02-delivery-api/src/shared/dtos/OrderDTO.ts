import { z } from 'zod';
import { OrderStatus } from '../../core/entities/Order';

// The client only sends the product ID and the quantity they want to buy.
// The backend will calculate the price and total to prevent tampering.
export const OrderItemSchema = z.object({
    productId: z.string().uuid('Product ID must be a valid UUID'),
    quantity: z.number().int().positive('Quantity must be at least 1')
});

export const CreateOrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1, 'Order must contain at least one item')
});

// Used by Admins and Couriers to change the order state
export const UpdateOrderStatusSchema = z.object({
    status: z.nativeEnum(OrderStatus, {
        message: 'Invalid order status'
    })
});
