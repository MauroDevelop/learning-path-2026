export class Product {
    id?: string;
    name!: string;
    description?: string | null;
    price!: number;
    stock!: number;
    imageUrl?: string | null;
    isActive!: boolean;
    categoryId!: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Product) {
        Object.assign(this, data);
    }
}