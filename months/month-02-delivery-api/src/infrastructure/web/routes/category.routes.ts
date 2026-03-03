import { Router } from "express";
import { CategoryController } from "../../controllers/CategoryController";

// Initialize the router for Category-related endpoints
const categoryRoutes = Router();
// Instance the controller to handle the incoming requests
const categoryController = new CategoryController();

// --- ENDPOINT DEFINITIONS ---

// Route to create a new category (POST /)
categoryRoutes.post('/', categoryController.createCategory);
// Route to retrieve all active categories (GET /)
categoryRoutes.get('/', categoryController.getAllCategory);

// Export the routing module to be used in the main application
export { categoryRoutes };