import { ProductService } from "../../services/ProductService";
import { Request, Response, NextFunction } from "express";
import { CreateProductSchema } from "../../shared/dtos/MenuDTO";
import { ZodError } from "zod";

export class ProductController {
    constructor(private readonly productService: ProductService) { }

    public createProduct = async (req: Request, res: Response) => {
        try {
            // Validate request body used CreateCategorySchema
            const validatedData = CreateProductSchema.parse(req.body);

            // Call service
            const newProduct = await this.productService.createProduct(validatedData);

            // Response 
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: newProduct
            });

        } catch (error: unknown) {

            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: error.issues
                });
                return;
            }

            if (error instanceof Error) {
                if (error.message === 'The product category is invalid or does not exist') {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                    return
                }
            }

            // Unknown errors
            console.error('[Unknown Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }

    public getAllProducts = async (req: Request, res: Response): Promise<void> => {
        try {
            // Call the service and get all products for the database 
            const products = await this.productService.getAllActiveProducts();

            // Successfully response
            res.status(200).json({
                success: true,
                data: products
            });
        } catch (error: unknown) {
            // Errors unknows
            console.error('[ProductController - getAllProducts Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };

    public deleteProduct = async (req: Request, res: Response): Promise<void> => {
        try {
            // 1. Extract data and validate request
            const { id } = req.params;


            // 2. Call service
            const deletedProduct = await this.productService.deleteProduct(id as string);

            // 3. Send success response
            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
                data: deletedProduct
            });
        } catch (error: unknown) {
            // Handle specific errors here
            if (error instanceof Error) {
                if (error.message === 'Product not found or already deleted') {
                    res.status(404).json({
                        success: false,
                        message: error.message
                    });
                    return;
                }
            }

            // Handle unknown errors
            console.error('[ProductController - deletedProduct Error]:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
}
