import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from './interface/IUserRepository.js';

// Validation schemas 
const RegisterSchema = z.object({
    username: z.string().min(4),
    email: z.string().email(),
    password: z.string().min(8)
})

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export class UserManager {
    private readonly JWT_SECRET = 'Clave_secreta_2026';

    // DEPENDENCY INJECTION
    // The constructor receives "something" that complies with IUserRepository interface
    // It doesn't matter if it's InMemory, SQL, or a text file
    constructor(private readonly userRepo: IUserRepository) { }

    async register(data: z.infer<typeof RegisterSchema>) {
        // Validate data
        const validation = RegisterSchema.safeParse(data);
        if (!validation.success) throw new Error(validation.error.issues[0]?.message);

        // Check if user exists (using the injected repository)
        const exist = await this.userRepo.findByEmail(data.email);
        if (exist) throw new Error('User already exists')

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // Create User object
        const newUser = {
            id: crypto.randomUUID(),
            username: data.username,
            email: data.email,
            password: hashedPassword
        };

        // Save the user
        await this.userRepo.create(newUser);

        return { message: 'User registered successfully', userId: newUser.id };
    }

    async login(data: z.infer<typeof LoginSchema>) {
        // Validate the incoming request data
        const validation = LoginSchema.safeParse(data);
        if (!validation.success) throw new Error("Invalid input data");

        // Retrieve user by email using the repository pattern
        const user = await this.userRepo.findByEmail(data.email);
        if (!user) throw new Error("Invalid credentials (Email)");

        // Verify password (compare plain text against the stored hash)
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid credentials (Password)");

        // Issue a JWT for the authenticated user
        const token = jwt.sign(
            { userId: user.id, email: user.email }, // Token payload
            this.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { message: "Login successful", token };
    }
}