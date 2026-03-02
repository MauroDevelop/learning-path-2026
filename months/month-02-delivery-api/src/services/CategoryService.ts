import { CreateCategorySchema, CreateCategoryInput } from "../shared/dtos/MenuDTO";
import { PrismaClient, Category } from "../generated/prisma";

const prisma = new PrismaClient()

export class CategoryService {
    // Create a new category
    async CreateCategory(data: unknown): Promise<Category>{
        // Validated input data; "data" is unknow at this point 
        const validatedData = CreateCategorySchema.parse(data);

        // Check if exists the category name already exists
        const existCategory = await prisma.category.findUnique({
            where: {name: validatedData.name}
        });

        if (existCategory) {
            throw new Error('Category with this name already exists');
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
                isActive: true,  // Fetch only non-deleted categories (soft delete)
            },
            orderBy: {
                name: 'asc',  // Sort alphabetically by name
            },
        });

        return categories;
    }
}