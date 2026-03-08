import { Request, Response } from "express";
import { ModifierService } from "../../services/ModifierService";
import { ZodError } from "zod";
import { AppError } from "../../shared/errors/AppError";
import { CreateModifierSchema } from "../../shared/dtos/MenuDTO";

export class ModifierController {
    constructor(private readonly modifierService: ModifierService) { }

    public createModifier = async (req: Request, res: Response): Promise<void> => {
        try {
            // Validate incoming data using Zod schema
            const validatedData = CreateModifierSchema.parse(req.body);

            // Call the service to create the new modifier
            const newModifier = await this.modifierService.createModifier(validatedData);

            // Return 201 Created response
            res.status(201).json({
                success: true,
                message: 'Modifier created successfully',
                data: newModifier
            });

        } catch (error: unknown) {
            
            // Handle validation errors (Zod)
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    errors: error.issues.map(err => err.message)
                });
                return;
            }

            // Handle business logic errors (AppError)
            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            // Unknown errors
            console.error('[ModifierController - create Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        
        }
    }

    public getAllModifiers = async (req: Request, res: Response): Promise<void> => {
        try {
            // Call the service to retrieve all active modifiers
            const modifiers = await this.modifierService.getAllActiveModifiers();

            // Return 200 OK response
            res.status(200).json({
                success: true,
                data: modifiers
            });
        } catch (error: unknown) {
            // Unknown errors
            console.error('[ModifierController - getAll Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    public deleteModifier = async (req: Request, res: Response): Promise<void> => {
        try {
            // Extract the ID from the route parameters
            const { id } = req.params;

            // Call the service to perform a soft delete
            const deletedModifier = await this.modifierService.deleteModifier(id as string);

            // Return 200 OK response
            res.status(200).json({
                success: true,
                message: 'Modifier deleted successfully',
                data: deletedModifier
            });
        } catch (error: unknown) {
            // Catch AppError (e.g., 404 if the modifier does not exist or is already deleted)
            if (error instanceof AppError) {
                res.status(error.statusCode).json({
                    success: false,
                    message: error.message
                });
                return;
            }

            // Unknown errors
            console.error('[ModifierController - delete Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}