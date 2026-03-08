import { Router } from "express";
import { authenticateToken, verifyRole } from "../../../middlewares/auth.middleware";
import { CategoryController } from "../../controllers/CategoryController";
import { CategoryService } from '../../../services/CategoryService';

// Initialize the router for Category-related endpoints
const categoryRoutes = Router();
// Instance the controller to handle the incoming requests
const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

// --- ENDPOINT DEFINITIONS ---

// Route to create a new category (POST /)
categoryRoutes.post('/', authenticateToken, verifyRole(['ADMIN']),categoryController.createCategory);
// Route to retrieve all active categories (GET /)
categoryRoutes.get('/', authenticateToken, verifyRole(['ADMIN']), categoryController.getAllCategory);

// Export the routing module to be used in the main application
export { categoryRoutes };