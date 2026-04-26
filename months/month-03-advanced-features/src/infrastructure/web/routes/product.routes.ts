import { Router } from "express";

import { authenticateToken, verifyRole } from '../../../middlewares/auth.middleware';
import { uploadMiddleware } from "../../../middlewares/upload.middleware";

import { PrismaProductRepository } from "../../repositories/PrismaProductRepository";
import { PrismaCategoryRepository } from "../../repositories/PrismaCategoryRepository";
import { ProductService } from "../../../services/ProductService";
import { CategoryService } from "../../../services/CategoryService";
import { ProductController } from "../../controllers/ProductController";


const productRoutes = Router();

const productRepo = new PrismaProductRepository();

const categoryRepository = new PrismaCategoryRepository();
const categoryService = new CategoryService(categoryRepository);

const productService = new ProductService(productRepo, categoryService);

const productController = new ProductController(productService);

// --- ENDPOINT DEFINITIONS ---

// GET /api/products -> Público (Cualquier persona o cliente puede ver el menú)
productRoutes.get('/search', productController.getProducts);
productRoutes.get('/', productController.getAllProducts)

// POST /api/products -> Protegido (Solo ADMIN)
productRoutes.post('/', authenticateToken, verifyRole(['ADMIN']), uploadMiddleware.single('image'), productController.createProduct);

// DELETE /api/products/:id -> Protegido (Solo ADMIN)
productRoutes.delete('/:id', authenticateToken, verifyRole(['ADMIN']), productController.deleteProduct);

export { productRoutes };

