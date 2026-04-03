/**
 * Define a validation schema using Zod named UserSchema
 * Must strictly comply with these rules:
 * username: Must be a string, have a minimum of 4 characters and a custom error message
 * email: Must be a valid email format
 * password: Must be a string of at least 8 characters
 * age: Must be a number and the person must be at least 18 years old
 */

import { z } from 'zod';

const UserSchema = z.object({
    username: z.string().min(4, 'Username must contain at least 4 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must contain at least 8 characters'),
    age: z.number().min(18, 'You must be at least 18 years old')
});

// SENIOR TWEAK: Infers the TypeScript type directly from the Zod schema to prevent code duplication
type UserDTO = z.infer<typeof UserSchema>;

// Creates and exports a class named UserManager
export class UserManager {
    // Static method register that receives the inferred UserDTO as a parameter
    static register(data: UserDTO): string {
        // Validation
        const validationResult = UserSchema.safeParse(data);

        if (!validationResult.success) {
            // EXTRACT THE ERROR:
            // validationResult.error.issues is an array with all the failures
            // We take the first one [0] and its message (.message)
            const errorMessage = validationResult.error.issues[0]?.message;

            // Throws the error to halt execution
            throw new Error(errorMessage);
        }

        // Returns the exact string expected by the Jest test suite
        return `User registered: ${data.email}`;
    }
}