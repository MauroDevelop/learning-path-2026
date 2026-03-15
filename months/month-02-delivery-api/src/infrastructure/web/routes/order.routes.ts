import { Router } from 'express';
import { PrismaOrderRepository } from '../../repositories/PrismaOrderRepository';
import { PrismaProductRepository } from '../../repositories/PrismaProductRepository';
import { OrderService } from '../../../services/OrderService';
import { OrderController } from '../../controllers/OrderController';
import { authenticateToken, verifyRole } from '../../../middlewares/auth.middleware';

const router = Router();

// --- DEPENDENCY INJECTION SETUP ---

// Instantiate Repositories to handle data persistence
const orderRepository = new PrismaOrderRepository();
const productRepository = new PrismaProductRepository();

// Instantiate the Service by injecting the required repositories
const orderService = new OrderService(orderRepository, productRepository);

// Instantiate the Controller by injecting the service layer
const orderController = new OrderController(orderService);

// --- ROUTE DEFINITIONS ---

/**
 * Route: POST /
 * Description: Creates a new order.
 * Middleware: 
 * - authenticateToken: Verifies the JWT.
 * - verifyRole: Restricts access to authorized roles only.
 */
router.post(
    '/', 
    authenticateToken, 
    verifyRole(['CLIENT']), 
    orderController.createOrder
);

export { router as orderRoutes };