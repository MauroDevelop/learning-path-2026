export class Category {
    id?: string | null;
    name!: string;
    description?: string | null;
    isActive!: boolean;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    constructor(data: {
        id?: string | null;
        name: string;
        description?: string | null;
        isActive: boolean;
        createdAt?: Date | null;
        updatedAt?: Date | null;
    }) {
        this.id = data.id ?? null;
        this.name = data.name;
        this.description = data.description ?? null;
        this.isActive = data.isActive;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
    }
}