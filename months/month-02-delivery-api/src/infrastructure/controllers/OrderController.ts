import { Response } from "express";
import { UpdateOrderStatusSchema } from "../../shared/dtos/OrderDTO";
import { OrderService } from "../../services/OrderService";
import { Role } from "../../core/entities/User";
import { CreateOrderSchema } from "../../shared/dtos/OrderDTO";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { AppError } from "../../shared/errors/AppError";
import { ZodError } from "zod";
import { OrderStatus } from "../../core/entities/Order";

export class OrderController {

    constructor(private readonly orderService: OrderService) { }

    public createOrder = async (req: AuthRequest, res: Response) => {

        try {
            const payload = req.body;

            // Extract the User ID from the JWT token (attached by the Auth middleware)
            const clientId = req.user?.userId;

            if (!clientId) {
                throw new AppError('User not authenticated', 401);
            }
            // Validate the request payload against the schema
            const validatedPayload = CreateOrderSchema.parse(payload);

            // Execute the service logic to create the order
            const createdOrder = await this.orderService.createOrder(clientId, validatedPayload);

            // Return a 201 Created response
            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: createdOrder
            });

        } catch (error: unknown) {

            // Handle schema validation errors
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.issues
                });
                return;
            }

            // Handle custom application errors (AppError)
            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            // Handle unexpected server errors
            console.error('[OrderController - createOrder Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    public updateStatus = async (req: AuthRequest, res: Response): Promise<void> => {
        try {
            // Extract the orderId from the URL parameters (e.g., /api/orders/:id/status)
            const orderId = req.params.id as string;
            // Retrieve authenticated user data from the decoded JWT payload
            const userId = req.user?.userId;
            const userRole = req.user?.userRole;

            // Safety check: ensure the user is authenticated and has a role assigned
            if (!userId || !userRole) {
                throw new AppError('User not authenticated or missing role', 401);
            }

            // Validate the request body against the UpdateOrderStatusSchema
            const validatedPayload = UpdateOrderStatusSchema.parse(req.body);

            // Invoke the service layer to process the business logic
            // Use type casting ('as') to align Express types with Domain Entities
            const updatedOrder = await this.orderService.updateStatus(
                orderId,
                validatedPayload.status as OrderStatus,
                userRole as Role,
                userId
            );

            // Return a 200 OK response with the updated order data
            res.status(200).json({
                success: true,
                message: 'Order status updated successfully',
                data: updatedOrder
            });
        } catch (error: unknown) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.issues
                });
                return;
            }

            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
                return
            }

            // Unknown errors
            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}