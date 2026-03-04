import { IProductRepository, CreateProductData } from "../core/interfaces/IProductRepository";
import { CategoryService } from "./CategoryService";

export class ProductService {
    // Inject both dependencies into the constructor
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly categoryService: CategoryService // Inyectamos el servicio de categorías
    ) { }

    public async createProduct(data: CreateProductData) {
        // Fetch only the required category for performance optimization
        const categoryExists = await this.categoryService.getCategoryById(data.categoryId);
        if (!categoryExists) {
            throw new Error('The product category is invalid or does not exist');
        }

        const createdProduct = await this.productRepository.save(data)

        return createdProduct;
    }

    public async getAllActiveProducts() {
        return await this.productRepository.findAll(true);
    }

    public async deleteProduct(productId: string) {
        // Check if the product exists
        const product = await this.productRepository.findById(productId);

        if (!product || !product.isActive) {
            throw new Error('Product not found or already deleted');
        }

        // Apply Soft Delete through the repository
        const deletedProduct = await this.productRepository.softDelete(productId);

        return deletedProduct;
    }
}