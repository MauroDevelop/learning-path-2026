import { PrismaClient } from "@prisma/client";
import { IAuthorRepository } from "../../core/interfaces/IAuthorRepository.js";
import { Author } from "../../core/entities/Author.js";

export class PrismaAuthorRepository implements IAuthorRepository {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }
    async findAll(): Promise<Author[]> {
        const authors = await this.prisma.author.findMany();
        return authors.map(a => new Author(a.id, a.name, a.bio, a.createdAt));
        
    };
    async createWithBooks(name: string, bio: string | null, bookTitles: string[]): Promise<Author> {
        const savedAuthor = await this.prisma.author.create({
            data: {
                name: name,
                bio: bio,
                // Prisma allows creating nested records right here
                books: {
                    // Map [A, B] into [{ title: A }, { title: B }]
                    create: bookTitles.map((titulo) => ({
                        title: titulo
                        // published is automatically set to false by the schema default
                    }))
                }
            }
        });

        return new Author(savedAuthor.id, savedAuthor.name, savedAuthor.bio, savedAuthor.createdAt);
    }
}
