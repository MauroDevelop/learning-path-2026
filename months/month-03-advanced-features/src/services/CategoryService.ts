import { Category } from "../core/entities/Category";
import { ICategoryRepository } from "../core/interfaces/ICategoryRepository";
import { CreateCategorySchema } from "../shared/dtos/MenuDTO";
import { AppError } from "../shared/errors/AppError";

export class CategoryService {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async createCategory(data: unknown): Promise<Category> {
        const validatedData = CreateCategorySchema.parse(data);

        const existCategory = await this.categoryRepository.findByName(
            validatedData.name
        );

        if (existCategory) {
            throw new AppError("Category with this name already exists", 409);
        }

        return await this.categoryRepository.create({
            name: validatedData.name,
            description: validatedData.description ?? null,
        });
    }

    async getAll(): Promise<Category[]> {
        return await this.categoryRepository.findAll();
    }

    async getCategoryById(id: string): Promise<Category | null> {
        return await this.categoryRepository.findById(id);
    }
}
