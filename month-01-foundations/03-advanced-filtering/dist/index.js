"use strict";
// --- SECCION 1 ---
Object.defineProperty(exports, "__esModule", { value: true });
function isProduct(item) {
    return item.type === 'product';
}
const inventarioCrochet = [
    { type: 'product', id: 1, name: 'Amigurumi Gato', price: 1500 },
    { type: 'product', id: 2, name: 'Bufanda Lana', price: 2000 }
];
// --- PRUEBAS ---
console.log("\n--- BUSQUEDA CROCHET (price exacto $1500) ---");
console.log(inventarioCrochet.filter(p => p.price === 1500));
function filterProperties(propiedades, criteria) {
    return propiedades.filter((p) => {
        const filtros = Object.entries(criteria);
        for (const [key, value] of filtros) {
            // Filtro de Rango (precio maximo)
            if (key === 'priceMaximo') {
                if (p.price > value)
                    return false;
                continue;
            }
            // Filtros de Igualdad (city, Room, etc)
            const valorActual = p[key];
            if (value !== valorActual)
                return false;
        }
        return true;
    });
}
// --- PRUEBAS ---
const propiedades = [
    { id: 2, city: 'Mendoza city', room: 23, price: 80_000 },
    { id: 3, city: 'Calcinas Rey ', room: 13, price: 60_000 },
    { id: 4, city: 'Puerto Mader', room: 21, price: 90_000 },
    { id: 5, city: 'Mendoza', room: 3, price: 230_000 }
];
console.log("--- BUSQUEDA INMOBILIARIA (Hasta $80.000) ---");
const resultadoInmo = filterProperties(propiedades, { priceMaximo: 80000 });
console.log(resultadoInmo);
//# sourceMappingURL=index.js.map