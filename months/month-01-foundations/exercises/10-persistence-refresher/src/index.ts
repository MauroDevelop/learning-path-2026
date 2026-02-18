import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. CONFIGURACIÓN DE RUTAS (Native Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');
const FILE_PATH = path.join(DATA_DIR, 'productos.json');

// 2. INTERFAZ
interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categoria: 'amigurumi' | 'prenda' | 'otros';
}

async function inicializarArchivo() {
    try {
        await fs.mkdir(DATA_DIR, {recursive: true})
        console.log('Directorio creado/verificado.')
        // TODO: Asegúrate de que la carpeta 'data' exista usando fs.mkdir
        // Pista: await fs.mkdir(DATA_DIR, { recursive: true });
        
        try {
            await fs.access(FILE_PATH);
        } catch {
            // Si el archivo no existe, lo creamos con un array vacío
            await fs.writeFile(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
        }
    } catch (error) {
        console.error("Error al inicializar:", error);
    }
}

async function agregarProducto(nombre: string, precio: number, categoria: any) {
    // TODO: 
    // 1. Leer el archivo (usa utf-8)
    // 2. Convertir de JSON a Array
    // 3. Crear el nuevo objeto Producto (genera el ID automáticamente)
    // 4. Hacer el .push() al array
    // 5. Guardar el archivo actualizado (JSON.stringify con indentación)
    const contenedJSON = await fs.readFile(FILE_PATH, 'utf-8');
    const array: Array<Producto> = JSON.parse(contenedJSON);

    const lastID = array[array.length -1]?.id || 0;

    const producto: Producto = {
        id: lastID +1,
        nombre: nombre,
        precio: precio,
        categoria: categoria,
    }
    array.push(producto);

    await fs.writeFile(FILE_PATH, JSON.stringify(array, null, 2), 'utf-8'); // el null y 2 para que no sea una sola línea dificil de leer

    console.log(`Producto ${nombre} con precio de ${precio} fue agregado`);
    
    
}

async function buscarPorCategoria(categoria: string) {
   try{
    const contenedJSON = await fs.readFile(FILE_PATH, 'utf-8');
    const array: Array<Producto> = JSON.parse(contenedJSON);

    const producto = array.filter(p => p.categoria.toLocaleLowerCase() == categoria.toLocaleLowerCase())
    return producto
    
   } catch (error) {
    console.error("Ha habido un error en la búsqueda: ", error)
    return [];
   }
}

// TEST:
(async () => {
    await inicializarArchivo();
    await agregarProducto("Pulpo de Apego", 2500, "amigurumi");
    await agregarProducto("Bufanda Infinita", 4000, "prenda");

    const amigurumis = await buscarPorCategoria("amigurumi");
    console.log('--- RESULTADOS DE BUSQUEDA ---')
    console.table(amigurumis)
})();