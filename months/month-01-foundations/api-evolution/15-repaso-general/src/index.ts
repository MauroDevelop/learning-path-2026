import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');

app.use(express.json());

// Culinary terms translated to industry standard English
type Category = 'Appetizer' | 'Main Course' | 'Dessert' | 'Beverage';

// 'Dish' is the correct term for a prepared food item, not 'Plate'
interface Dish {
    readonly id: number;
    name: string;
    price?: number;
    category?: Category;
    available?: boolean;
}

class MenuService {
    async getAll(): Promise<Dish[]> {
        try {
            // Fixed typo: contend -> content
            const content = JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));
            return content;
        } catch (error) {
            return [];
        }
    }

    async getById(id: number): Promise<Dish | undefined> {
        const dishes = await this.getAll(); 
        const matchedDish = dishes.find((d) => d.id === id);
        return matchedDish;
    }

    async saveDishes(dishes: Dish[]): Promise<void> {
        const dishString = JSON.stringify(dishes, null, 2);
        await fs.writeFile(DB_PATH, dishString);
    }

    async create(data: Omit<Dish, 'id'>): Promise<Dish> {
        const dishes = await this.getAll();

        // Fallback pattern to handle undefined IDs safely
        const lastId = dishes.length > 0 ? dishes[dishes.length - 1]?.id || 0 : 0;
        const newId = lastId + 1;

        const newDish: Dish = {
            id: newId,
            ...data // Spreads name, price, category, etc
        };

        dishes.push(newDish);
        await this.saveDishes(dishes);

        return newDish;
    }

    async getOccupiedIds(): Promise<number[]> {
        const dishes = await this.getAll();
        return dishes.map(d => d.id);
    }

    // Returning a boolean is standard practice for Service layer deletions
    async deleteDish(id: number): Promise<boolean> {
        const allDishes = await this.getAll();
        const remainingDishes = allDishes.filter(d => d.id !== id);
        
        if (remainingDishes.length === allDishes.length) {
            return false;
        }
        
        await this.saveDishes(remainingDishes);
        return true;
    }
}

// Always include parentheses when instantiating a class
const menuService = new MenuService();

// Self-invoking function for quick testing
(async () => {
    try {
        console.log(await menuService.getOccupiedIds());
        
        const isDeleted = await menuService.deleteDish(4);
        console.log(`Deletion successful: ${isDeleted}`);
    } catch (error) {
        console.log('An error occurred:', error);
    }
})();

app.get('/menu/:id', async (req: Request, res: Response) => {

    const idParam = req.params.id;

    // Type Guard: We strictly verify that the parameter exists and is a string
    if (!idParam || typeof idParam !== 'string') {
        return res.status(400).json({ error: 'Invalid ID format provided' });
    }

    // Safe parsing with radix 10
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID must be a valid number" });
    }

    const dish = await menuService.getById(id);

    if (dish) {
        res.json(dish);
    } else {
        // Status 404 is the RESTful standard for "Not Found" resources
        res.status(404).json({ error: "Dish not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/menu`);
});