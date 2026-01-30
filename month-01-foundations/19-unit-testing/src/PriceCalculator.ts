export class PriceCalculator {
    /**
     * Calcula el precio final aplicando IVA y un descuento opcional:
     * basePrice = Precio base del producto (ej: 100)
     * taxRate = Tasa de impuestos (ej: 0.21 para 21%)
     * discountAmount = Monto a descontar (opcional, default 0)
     */

    // Con static (Método estático): La función pertenece a la "Clase" en general, no a un objeto en particular
    static calculateFinalPrice(basePrice:number, taxRate: number, discountAmount: number = 0){

        // No se aceptan precios negativos
        if (basePrice < 0){
            // El proceso se detiene en seco y no entrega ningún resultado, entrega un Error
            throw new Error("¡El precio es negativo!");
        }

        // Calculo impuesto
        const tax = basePrice * taxRate;

        // Sumamos impuesto y restamos descuento
        const finalPrice = (basePrice + tax) - discountAmount;

        // Si el descuento es mayor al precio, devolvemos 0 (no devolvemos dinero)
        return finalPrice < 0 ? 0 : finalPrice;


    };
}