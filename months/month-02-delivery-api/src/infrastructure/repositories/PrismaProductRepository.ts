import { IProductRepository, CreateProductData } from "../../core/interfaces/IProductRepository";import { Product } from "../../generated/prisma";
import { prisma } from "../database/prisma";

export class PrismaProductRepository implements IProductRepository{
    async save(data: CreateProductData): Promise<Product> {
        return prisma.product.create({
            data: data
        });
    }
    
    findById(id: string): Promise<Product | null> {
        return prisma.product.findUnique({
            where: {
                id: id
            }
        });
    }
    findAll(isActive: boolean): Promise<Product[]> {
        return prisma.product.findMany({
            where: {
                isActive: isActive
            }
        });
    }
    softDelete(id: string): Promise<Product> {
        return prisma.product.update({
            where: {
                id: id
            },
            data: {
                isActive: false
            }
        });
    }
}