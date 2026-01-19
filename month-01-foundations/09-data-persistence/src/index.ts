/**
 * EJERCICIO MÓDULO 09 : PERSISTENCIA EN JSON
 * Proyecto: Tango Resto Bar
 * * * OBJETIVO:
 * Crear un servicio que guarde y recupere platos sugeridos en un archivo 
 * físico llamado 'database.json', para que los datos sobrevivan al reinicio.
 * * * TAREAS:
 * 1. Crear una interfaz 'DailySpecial' con: id, nombre y precio.
 * 2. Implementar una función 'saveToFile' que convierta un array a JSON y lo guarde.
 * 3. Implementar una función 'readFromFile' que lea el archivo y lo convierta a array.
 * 4. Crear un método para agregar un nuevo plato sin borrar los anteriores.
 * * * REQUISITOS:
 * - Usar el módulo nativo 'fs' (promises) de Node.js.
 * - El archivo 'database.json' debe crearse automáticamente si no existe.
 */
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración básica de rutas
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');

interface DailySpecial {
  id: number;
  name: string;
  price: number;
}

// Función auxiliar para no repetir código de lectura
async function cargarDatos(): Promise<DailySpecial[]> {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    // Si no existe el archivo, devolvemos un array vacío para empezar
    return [];
  }
}

async function guardarPlato(nombre: string, precio: number) {
  const platos = await cargarDatos();

  // Generar ID: buscamos el último o empezamos en 1
  const ultimoId = platos[platos.length - 1]?.id || 0;  
  const nuevoPlato: DailySpecial = {
    id: ultimoId + 1,
    name: nombre,
    price: precio
  };

  platos.push(nuevoPlato);

  // Guardamos con un poco de formato para que sea legible
  await fs.writeFile(DB_PATH, JSON.stringify(platos, null, 2));
  console.log(`-> Agregado: ${nombre} ($${precio})`);
}

async function mostrarMenu() {
  const platos = await cargarDatos();
  console.log("\n--- MENÚ TANGO RESTO BAR ---");
  if (platos.length === 0) {
    console.log("No hay platos cargados todavía.");
  } else {
    console.table(platos);
  }
}

// Test rápido de funcionamiento
(async () => {
  try {
    await guardarPlato("Milanesa a la Napolitana", 5500);
    await guardarPlato("Sorrentinos de Jamón y Queso", 4800);
    await mostrarMenu();
  } catch (error) {
    console.error("Hubo un fallo:", error);
  }
})();