// Define the users date shape
export interface User {
    id: string,
    username: string,
    email: string,
    password: string     // hashed password, not plain text
}

// This interface is the "contract" that any database must follow
export interface IUserRepository {
    // Find user by email. Return a User or null
    findByEmail(email: string): Promise<User | null>

    // Creates a new user. Return void because we only want to save the user
    create(user: User): Promise<void>
};