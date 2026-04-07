export enum OrderStatus {
    PENDING = 'PENDING',
    COOKING = 'COOKING',
    DELIVERING = 'DELIVERING',
    DELIVERED = 'DELIVERED'
}

// Represents a single product within an order
export class OrderItem {
    id?: string | null;

    // We use '!' to tell TypeScript that these properties will be 
    quantity!: number;
    price!: number;
    orderId?: string | null;
    productId!: string;

    constructor(data: {
        id?: string | null,
        quantity: number,
        price: number,
        orderId?: string | null,
        productId: string
    }) {
        this.id = data.id ?? null;
        this.quantity = data.quantity;
        this.price = data.price;
        this.orderId = data.orderId ?? null
        this.productId = data.productId 
    }
}

// Represents the main order structure containing status and items
export class Order {
    id?: string | null;
    total!: number;
    status!: OrderStatus;
    clientId!: string;
    deliveryAddress!: string;
    latitude?: number | null;
    longitude?: number | null;
    courierId?: string | null; // Optional: only present when a courier is assigned
    createdAt?: Date | null;
    updatedAt?: Date| null;
    items?: OrderItem[];

    constructor(data: {
        id?: string | null,
        total: number,
        status?: OrderStatus,
        clientId: string,
        deliveryAddress: string,
        latitude?: number | null,
        longitude?: number | null,
        courierId?: string | null, // Optional: only present when a courier is assigned
        createdAt?: Date | null,
        updatedAt?: Date | null, 
        items?: OrderItem[]

    }) {
        this.total = data.total;
        this.clientId = data.clientId;
        this.deliveryAddress = data.deliveryAddress;
        this.id = data.id ?? null;

        this.status = data.status ?? OrderStatus.PENDING;
        this.courierId = data.courierId ?? null;
        this.latitude = data.latitude ?? null;
        this.longitude = data.longitude ?? null;

        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
        this.items = data.items ?? []; // Initialize with emphy array as fallback
    }
}