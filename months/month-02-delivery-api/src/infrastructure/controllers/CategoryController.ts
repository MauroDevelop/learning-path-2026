import { Request, Response } from "express";
import { CategoryService } from "../../services/CategoryService";
import { ZodError } from "zod";

export class CategoryController {
    private categoryService = new CategoryService();

    createCategory = async (req: Request, res: Response) => {
        try {
            const newCategory = await this.categoryService.createCategory(req.body);

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

            // Handle storage errors (e.g., Duplicates)
            if (error instanceof Error) {
                if (error.message === 'Category with this name already exists') {
                    res.status(409).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }
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