import { Response } from "express";
import { OrderService } from "../../services/OrderService";
import { CreateOrderSchema } from "../../shared/dtos/OrderDTO";
import { AuthRequest } from "../../middlewares/auth.middleware";
import { AppError } from "../../shared/errors/AppError";
import { ZodError } from "zod";

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
}