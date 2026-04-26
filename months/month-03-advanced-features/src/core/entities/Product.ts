// Fixing the Mass Assignment vulnerability
export class Product {
    id?: string | null;
    name!: string;
    description?: string | null;
    price!: number;
    stock!: number;
    imageUrl?: string | null;
    isActive!: boolean;
    categoryId!: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(data: {
        id?: string | null,
        name: string,
        description?: string | null,
        price: number,
        stock: number,
        imageUrl?: string | null,
        isActive: boolean,
        categoryId: string,
        createdAt?: Date | null,
        updatedAt?: Date | null,
    }) {
        this.id = data.id ?? null;
        this.name = data.name;
        this.description = data.description ?? null;
        this.price = data.price;
        this.stock = data.stock;
        this.imageUrl = data.imageUrl ?? null;
        this.isActive = data.isActive;
        this.categoryId = data.categoryId;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
    }
}