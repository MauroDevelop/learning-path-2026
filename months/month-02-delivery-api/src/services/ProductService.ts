import { IProductRepository, CreateProductData, ProductFilters } from "../core/interfaces/IProductRepository";
import { CategoryService } from "./CategoryService";

import { AppError } from "../shared/errors/AppError";

export class ProductService {
    // Inject both dependencies into the constructor
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly categoryService: CategoryService // Inject the service for categories
    ) { }

    public async createProduct(data: CreateProductData) {
        // Fetch only the required category for performance optimization
        const categoryExists = await this.categoryService.getCategoryById(data.categoryId);
        if (!categoryExists) {
            throw new AppError('The product category is invalid or does not exist', 400);
        }

        const createdProduct = await this.productRepository.save(data);

        return createdProduct;
    }

    public async getAllActiveProducts() {
        return await this.productRepository.findAll(true);
    }

    public async deleteProduct(productId: string) {
        // Check if the product exists
        const product = await this.productRepository.findById(productId);

        if (!product || !product.isActive) {
            throw new AppError('Product not found or already deleted', 404);
        }

        // Apply Soft Delete through the repository
        const deletedProduct = await this.productRepository.softDelete(productId);

        return deletedProduct;
    }

    public async getProductById(productId: string) {
        const product = await this.productRepository.findById(productId);

        if (!product || !product.isActive) {
            throw new AppError('The product was not found or is deleted', 404);
        }

        return product;
    }

    public async getFilteredProducts(filters: ProductFilters) {
    // Business Rule: Ensure the price range is logically valid
    if (filters.minPrice && filters.maxPrice && filters.minPrice > filters.maxPrice) {
        throw new AppError('Minimum price cannot be greater than maximum price', 400);
    }

    // Delegate the search to the repository with the provided filter criteria
    const products = await this.productRepository.findManyWithFilters(filters);
    
    return products;
}
}