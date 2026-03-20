import { IOrderRepository, CreateOrderData } from "../../core/interfaces/IOrderRepository";
import { Order as orderPrisma } from "../../generated/prisma";
import { Order, OrderStatus } from "../../core/entities/Order";
import { prisma } from "../database/prisma";

export class PrismaOrderRepository implements IOrderRepository {

    // Private Mapper Function
    // Converts the raw Prisma object (generated type) to our Domain Entity
    private mapToDomain(prismaOrder: orderPrisma): Order {
        return new Order({
            id: prismaOrder.id,
            clientId: prismaOrder.clientId,
            deliveryAddress: prismaOrder.deliveryAddress,
            latitude: prismaOrder.latitude,
            longitude: prismaOrder.longitude,
            status: prismaOrder.status as OrderStatus,
            total: prismaOrder.total.toNumber(),
            createdAt: prismaOrder.createdAt,
            updatedAt: prismaOrder.updatedAt
        });
    }

    public async create(data: CreateOrderData): Promise<Order> {

        // Define the query to create the order and its associated items (Nested Write)
        const createOrderQuery = prisma.order.create({
            data: {
                total: data.total,
                clientId: data.clientId,
                deliveryAddress: data.deliveryAddress,
                longitude: data.longitude ?? null,
                latitude: data.latitude ?? null,
                status: 'PENDING',

                orderItems: {
                    create: data.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            // Include orderItems in the response for further mapping if needed
            include: { orderItems: true }
        });

        // Prepare the stock update queries for each product in the order
        const stockUpdates = data.items.map(item => {
            return prisma.product.update({
                where: { id: item.productId },
                data: {
                    stock: { decrement: item.quantity }
                }
            });
        });

        /**
         * prisma.$transaction([...]): Executes all instructions in a single database transaction.
         * This ensures atomicity: either all operations succeed, or all are rolled back.
         */
        const [orderCreated] = await prisma.$transaction([
            createOrderQuery,
            ...stockUpdates
        ]);

        // Map the database record to our Domain Entity
        return this.mapToDomain(orderCreated);
    }

    public async findById(id: string): Promise<Order | null> {
        const orderSearch = await prisma.order.findUnique({
            where: { id: id }
        });
        if (!orderSearch) {
            return null
        }
        return this.mapToDomain(orderSearch);
    }

    public async findAll(): Promise<Order[]> {
        const orders = await prisma.order.findMany()
        return orders.map(order => this.mapToDomain(order));
    }

    public async findByIdClient(clientId: string): Promise<Order[]> {
        const clientSearch = await prisma.order.findMany({
            where: { clientId: clientId }
        });

        return clientSearch.map(client => this.mapToDomain(client));

    }

    public async updateStatus(id: string, orderStatus: OrderStatus, courierId?: string): Promise<Order> {

        const updateStatus = await prisma.order.update({
            where: { id: id },
            data: {
                status: orderStatus,
                courierId: courierId ?? null
            }
        });

        return this.mapToDomain(updateStatus)
    }
}