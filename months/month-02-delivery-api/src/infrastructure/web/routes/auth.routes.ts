// Import Express Router to create a routing module
import { Router } from 'express';
import { AuthController } from '../../controllers/AuthController';
import { AuthService } from '../../../services/AuthService';
import { PrismaUserRepository } from '../../repositories/PrismaUserRepository';

// Initialize the Router
const authRoutes = Router();

// --- DEPENDENCY INJECTION (Wiring up the layers) ---

// Initialize database access (Lowest layer / Infrastructure)
const userRepository = new PrismaUserRepository();

// Initialize business logic and "inject" the repository
const authService = new AuthService(userRepository);

// Initialize the controller and "inject" the service
const authController = new AuthController(authService);

// --- ENDPOINT DEFINITIONS ---
authRoutes.post('/register', authController.register);

// Export the routes to be used in the main application file (app.ts / index.ts)
export { authRoutes };