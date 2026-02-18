
// --- SECCION 1 ---

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


function isProduct(item: MaroItem): item is Product {
    return item.type === 'product';
}

const inventarioCrochet: Product[] = [
    { type: 'product', id: 1, name: 'Amigurumi Gato', price: 1500 },
    { type: 'product', id: 2, name: 'Bufanda Lana', price: 2000 }
];

// --- PRUEBAS ---

console.log("\n--- BUSQUEDA CROCHET (precio exacto $1500) ---");
console.log(inventarioCrochet.filter(p => p.price === 1500));

// --- SECCION 2 ---

interface Propiedad {
    id: number;
    city: string;
    room: number;
    price: number;
}

/**
 * Criterios para la  busqueda:
 * 1. Omitimos 'id' porque no se filtra por ahi
 * 2. Hacemos todo opcional (Partial)
 * 3. Agregamos 'priceMaximo' para busquedas por rango
 */
type CriteriosPropiedad = Partial<Omit<Propiedad, 'id'>> & { 
    priceMaximo?: number 
};

function filterProperties(propiedades: Propiedad[], criteria: CriteriosPropiedad): Propiedad[] {
    return propiedades.filter((p) => {
        const filtros = Object.entries(criteria);

        for (const [key, value] of filtros) {
            
            // Filtro de Rango (precio maximo)
            if (key === 'priceMaximo') {
                if (p.price > (value as number)) return false;
                continue; 
            }

            // Filtros de Igualdad (city, Room, etc)
            const valorActual = p[key as keyof Propiedad];
            if (value !== valorActual) return false;
        }
        return true;
    });
}

// --- PRUEBAS ---

const propiedades: Propiedad[] = [
    { id: 2, city: 'Mendoza city', room: 23, price: 80_000 },
    { id: 3, city: 'Calcinas Rey ', room: 13, price: 60_000 },
    { id: 4, city: 'Puerto Mader', room: 21, price: 90_000 },
    { id: 5, city: 'Mendoza', room: 3, price: 230_000 }
];

console.log("--- BUSQUEDA INMOBILIARIA (Hasta $80.000) ---");
const resultadoInmo = filterProperties(propiedades, { priceMaximo: 80000 });
console.log(resultadoInmo);

