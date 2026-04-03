/**
 * Module 13: Full CRUD and Real Persistence (File System)
 * * Key learnings implemented:
 * - Native module integration ('fs/promises', 'path', 'url') to manage physical paths and files
 * - Real data persistence implementation by reading and writing to a 'database.json' file
 * - Asynchronous handling in Express routes using 'async/await' to ensure disk operations finish before responding
 * - Helper functions creation ('readGames', 'writeGames') to encapsulate data access logic
 * - Auto-incremental ID calculation based on the current content of a physical file
 * * Executed activities:
 * 1. Specific execution environment configuration via 'package.json' scripts
 * 2. Physical database creation in JSON format
 * 3. GET endpoint implementation that extracts information directly from the disk
 * 4. POST endpoint implementation that validates, processes, and saves new records permanently
 * * Execution command:
 * npm run dev:13
 * * Bash execution command (Add game):
 * curl -X POST http://localhost:3000/games -H "Content-Type: application/json" -d '{"title": "Minecraft", "genre": "Sandbox"}'
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.json');

// Defines the entity blueprint for Type Safety
interface VideoGame {
    id: number;
    title: string;
    genre: string;
}

// Helper function to encapsulate data reading logic
async function readGames(): Promise<VideoGame[]> {
    try {
        const content = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        // Returns an empty array if the file does not exist or fails to open
        return [];
    }
}

// Helper function to encapsulate data writing with strict typing
async function writeGames(games: VideoGame[]): Promise<void> {
    // The 'null, 2' argument formats the JSON with indentation for readability
    await fs.writeFile(DB_PATH, JSON.stringify(games, null, 2), 'utf-8');
}

app.post('/games', async (req: Request, res: Response) => {
    const { title, genre } = req.body;

    // Required data validation
    if (!title || !genre) {
        return res.status(400).json({ error: 'Missing data: title and genre are strictly required' });
    }

    const games = await readGames();

    // Instantiate the new object with an auto-incremental ID
    const newGame: VideoGame = {
        id: (games[games.length - 1]?.id || 0) + 1,
        title,
        genre
    };

    // Append to the array and write to disk
    games.push(newGame);
    await writeGames(games);

    // Respond with success (Status 201 Created)
    res.status(201).json(newGame);
});

app.get('/games', async (req: Request, res: Response) => {
    const games = await readGames();
    res.json(games);
});

app.listen(PORT, () => {
    console.log(`Reading Database from: ${DB_PATH}`);
    console.log(`Server running on http://localhost:${PORT}/games`);
});