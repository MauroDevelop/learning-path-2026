import { Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import { RegisterSchema, LoginSchema } from "../../shared/dtos/AuthDTO";
// Errors manager with zod
import { ZodError } from "zod";

export class AuthController {

    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            // Zod validates and cleans req.body. If valid, it returns typed data;
            // if it fails, it throws an error and jumps to the catch block.
            const validatedData = RegisterSchema.parse(req.body)

            // Register the new user with validated data
            const newUser = await this.authService.register(validatedData)

            // Return a code 201 (created) and the data to new user
            res.status(201).json({
                success: true,
                message: "User Registered successfull",
                data: newUser
            })

        } catch (error: unknown) {
            // Error manager

            // The user send incorrect data (error in zod)
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    errors: error.name
                })
                return;
            }

            // Check if they are native TypeScript errors
            if (error instanceof Error) {
                if (error.message === 'Email address is already registered') {
                    res.status(409).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }

                console.error('[Auth Error]:', error.message);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
                return;
            }

            // Fallback in case something that is not an Error is thrown (e.g., throw "Fail")
            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Unknown error'
            });

        }
    }

    login = async (req: Request, res: Response) => {
        try {
            // Validate the data
            const validatedData = LoginSchema.parse(req.body)

            // Try logging in to the service
            const result = await this.authService.login(validatedData);

            // Return code 200 (OK) with the token and user data
            res.status(200).json({
                success: true,
                message: "Login successful",
                data: result
            });
        } catch (error: unknown) {

            if (error instanceof ZodError) {
                res.status(400).json(
                    {
                        success: false,
                        errors: error.issues
                    }
                );
                return;
            }
            
            if (error instanceof Error) {
                if (error.message === 'Invalid credentials') {
                    res.status(401).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }

                console.error('[Auth Error]:', error.message);
                res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
                return;
            }

            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Unknown error'
            });
        }
    }
}