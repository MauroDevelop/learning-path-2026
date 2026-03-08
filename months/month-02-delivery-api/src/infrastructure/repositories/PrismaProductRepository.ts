import { IProductRepository, CreateProductData } from "../../core/interfaces/IProductRepository"; import { Product } from "../../generated/prisma";
import { prisma } from "../database/prisma";

export class PrismaProductRepository implements IProductRepository {
    public async save(data: CreateProductData): Promise<Product> {
        return prisma.product.create({
            data: data
        });
    }

    public async findById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({
            where: { id }
        });
    }
    public async findAll(isActive: boolean): Promise<Product[]> {
        return prisma.product.findMany({
            where: { isActive: isActive }
        });
    }
    softDelete(id: string): Promise<Product> {
        return prisma.product.update({
            where: { id },
            data: { isActive: false }
        });
    }
}