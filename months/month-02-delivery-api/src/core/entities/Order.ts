export enum OrderStatus {
    PENDING = 'PENDING',
    COOKING = 'COOKING',
    READY_FOR_PICKUP = 'DELIVERING',
    DELIVERED = 'DELIVERED'
}

// Represents a single product within an order
export class OrderItem {
    id?: string;

    // We use '!' to tell TypeScript that these properties will be 
    // initialized dynamically via Object.assign in the constructor.
    quantity!: number;
    price!: number;
    orderId?: string;
    productId!: string;

    constructor(data: OrderItem) {
        // Bulk assign properties from the data object to the current instance
        Object.assign(this, data);
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
    createdAt?: Date;
    updatedAt?: Date;
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
        createdAt?: Date,
        updatedAt?: Date,
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
    }
}