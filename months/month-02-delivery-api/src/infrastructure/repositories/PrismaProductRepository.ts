import { IProductRepository, CreateProductData, ProductFilters } from "../../core/interfaces/IProductRepository";
import { Product as PrismaProduct } from "@prisma/client";
import { Product } from "../../core/entities/Product";
import { prisma } from "../database/prisma";
// Import the Prisma namespace from the generated client to access internal types
import { Prisma } from "@prisma/client";

export class PrismaProductRepository implements IProductRepository {


    // Private Mapper Function para Productos
    private mapToDomain(prismaProduct: PrismaProduct): Product {
        return new Product({
            id: prismaProduct.id,
            name: prismaProduct.name,
            description: prismaProduct.description,
            price: prismaProduct.price.toNumber(),
            stock: prismaProduct.stock,
            imageUrl: prismaProduct.imageUrl,
            isActive: prismaProduct.isActive,
            categoryId: prismaProduct.categoryId,
            createdAt: prismaProduct.createdAt,
            updatedAt: prismaProduct.updatedAt
        });
    }

    public async save(data: CreateProductData): Promise<Product> {
        const product = await prisma.product.create({ data });
        return this.mapToDomain(product);
    }

    public async findByIds(ids: string[]): Promise<Product[]> {
        const products = await prisma.product.findMany({ where: { id: { in: ids } } });
        return products.map(p => this.mapToDomain(p));
    }

    public async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({ where: { id } });
        if (!product) return null;
        return this.mapToDomain(product);
    }
    public async findAll(isActive: boolean): Promise<Product[]> {
        const products = await prisma.product.findMany({ where: { isActive } });
        return products.map(p => this.mapToDomain(p));
    }

    public async softDelete(id: string): Promise<Product> {
        const product = await prisma.product.update({
            where: { id },
            data: { isActive: false }
        });
        return this.mapToDomain(product);
    }

    public async findManyWithFilters(filters: ProductFilters): Promise<Product[]> {

        // Build a dynamic 'where' object for Prisma using the auto-generated type
        const whereClause: Prisma.ProductWhereInput = {};

        if (filters.name) {
            // Partial match search: matches if the name contains the string.
            // For example: 'burg' will match 'Hamburger' or 'Cheeseburger'.

            whereClause.name = { contains: filters.name };
        }

        if (filters.categoryId) {
            // Exact match by category ID
            whereClause.categoryId = filters.categoryId;
        }

        // Price Range: 'gte' (Greater Than or Equal) and 'lte' (Less Than or Equal)
        if (filters.minPrice || filters.maxPrice) {
            whereClause.price = {};
            if (filters.minPrice) whereClause.price.gte = filters.minPrice;
            if (filters.maxPrice) whereClause.price.lte = filters.maxPrice;
        }

        // Execute the database query with the constructed filter criteria
        const productsFromDB = await prisma.product.findMany({
            where: whereClause
        });

        // Map each database record back to our Product Domain Entity
        return productsFromDB.map(p => this.mapToDomain(p));
    }
}