import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';

import { UsersData } from './UsersData.js';

const RegisterSchema = z.object({
    username: z.string().min(4, 'Username must be at least 4 characters long'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters long')
});

const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string()
});

type RegisterInput = z.infer<typeof RegisterSchema>;
type LoginInput = z.infer<typeof LoginSchema>;

export class UserManager {
    // Fallback secret key. Must be injected via environment variables (.env) in production
    private static JWT_SECRET = process.env.JWT_SECRET || 'Clave_secreta_2026';

    // --- REGISTRATION ---
    static async register(data: RegisterInput): Promise<{ message: string, userId: string }> {
        const validation = RegisterSchema.safeParse(data);
        
        if (!validation.success) {
            throw new Error(validation.error.issues[0]?.message);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = {
            id: crypto.randomUUID(), 
            username: data.username,
            email: data.email,
            password: hashedPassword  
        };

        UsersData.addUser(newUser);
        
        console.log(`[DB] User persisted: ${newUser.email}`);

        return { message: 'User successfully registered', userId: newUser.id };
    }

    // --- LOGIN ---
    static async login(data: LoginInput): Promise<{ message: string, token: string }> {
        const validation = LoginSchema.safeParse(data);
        
        if (!validation.success) {
            throw new Error("Invalid input data format");
        }

        const userFound = UsersData.getUsersData().find(u => u.email === data.email);
        
        // Prevent User Enumeration by using generic error messages for failed logins
        if (!userFound) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(data.password, userFound.password);
        
        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        // JWT Generation with explicit payload and expiration parameters
        const token = jwt.sign(
            { 
                userId: userFound.id, 
                email: userFound.email 
            }, 
            this.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        console.log(`[LOGIN] User authenticated: ${userFound.email}`);
        
        return {
            message: "Login successful",
            token 
        };
    }
}