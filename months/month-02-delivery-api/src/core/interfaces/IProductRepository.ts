import { Product } from "../../generated/prisma";

export interface CreateProductData {
    name: string;
    description?: string | undefined;  // Fix the optional properties
    price: number;
    stock: number;
    categoryId: string;
    imageUrl?: string | undefined; // Fix too
}

export interface IProductRepository {
    save(data: CreateProductData): Promise<Product>

    findById(id: string): Promise<Product | null>

    findAll(isActive: boolean): Promise<Product[]>

    softDelete(id: string): Promise<Product>

}