// --- SECTION 1: TYPE GUARDS & DISCRIMINATED UNIONS ---

interface Product {
    type: 'product';
    id: number;
    name: string;
    price: number;
}

interface Order {
    type: 'order';
    id: number;
    customerName: string;
    total: number;
}

type MaroItem = Product | Order;

// Custom Type Guard to safely narrow down the item type
function isProduct(item: MaroItem): item is Product {
    return item.type === 'product';
}

const crochetInventory: Product[] = [
    { type: 'product', id: 1, name: 'Amigurumi Cat', price: 1500 },
    { type: 'product', id: 2, name: 'Wool Scarf', price: 2000 }
];

// --- TESTING SECTION 1 ---

console.log("\n--- CROCHET SEARCH (Exact price $1500) ---");
console.log(crochetInventory.filter(p => p.price === 1500));

// --- SECTION 2: ADVANCED FILTERING & UTILITY TYPES ---

interface Property {
    id: number;
    city: string;
    rooms: number;
    price: number;
}

/**
 * Search criteria for properties
 * 1. Omits 'id' as it is not used for filtering
 * 2. Makes all remaining properties optional (Partial)
 * 3. Adds 'maxPrice' for range-based queries
 */
type PropertyCriteria = Partial<Omit<Property, 'id'>> & { 
    maxPrice?: number;
};

function filterProperties(properties: Property[], criteria: PropertyCriteria): Property[] {
    return properties.filter((property) => {
        const filters = Object.entries(criteria);

        for (const [key, value] of filters) {
            
            // Range filter (maximum price evaluation)
            if (key === 'maxPrice') {
                if (property.price > (value as number)) return false;
                continue; 
            }

            // Equality filters (city, rooms, etc)
            const currentValue = property[key as keyof Property];
            if (value !== currentValue) return false;
        }
        return true;
    });
}

// --- TESTING SECTION 2 ---

const properties: Property[] = [
    { id: 2, city: 'Mendoza City', rooms: 23, price: 80_000 },
    { id: 3, city: 'Calcinas Rey', rooms: 13, price: 60_000 },
    { id: 4, city: 'Puerto Madero', rooms: 21, price: 90_000 },
    { id: 5, city: 'Mendoza', rooms: 3, price: 230_000 }
];

console.log("--- REAL ESTATE SEARCH (Up to $80,000) ---");
const realEstateResults = filterProperties(properties, { maxPrice: 80000 });
console.log(realEstateResults);