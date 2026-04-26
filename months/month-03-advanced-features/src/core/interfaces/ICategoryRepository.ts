import { Category } from "../entities/Category";

export type CreateCategoryData = {
    name: string;
    description: string | null;
};

export type UpdateCategoryData = {
    name?: string;
    description?: string | null;
};

export interface ICategoryRepository {
    findByName(name: string): Promise<Category | null>;
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    create(data: CreateCategoryData): Promise<Category>;
    update(id: string, data: UpdateCategoryData): Promise<Category>;
    softDelete(id: string): Promise<Category>;
}
