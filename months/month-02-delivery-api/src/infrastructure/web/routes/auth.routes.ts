// Import Express Router to create a routing module
import { Router } from 'express';
// Import our middlewares
import { authenticateToken, verifyRole } from '../../../middlewares/auth.middleware';
// Import AuthRequest to retrieve the saved user
import { AuthRequest } from '../../../middlewares/auth.middleware';

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
authRoutes.post('/login', authController.login);

// Define routes and handlers to test middleware functionality
authRoutes.get('/me',authenticateToken, (req: AuthRequest, res) => {
    res.json({
        success: true,
        message: 'You have access. Here is the data that middleware saved in req.user:',
        user: req.user
    });
});

// We use type inference here because Express provides contextual typing for the route handlers
authRoutes.get('/admin-only', authenticateToken, verifyRole(['ADMIN']), (req, res) => {
    res.json({
        success: true,
        message: 'You are Welcome! The system detected that you have Administrator permissions'
    })

});

// Export the routes to be used in the main application file (app.ts / index.ts)
export { authRoutes };