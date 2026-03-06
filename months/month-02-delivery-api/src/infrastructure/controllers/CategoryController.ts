import { Request, Response } from "express";
import { CategoryService } from "../../services/CategoryService";
import { ZodError } from "zod";
import { AppError } from "../../shared/errors/AppError";
import { CreateCategorySchema } from "../../shared/dtos/MenuDTO";

export class CategoryController {
    // Dependecy Injection
    constructor(private readonly categoryService: CategoryService) { }

    createCategory = async (req: Request, res: Response) => {
        try {
            // Validate Data with Zod
            const validateData = CreateCategorySchema.parse(req.body)
            
            // Send the validate data to the service
            const newCategory = await this.categoryService.createCategory(validateData);
            
            res.status(201).json({
                success: true,
                message: 'A new category has been created',
                category: newCategory
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

            // Unknow errors
            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Unknown error'
            });
        }
    }

    getAllCategory = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAll();

            res.status(200).json({
                success: true,
                categories: categories
            });

        } catch (error: unknown) {
            // Unknow errors
            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}