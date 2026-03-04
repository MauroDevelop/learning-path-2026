import { Product } from "../../generated/prisma";

export interface CreateProductData {
    name: string;
    description?: string | null;
    price: number;
    stock: number;
    categoryId: string;
    imageUrl?: string | null;
}

export interface IProductRepository {
    save(data: CreateProductData): Promise<Product>

    findById(id: string): Promise<Product | null>

    findAll(isActive: boolean): Promise<Product[]>

    softDelete(id: string): Promise<Product>

}