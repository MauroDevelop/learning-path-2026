import { PriceCalculator } from './PriceCalculator.js';

// 'describe' groups a suite of related tests
describe('PriceCalculator', () => {

    // 'test' or 'it' defines a single isolated test case
    test('Should calculate the final price by adding VAT (21%)', () => {
        // Invoke the function with mock data
        const result = PriceCalculator.calculateFinalPrice(100, 0.21);
        
        // Assertion: Verifies if the received value strictly matches the expected outcome
        expect(result).toBe(121);
    });

    test('Should deduct the specified amount from the final price', () => {
        const result = PriceCalculator.calculateFinalPrice(100, 0.21, 10);
        expect(result).toBe(111);
    });

    test('Should return 0 if the discount exceeds the total price', () => {
        const result = PriceCalculator.calculateFinalPrice(100, 0.21, 200);
        expect(result).toBe(0);
    });

    test('Should throw an error if the base price is negative', () => {
        // We must wrap the execution in an anonymous function for Jest to catch the error
        expect(() => {
            PriceCalculator.calculateFinalPrice(-50, 0.21);
        }).toThrow("Base price cannot be negative");
    });

});