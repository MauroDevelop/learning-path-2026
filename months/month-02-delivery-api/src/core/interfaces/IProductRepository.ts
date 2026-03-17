import { Product } from "../entities/Product";

export interface CreateProductData {
    name: string;
    description?: string | null;  // Fix the optional properties
    price: number;
    stock: number;
    categoryId: string;
    imageUrl?: string | null; // Fix too
}

export interface IProductRepository {
    save(data: CreateProductData): Promise<Product>;

    findByIds(ids: string[]): Promise<Product[]>;

    findById(id: string): Promise<Product | null>;

    findAll(isActive: boolean): Promise<Product[]>;

    softDelete(id: string): Promise<Product>;

    findManyWithFilters(filters: ProductFilters): Promise<Product[]>;
}

export interface ProductFilters {
    name?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
}