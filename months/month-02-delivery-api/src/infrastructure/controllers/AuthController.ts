import { Request, Response } from "express";
import { AuthService } from "../../services/AuthService";
import { RegisterSchema } from "../../shared/dtos/AuthDTO";
// Errors manager with zod
import { ZodError } from "zod";

export class AuthController {

    constructor(private authService: AuthService) { }

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            // Zod valida y limpia req.body. Si es válido devuelve los datos
            // tipados; si falla, lanza un error y salta al catch.
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
            // Erros manager

            // The user send incorrect data (error in zod)
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    errors: error.name
                })
                return;
            }

            // Verificamos si son errores nativos de typescript
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
                    message: 'Error interno del servidor'
                });
                return;
            }

            // Fallback por si alguien lanza algo que no es un Error (ej: throw "Fallo")
            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Error desconocido'
            });

        }
    }



}