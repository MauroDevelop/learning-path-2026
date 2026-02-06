import { IUserRepository, User } from "../interface/IUserRepository.js";

// "implements IUserRepository" is the "contract" signarure
export class InMemoryUserRepo implements IUserRepository {
    // This is our private "Database"
    // isn't static, each instance from repository has its own data
    private users: User[] = [];

    // Search implementation
    async findByEmail(email: string): Promise<User | null> {
        // We simulate a search
        const user = this.users.find(u => u.email === email);

        // If we don't find the email return null.
        // "find" return "undefined" with " || null" we handle that
        return user || null
    };

    // Created implementation
    async create(user: User): Promise<void> {
        this.users.push(user);
        console.log('[DB in memory] User saved:', this.users);

    };
};