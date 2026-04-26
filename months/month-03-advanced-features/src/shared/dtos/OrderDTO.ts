import { z } from 'zod';
import { OrderStatus } from '../../core/entities/Order';

// The client only sends the product ID and the quantity they want to buy.
// The backend will calculate the price and total to prevent tampering.
export const OrderItemSchema = z.object({
    productId: z.string().uuid('Product ID must be a valid UUID'),
    quantity: z.number().int().positive('Quantity must be at least 1')
});

export const CreateOrderSchema = z.object({
    items: z.array(OrderItemSchema).min(1, 'Order must contain at least one item'),
    deliveryAddress: z.string().min(5),
    latitude: z.number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90")
        .optional(),
    longitude: z.number()
        .min(-90, "Longitude must be between -90 and 90")
        .max(90, "Longitude must be between -90 and 90")
        .optional()
});

// Used by Admins and Couriers to change the order state
export const UpdateOrderStatusSchema = z.object({
    status: z.nativeEnum(OrderStatus, {
        message: 'Invalid order status'
    })
});

export type CreateOrderType = z.infer<typeof CreateOrderSchema>;