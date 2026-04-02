import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. ROUTING CONFIGURATION (Native Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const FILE_PATH = path.join(DATA_DIR, 'products.json');

// Defines valid categories to ensure type safety
type ProductCategory = 'amigurumi' | 'garment' | 'other';

// 2. INTERFACE
interface Product {
    id: number;
    name: string;
    price: number;
    category: ProductCategory;
}

async function initializeFile(): Promise<void> {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });
        console.log('Directory created/verified');
        
        try {
            await fs.access(FILE_PATH);
        } catch {
            // If the file does not exist, we create it with an empty array
            await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
        }
    } catch (error) {
        console.error("Initialization error:", error);
    }
}

async function addProduct(name: string, price: number, category: ProductCategory): Promise<void> {
    // Read file content and parse it
    const fileContent = await fs.readFile(FILE_PATH, 'utf-8');
    const products: Product[] = JSON.parse(fileContent);

    // Generate ID automatically
    const lastId = products[products.length - 1]?.id || 0;

    const newProduct: Product = {
        id: lastId + 1,
        name,
        price,
        category
    };
    
    products.push(newProduct);

    // Save updated file with 2-space indentation for readability
    await fs.writeFile(FILE_PATH, JSON.stringify(products, null, 2), 'utf-8');

    console.log(`Product ${name} with a price of $${price} was added`);
}

async function findByCategory(category: string): Promise<Product[]> {
   try {
    const fileContent = await fs.readFile(FILE_PATH, 'utf-8');
    const products: Product[] = JSON.parse(fileContent);

    // Strict equality used for safer comparisons
    const matchedProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    return matchedProducts;
    
   } catch (error) {
    console.error("A search error occurred:", error);
    return [];
   }
}

// TEST:
(async () => {
    await initializeFile();
    await addProduct("Attachment Octopus", 2500, "amigurumi");
    await addProduct("Infinity Scarf", 4000, "garment");

    const amigurumis = await findByCategory("amigurumi");
    console.log('--- SEARCH RESULTS ---');
    console.table(amigurumis);
})();