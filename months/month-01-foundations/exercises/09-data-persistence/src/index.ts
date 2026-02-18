/**
 * EJERCICIO MÓDULO 09 : PERSISTENCIA EN JSON
 * Proyecto: Tango Resto Bar
 * * * OBJETIVO:
 * Crear un servicio que guarde y recupere platos sugeridos en un archivo 
 * físico llamado 'database.json', para que los datos sobrevivan al reinicio.
 * * * TAREAS:
 * 1. Definir la interfaz 'DailySpecial' con los campos: id, name y price.
 * 2. Implementar 'cargarDatos': una función asíncrona que lea el JSON y maneje 
 * la ausencia del archivo devolviendo un array vacío.
 * 3. Implementar 'guardarPlato': una función que gestione la lectura previa, 
 * la generación de IDs autoincrementales y la escritura en disco.
 * 4. Crear 'mostrarMenu' para imprimir los platos cargados en formato de tabla.
 * * * REQUISITOS:
 * - Usar el módulo nativo 'fs/promises' y 'path' para la gestión de rutas.
 * - Guardar el JSON con indentación de 2 espacios para asegurar su legibilidad.
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