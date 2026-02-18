import { IAuthorRepository } from "../core/interfaces/IAuthorRepository.js";
import { Author } from "../core/entities/Author.js";

export class AuthorService {
    // Dependency Injection:
    // The service is unaware of Prisma; it only knows that "something" satisfies the interface.
    constructor(private authorRepo: IAuthorRepository) {}

    async findAll(): Promise<Author[]> {
        return this.authorRepo.findAll();
    }

    async create(name: string, bio: string | null, bookTitles: string[]): Promise<Author> {
        // BUSINESS LOGIC (Validation)
        // Rule: We don't want "empty" authors in our library       
        if (!name) {
            throw new Error("El nombre del autor es obligatorio.");
        }

        if (bookTitles.length === 0) {
            throw new Error("Debes registrar al menos un libro para crear un autor.");
        }

        // 2. INFRASTRUCTURE CALL
        // If everything is correct, we delegate the "heavy lifting" to the repository.
        return this.authorRepo.createWithBooks(name, bio, bookTitles);
    }
}