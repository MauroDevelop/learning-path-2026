/**
 * Module 14: Layered Architecture and Separation of Concerns
 * * Key learnings implemented:
 * - Separating business logic (Services) from entry points (Controllers/Routes)
 * - Creating a Service class to centralize File System access
 * - Improving code readability by extracting heavy logic from Express endpoints
 * * Execution command:
 * npm run dev:14
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');

interface VideoGame {
    id: number;
    title: string;
    genre: string;
}

// This class is strictly responsible for interacting with the data source
class VideoGameService {
    async getAll(): Promise<VideoGame[]> {
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async create(title: string, genre: string): Promise<VideoGame> {
        const games = await this.getAll();
        
        const newGame: VideoGame = {
            id: (games[games.length - 1]?.id || 0) + 1,
            title,
            genre
        };
        
        games.push(newGame);
        await fs.writeFile(DB_PATH, JSON.stringify(games, null, 2));
        
        return newGame;
    }

    async delete(id: number): Promise<boolean> {
        const games = await this.getAll();
        const filteredGames = games.filter(game => game.id !== id);
        
        // If the lengths match, it means no game was removed (ID not found)
        if (games.length === filteredGames.length) return false;
        
        await fs.writeFile(DB_PATH, JSON.stringify(filteredGames, null, 2));
        return true;
    }
}

const gameService = new VideoGameService();

// Routes are now "clean": they handle the HTTP cycle and delegate logic to the service
app.get('/games', async (req: Request, res: Response) => {
    const data = await gameService.getAll();
    res.json(data);
});

app.post('/games', async (req: Request, res: Response) => {
    const { title, genre } = req.body;
    
    if (!title || !genre) {
        return res.status(400).json({ error: 'Missing required data' });
    }
    
    const newGame = await gameService.create(title, genre);
    res.status(201).json(newGame);
});

app.delete('/games/:id', async (req: Request, res: Response) => {
    const idParam = req.params.id;

    // Type Guard: We strictly verify that the parameter exists and is a string
    if (!idParam || typeof idParam !== 'string') {
        return res.status(400).json({ error: 'Invalid ID format provided' });
    }

    // URL parameters are received as strings, parsed using base 10 (decimal)
    const id = parseInt(idParam, 10); 
    const isDeleted = await gameService.delete(id);
    
    if (!isDeleted) {
        return res.status(404).json({ error: 'Game not found' });
    }
    
    res.json({ message: 'Successfully deleted' });
});

app.listen(PORT, () => {
    console.log(`Layered Architecture Server running on http://localhost:${PORT}`);
});