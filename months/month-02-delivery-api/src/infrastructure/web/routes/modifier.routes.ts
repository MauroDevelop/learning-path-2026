import { Router } from "express";
import { authenticateToken, verifyRole } from '../../../middlewares/auth.middleware';

import { ModifierController } from "../../controllers/ModifierController";
import { ModifierService } from "../../../services/ModifierService";
import { PrismaModifierRepository } from "../../repositories/PrismaModifierRepository";

import { ProductService } from "../../../services/ProductService";
import { PrismaProductRepository } from "../../repositories/PrismaProductRepository";
import { CategoryService } from "../../../services/CategoryService";

const modifierRoutes = Router();

const categoryService = new CategoryService();

const productRepo = new PrismaProductRepository();
const productService = new ProductService(productRepo, categoryService);

const modifierRepo = new PrismaModifierRepository();
const modifierService = new ModifierService(modifierRepo, productService);

const modifierController = new ModifierController(modifierService);

// --- ENDPOINTS ---
modifierRoutes.get('/', modifierController.getAllModifiers);
modifierRoutes.post('/', authenticateToken, verifyRole(['ADMIN']), modifierController.createModifier);
modifierRoutes.delete('/:id', authenticateToken, verifyRole(['ADMIN']), modifierController.deleteModifier);

export { modifierRoutes };