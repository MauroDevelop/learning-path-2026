export class PriceCalculator {
    /**
     * Calculates the final price by applying tax and an optional discount
     * basePrice = Base price of the product (e.g., 100)
     * taxRate = Tax rate to apply (e.g., 0.21 for 21%)
     * discountAmount = Amount to deduct (optional, default is 0)
     */

    // Static method: The function belongs to the class itself, not to a specific instance
    static calculateFinalPrice(basePrice: number, taxRate: number, discountAmount: number = 0): number {

        // Negative prices are not allowed
        if (basePrice < 0) {
            // Halts execution immediately and throws an Error
            throw new Error("Base price cannot be negative");
        }

        // Tax calculation
        const tax = basePrice * taxRate;

        // Add tax and subtract discount
        const finalPrice = (basePrice + tax) - discountAmount;

        // If the discount exceeds the total price, return 0 to prevent negative balances
        return finalPrice < 0 ? 0 : finalPrice;
    }
}