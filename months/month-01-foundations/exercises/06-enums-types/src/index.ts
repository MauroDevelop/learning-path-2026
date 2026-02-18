/*
* * REQUISITOS:
 * 1. Enum 'PaymentMethod': Debe incluir CREDIT_CARD, PAYPAL y CRYPTO.
 * 2. Union Type 'SubscriptionTier': Solo puede ser 'Basic', 'Pro' o 'VIP'.
 * 3. Interfaz 'Transaction': 
 * - id (readonly number)
 * - amount (number)
 * - method (PaymentMethod)
 * - tier (SubscriptionTier)
 * - status: 'success' | 'failed' | 'pending' (Union type inline)
 */
enum PaymentMethod {
    CREDIT_CARD = 'Tarjeta de credito',
    PAYPAL = 'PayPal',
    CRYPTO = 'Crypto'
};

type SubscriptionTier = 'Basic' | 'Pro' | 'VIP';

interface Transaction {
    readonly id: number;
    amount: number;
    method: PaymentMethod;
    tier: SubscriptionTier;
    status: 'pending'  | 'success' | 'failed';
};

/*
* * TAREAS:
 * - Crear una lista de transacciones con diferentes estados y métodos.
 * - Crear una función 'processTransaction' que reciba una transacción 
 * y "valide" que si el monto es > 500, el status pase a 'failed' 
 * (simulando un límite de seguridad).
 * - Usar .filter() para obtener solo las transacciones 'success'.
 * - Usar .map() para generar un reporte que diga: 
 * "Usuario [tier] pagó $[amount] vía [method]".
 */

const transactions: Transaction[] = [
    { id: 1, amount: 150, method: PaymentMethod.PAYPAL, tier: 'Basic', status: 'pending' },
    { id: 2, amount: 600, method: PaymentMethod.CREDIT_CARD, tier: 'VIP', status: 'pending' },
    { id: 3, amount: 50, method: PaymentMethod.CRYPTO, tier: 'Pro', status: 'pending' }
];

function processTransaction(t: Transaction){
    if (t.amount > 500){
        t.status = 'failed';
        return {...t, status: 'failed'}; // se retorna una copia con fallo
    };
    return {...t, status: 'success'}; // se retorna una copia con el éxito
}

const result = transactions.map(t => processTransaction(t));

const transactionsSuccess = result.filter(t => t.status === 'success');

const report = transactionsSuccess.map(t => `Usuario ${t.tier} pagó ${t.amount} vía ${t.method}` )

console.log('--- Resultados ---')
console.log(report);