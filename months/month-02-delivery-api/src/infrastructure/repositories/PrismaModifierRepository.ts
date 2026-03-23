import { IModifierRepository, CreateModifierData } from "../../core/interfaces/IModifierRepository";
import { Modifier } from "@prisma/client";
import { prisma } from "../database/prisma";

export class PrismaModifierRepository implements IModifierRepository {
    public async save(data: CreateModifierData): Promise<Modifier> {
        return await prisma.modifier.create({
            data: {
                name: data.name,
                price: data.price,
                productId: data.productId
            }
        })
    }
    public async findAll(activeOnly: boolean = true): Promise<Modifier[]> {
        return await prisma.modifier.findMany({
            // If activeOnly is false, we return an empty object {} to fetch all records (no filters)
            where: activeOnly ? { isActive: true } : {},
            include: {
                product: {
                    select: { name: true }
                }
            }
        });
    }
    public async findById(id: string): Promise<Modifier | null> {
        return await prisma.modifier.findUnique({
            where: { id }
        });
    }
    public async softDelete(id: string): Promise<Modifier> {
        return await prisma.modifier.update({
            where: { id },
            data: { isActive: false }
        });
    }
}