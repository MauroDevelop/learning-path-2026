import { z } from 'zod';
import bcrypt from 'bcrypt';

// Zod schema for incoming user registration payloads
const UserSchema = z.object({
    username: z.string().min(4, 'Username must contain at least 4 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    age: z.number().min(18, 'User must be at least 18 years old')
});

// Type inference from Zod schema to maintain DRY principles
type UserInput = z.infer<typeof UserSchema>;

export class UserManager {
    
    // Asynchronous execution required for cryptographic operations
    static async register(data: UserInput) {
        
        // Payload validation against predefined schema
        const validationResult = UserSchema.safeParse(data);

        if (!validationResult.success) {
            const errorMessage = validationResult.error.issues[0]?.message;
            throw new Error(errorMessage);
        }

        // Cryptographic hashing of the plain-text password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // Simulated database persistence
        console.log(`Saving user to database...`);
        
        // Returns a sanitized user object confirming successful registration
        return {
            status: "success",
            message: "User successfully and securely registered",
            user: {
                email: data.email,
                username: data.username,
                storedPassword: hashedPassword 
            }
        };
    }
}