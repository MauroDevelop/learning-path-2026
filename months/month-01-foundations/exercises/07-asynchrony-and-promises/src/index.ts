/**
 * EJERCICIO: "Simulador de Inventario de Hardware"
 * -----------------------------------------
 * Objetivo: Practicar el manejo de Promesas y Async/Await en un entorno Backend.
 * * 1. Interfaz 'Product': Debe tener id (number), name (string) y stock (number).
 * 2. Simulación de DB: Crear un array 'componentInventory' con componentes de PC.
 * 3. Lógica a implementar:
 * - PROMISE: 'getProductById' busca un producto. Se resuelve tras 2 segundos si existe,
 * o se rechaza si no se encuentra.
 * - ASYNC/AWAIT: 'checkStock' gestiona la espera de la promesa y muestra el estado.
 * - TRY/CATCH: Capturar errores de búsqueda para evitar que la app se detenga.
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

// Función que simula una consulta asíncrona a una base de datos
function getProductById(id: number): Promise<Product> {
    return new Promise((resolve, reject) => {
        console.log(`[DB] Consultando disponibilidad del componente ID: ${id}...`);
        
        setTimeout(() => {
            const product = componentInventory.find(p => p.id === id);
            if (product) {
                resolve(product);
            } else {
                reject(new Error(`[Error] El componente con ID ${id} no fue localizado en el sistema.`));
            }
        }, 2000); // Simulación de latencia de red
    });
}

// Función para verificar stock de forma asíncrona
async function checkStock(id: number): Promise<void> {
    try {
        const product = await getProductById(id);
        console.log(`--- Reporte de Inventario: ${product.name} ---`);
        
        if (product.stock > 0) {
            console.log(`Estado: En stock (${product.stock} unidades disponibles).`);
        } else {
            console.log(`Estado: Sin stock disponible actualmente.`);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    } finally {
        console.log(`Operación finalizada para el ID ${id}.\n`);
    }
}

// --- EJECUCIÓN ---
console.log("--- INICIANDO SISTEMA DE CONTROL DE HARDWARE ---");

// Consulta exitosa
checkStock(201);

// Consulta de producto sin stock
checkStock(202);

// Consulta de producto inexistente 
checkStock(500);