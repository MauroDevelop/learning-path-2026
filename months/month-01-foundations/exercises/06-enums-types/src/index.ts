/**
 * REQUIREMENTS:
 * 1. 'PaymentMethod' Enum: Must include CREDIT_CARD, PAYPAL and CRYPTO
 * 2. 'SubscriptionTier' Union Type: Must be 'Basic', 'Pro' or 'VIP'
 * 3. 'Transaction' Interface: 
 * - id (readonly number)
 * - amount (number)
 * - method (PaymentMethod)
 * - tier (SubscriptionTier)
 * - status: 'success' | 'failed' | 'pending' (Inline union type)
 */
enum PaymentMethod {
    CREDIT_CARD = 'Credit Card',
    PAYPAL = 'PayPal',
    CRYPTO = 'Crypto'
}

type SubscriptionTier = 'Basic' | 'Pro' | 'VIP';

interface Transaction {
    readonly id: number;
    amount: number;
    method: PaymentMethod;
    tier: SubscriptionTier;
    status: 'pending' | 'success' | 'failed';
}

/**
 * TASKS:
 * - Create a transaction list with different statuses and methods
 * - Create a 'processTransaction' function that receives a transaction 
 * and validates that if the amount is > 500, the status changes to 'failed' 
 * (simulating a security limit)
 * - Use .filter() to retrieve only 'success' transactions
 * - Use .map() to generate a report stating: 
 * "User [tier] paid $[amount] via [method]"
 */

const transactions: Transaction[] = [
    { id: 1, amount: 150, method: PaymentMethod.PAYPAL, tier: 'Basic', status: 'pending' },
    { id: 2, amount: 600, method: PaymentMethod.CREDIT_CARD, tier: 'VIP', status: 'pending' },
    { id: 3, amount: 50, method: PaymentMethod.CRYPTO, tier: 'Pro', status: 'pending' }
];

function processTransaction(transaction: Transaction): Transaction {
    if (transaction.amount > 500) {
        // returns a copy with a failed status
        return { ...transaction, status: 'failed' };
    }
    
    // returns a copy with a success status
    return { ...transaction, status: 'success' };
}

const processedTransactions = transactions.map(t => processTransaction(t));

const successfulTransactions = processedTransactions.filter(t => t.status === 'success');

const report = successfulTransactions.map(t => `User ${t.tier} paid $${t.amount} via ${t.method}`);

console.log('--- Results ---');
console.log(report);