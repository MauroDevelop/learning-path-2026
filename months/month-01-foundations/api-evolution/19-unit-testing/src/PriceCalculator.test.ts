import { PriceCalculator } from './PriceCalculator.js';

// 'describe' agrupa un conjunto de pruebas relacionadas
describe('PriceCalculator', () => {

    // test: Define un escenario de prueba único
    test('Debe calcular el precio final sumando el IVA (21%)', () => {
        // llamamos a la función y le pasamos datos de pruba
        const result = PriceCalculator.calculateFinalPrice(100, 0.21);
        // Aserción: Compara si el valor recibido (result) es estrictamente igual al esperado (121)
        expect(result).toBe(121);
    });

    test('Debe descontar el monto indicado del precio final', () => {
        const result = PriceCalculator.calculateFinalPrice(100, 0.21, 10);
        expect(result).toBe(111);
    });

    test('Debe devolver 0 si el descuento supera al precio total', () => {
        const result = PriceCalculator.calculateFinalPrice(100, 0.21, 200);
        expect(result).toBe(0);
    });

    test('Debe lanzar error si el precio base es negativo', () => {
        expect(() => {
            PriceCalculator.calculateFinalPrice(-50, 0.21);
        }).toThrow("El precio base no puede ser negativo");
    });

});