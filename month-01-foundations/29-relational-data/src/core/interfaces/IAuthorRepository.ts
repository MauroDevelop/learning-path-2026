import { Author } from "@prisma/client"

export interface IAuthorRepository {
    findAll(): Promise<Author[]> ;

    // Relational method: save the author and your books
    createWithBooks(name: string, bio: string | null, bookTitles: string[]): Promise<Author>;
}