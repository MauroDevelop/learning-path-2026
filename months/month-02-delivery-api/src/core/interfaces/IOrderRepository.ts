import { Order, OrderStatus } from "../entities/Order"; 

export interface CreateOrderData {
    clientId: string,
    total: number,
    items: {
        productId: string,
        quantity: number,
        price: number
    }[];
}

export interface IOrderRepository {
    create(data: CreateOrderData): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findAll(): Promise<Order[]>;
    findByIdClient(clientId: string): Promise<Order[]>;
    updateStatus(id: string, orderStatus: OrderStatus, courierId?: string): Promise<Order>;
}