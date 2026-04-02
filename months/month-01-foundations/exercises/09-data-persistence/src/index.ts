/**
 * MODULE 09 EXERCISE: JSON PERSISTENCE
 * Project: Tango Resto Bar
 * * * OBJECTIVE:
 * Create a service that saves and retrieves suggested dishes in a physical 
 * file named 'database.json', ensuring data survives server restarts
 * * * TASKS:
 * 1. Define the 'DailySpecial' interface with fields: id, name and price
 * 2. Implement 'loadData': an asynchronous function that reads the JSON and handles 
 * the absence of the file by returning an empty array
 * 3. Implement 'saveDish': a function that manages prior reading, 
 * auto-incremental ID generation and disk writing
 * 4. Create 'displayMenu' to output the loaded dishes in a table format
 * * * REQUIREMENTS:
 * - Use the native 'fs/promises' and 'path' modules for route management
 * - Save the JSON with a 2-space indentation to ensure readability
 */
import fs from 'fs/promises'; 
import path from 'path';
import { fileURLToPath } from 'url';

// Basic path configuration
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');

interface DailySpecial {
  id: number;
  name: string;
  price: number;
}

// Helper function to prevent read code duplication
async function loadData(): Promise<DailySpecial[]> {
  try {
    const rawData = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    // If the file does not exist, we return an empty array to start
    return [];
  }
}

async function saveDish(name: string, price: number): Promise<void> {
  const dishes = await loadData();

  // Generate ID: find the last one or start at 1
  const lastId = dishes[dishes.length - 1]?.id || 0;  
  const newDish: DailySpecial = {
    id: lastId + 1,
    name,
    price
  };

  dishes.push(newDish);

  // Save with formatting for readability
  await fs.writeFile(DB_PATH, JSON.stringify(dishes, null, 2));
  console.log(`-> Added: ${name} ($${price})`);
}

async function displayMenu(): Promise<void> {
  const dishes = await loadData();
  console.log("\n--- TANGO RESTO BAR MENU ---");
  if (dishes.length === 0) {
    console.log("No dishes loaded yet");
  } else {
    console.table(dishes);
  }
}

// Quick functionality test
(async () => {
  try {
    await saveDish("Milanesa a la Napolitana", 5500);
    await saveDish("Sorrentinos de Jamon y Queso", 4800);
    await displayMenu();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();