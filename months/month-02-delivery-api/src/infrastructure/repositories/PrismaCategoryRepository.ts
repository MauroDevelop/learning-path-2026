import { Category } from "../../core/entities/Category";
import {
    CreateCategoryData,
    ICategoryRepository,
    UpdateCategoryData,
} from "../../core/interfaces/ICategoryRepository";
import { prisma } from "../database/prisma";
import { Category as PrismaCategory } from "@prisma/client";

export class PrismaCategoryRepository implements ICategoryRepository {
    private mapToDomain(row: PrismaCategory): Category {
        return new Category({
            id: row.id,
            name: row.name,
            description: row.description,
            isActive: row.isActive,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
        });
    }

    public async findByName(name: string): Promise<Category | null> {
        const row = await prisma.category.findUnique({
            where: { name },
        });
        if (!row) return null;
        return this.mapToDomain(row);
    }

    public async findById(id: string): Promise<Category | null> {
        const row = await prisma.category.findUnique({
            where: { id },
        });
        if (!row) return null;
        return this.mapToDomain(row);
    }

    public async findAll(): Promise<Category[]> {
        const rows = await prisma.category.findMany({
            where: { isActive: true },
            orderBy: { name: "asc" },
        });
        return rows.map((row) => this.mapToDomain(row));
    }

    public async create(data: CreateCategoryData): Promise<Category> {
        const row = await prisma.category.create({
            data: {
                name: data.name,
                description: data.description,
            },
        });
        return this.mapToDomain(row);
    }

    public async update(id: string, data: UpdateCategoryData): Promise<Category> {
        const row = await prisma.category.update({
            where: { id },
            data,
        });
        return this.mapToDomain(row);
    }

    public async softDelete(id: string): Promise<Category> {
        const row = await prisma.category.update({
            where: { id },
            data: { isActive: false },
        });
        return this.mapToDomain(row);
    }
}
