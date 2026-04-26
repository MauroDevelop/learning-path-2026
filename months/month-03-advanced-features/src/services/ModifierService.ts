import { IModifierRepository, CreateModifierData } from "../core/interfaces/IModifierRepository";
import { ProductService } from "./ProductService";
import { AppError } from "../shared/errors/AppError";

export class ModifierService {

    constructor(
        private readonly modifierRepo: IModifierRepository,
        private readonly productService: ProductService
    ) { }

    public async createModifier(data: CreateModifierData) {
        const validateProduct = await this.productService.getProductById(data.productId);

        // Verify if the product exists before creating an associated modifier
        if (!validateProduct) {
            throw new AppError('The associated product does not exist', 404)
        }
        
        // Persist the modifier record in the database
        return await this.modifierRepo.save(data)
    }

    public async getAllActiveModifiers() {
        return await this.modifierRepo.findAll(true);
    }

    public async deleteModifier(modifierId: string) {
        // Check if the modifier exists and is currently active
        const modifier = await this.modifierRepo.findById(modifierId);

        if (!modifier || !modifier.isActive) {
            throw new AppError('Modifier not found or already deleted', 404);
        }

        // Perform a Soft Delete on the modifier record
        return await this.modifierRepo.softDelete(modifierId);
    }
}