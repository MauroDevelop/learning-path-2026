import { IOrderRepository } from "../core/interfaces/IOrderRepository";
import { IProductRepository } from "../core/interfaces/IProductRepository";
import { OrderStatus } from "../core/entities/Order";
import { CreateOrderSchema, CreateOrderType } from "../shared/dtos/OrderDTO";
import { Role } from "../core/entities/User";
import { AppError } from "../shared/errors/AppError";

export class OrderService {

    constructor(
        private readonly orderRepository: IOrderRepository,
        private readonly productRepository: IProductRepository
    ) { }

    public async createOrder(clientId: string, payload: CreateOrderType) {
        // Zod will throw an error if validation fails
        const validatedData = CreateOrderSchema.parse(payload);

        // Extract IDs and perform a batch retrieval to optimize performance
        const productIds = validatedData.items.map(item => item.productId);
        const productsFromDB = await this.productRepository.findByIds(productIds);

        let total = 0;
        const orderItemsToSave: any[] = [];

        // Validate products, stock availability, and calculate totals
        for (const item of validatedData.items) {
            const existingProduct = productsFromDB.find(product => product.id === item.productId);

            if (!existingProduct) {
                throw new AppError(`Product with ID ${item.productId} not found`, 404);
            }

            // Check if there is enough stock for the requested quantity
            const isStockAvailable = item.quantity <= existingProduct.stock;

            if (!isStockAvailable) {
                throw new AppError(`Product "${existingProduct.name}" is out of stock`, 400);
            }

            // Calculate subtotal for this item and add to the order total
            total += item.quantity * existingProduct.price.toNumber();

            // Prepare the item data for persistence
            orderItemsToSave.push({
                productId: item.productId,
                quantity: item.quantity,
                price: existingProduct.price.toNumber()
            });
        }

        const createOrderData = {
            clientId: clientId,
            deliveryAddress: validatedData.deliveryAddress,
            total: total,
            items: orderItemsToSave
        };

        // Persist the order and its items via the repository
        return await this.orderRepository.create(createOrderData);
    }


    public async updateStatus(orderId: string, newStatus: OrderStatus, userRole: Role, userId: string) {

        // Validate that the order exists before attempting an update
        const validateOrder = await this.orderRepository.findById(orderId);
        if (!validateOrder) {
            throw new AppError('Order not found', 404);
        }

        // Access Control: Clients are not allowed to manually update status
        if (userRole === 'CLIENT') {
            throw new AppError('Clients cannot update order status', 403);
        }

        // Variable to store the courier ID if an assignment is needed
        let courierIdToAssign: string | undefined = undefined;

        // Courier Rule: Logic for taking an order for delivery
        if (newStatus === 'DELIVERING') {
            if (userRole !== 'COURIER') {
                throw new AppError('Only couriers can take orders for delivery', 403);
            }
            // Assign the current user as the courier for this orde
            courierIdToAssign = userId;
        }

        // Admin/Restaurant Rule: Logic for starting the cooking process
        if (newStatus === 'COOKING') {
            if (userRole !== 'ADMIN') {
                throw new AppError('Only admins can change the status to cooking', 403);
            }
        }

        // Persist the status change and potential courier assignment in the database
        return await this.orderRepository.updateStatus(orderId, newStatus, courierIdToAssign);
    }
}