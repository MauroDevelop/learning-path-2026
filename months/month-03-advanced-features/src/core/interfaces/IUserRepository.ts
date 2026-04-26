import { User } from "../entities/User";

export interface IUserRepository {
    // Find the users for your email (for login)
    findByEmail(email:string): Promise<User | null>;

    // Find the user for your ID (validated tokens)
    findById(id: string): Promise<User | null>;

    // Save a new user in the database
    save(user: User): Promise<User>;
}
