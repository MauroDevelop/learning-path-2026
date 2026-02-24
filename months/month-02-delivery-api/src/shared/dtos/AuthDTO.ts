// Authentication DTO (Data Transfer Object)

import z, { string } from "zod";

export const RegisterSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    name: z.string().min(2, "Name is required"),
    phone: z.string().optional(),
    role: z.enum(['CLIENT', 'ADMIN', 'COURIER']).default('CLIENT')
});

// Schema for login validated
export const LoginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required') // We verify that it is not empty
})

// Extract the TypeScript type from the Zod schema 
export type RegisterDTO = z.infer<typeof RegisterSchema>;
export type LoginDTO = z.infer<typeof LoginSchema>