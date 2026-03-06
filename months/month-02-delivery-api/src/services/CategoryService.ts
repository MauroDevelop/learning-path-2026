import { CreateCategorySchema, CreateCategoryInput } from "../shared/dtos/MenuDTO";
import { Category } from "../generated/prisma";
import { prisma } from "../infrastructure/database/prisma";
import { AppError } from "../shared/errors/AppError";

export class CategoryService {
    // Create a new category
    async createCategory(data: unknown): Promise<Category> {
        // Validated input data; "data" is unknow at this point 
        const validatedData = CreateCategorySchema.parse(data);

        // Check if exists the category name already exists
        const existCategory = await prisma.category.findUnique({
            where: { name: validatedData.name }
        });

        if (existCategory) {
            throw new AppError('Category with this name already exists', 409);
        }

        // Persist the record in the database
        const newCategory = await prisma.category.create({
            data: {
                name: validatedData.name,
                description: validatedData.description ?? null,
            },
        });

        return newCategory;
    }

    // Retrieve all active categories
    async getAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            where: {
                isActive: true, // Fetch only non-deleted categories (soft delete)
            },
            orderBy: {
                name: 'asc', // Sort alphabetically by name
            },
        });

        return categories;
    }

    async getCategoryById(id: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        });

        return category;
    }
}