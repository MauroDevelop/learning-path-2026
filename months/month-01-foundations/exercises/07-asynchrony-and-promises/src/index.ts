/**
 * EXERCISE: "Hardware Inventory Simulator"
 * -----------------------------------------
 * Objective: Practice Promise handling and Async/Await in a Backend environment
 * * 1. 'Product' Interface: Must contain id (number), name (string) and stock (number)
 * 2. DB Simulation: Create a 'componentInventory' array with PC components
 * 3. Logic to implement:
 * - PROMISE: 'getProductById' searches for a product. Resolves after 2 seconds if found,
 * or rejects if not found
 * - ASYNC/AWAIT: 'checkStock' manages the promise waiting and outputs the status
 * - TRY/CATCH: Catch search errors to prevent the app from crashing
 */

interface Product {
    id: number;
    name: string;
    stock: number;
}

const componentInventory: Product[] = [
    { id: 201, name: "Procesador AMD Ryzen 5", stock: 10 },
    { id: 202, name: "Tarjeta Gráfica RTX 3060", stock: 0 },
    { id: 203, name: "Memoria RAM 16GB DDR4", stock: 25 },
    { id: 204, name: "SSD NVMe 1TB", stock: 15 }
];

// Function simulating an asynchronous database query
function getProductById(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
        console.log(`[DB] Querying availability for component ID: ${id}...`);
        
        // Network latency simulation
        setTimeout(() => {
            const product = componentInventory.find(p => p.id === id);
            if (product) {
                resolve(product);
            } else {
                reject(new Error(`[Error] Component with ID ${id} was not located in the system`));
            }
        }, 2000); 
    });
}

// Function to verify stock asynchronously
async function checkStock(id: number): Promise<void> {
    try {
        const product = await getProductById(id);
        console.log(`--- Inventory Report: ${product.name} ---`);
        
        if (product.stock > 0) {
            console.log(`Status: In stock (${product.stock} units available)`);
        } else {
            console.log(`Status: Out of stock currently`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    } finally {
        console.log(`Operation completed for ID ${id}\n`);
    }
}

// --- EXECUTION ---
// Wrapped in an async function to enforce sequential execution
async function runSimulator(): Promise<void> {
    console.log("--- STARTING HARDWARE CONTROL SYSTEM ---");

    // Successful query
    await checkStock(201);

    // Out-of-stock product query
    await checkStock(202);

    // Non-existent product query
    await checkStock(500);
}

runSimulator();