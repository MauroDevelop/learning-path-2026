/**
 * Module 12: REST API - Handling incoming data (POST and Middleware)
 * * Key learnings implemented:
 * - Express configuration to parse JSON payloads using 'express.json()' middleware
 * - HTTP POST method utilization to transmit data to the server
 * - Request body access via 'req.body'
 * - Mandatory data validation ("Bouncer" pattern) and 400 status error handling
 * - Temporary data persistence (in-memory array) returning a 201 Created status
 * * Bash execution command (Add game):
 * curl -X POST http://localhost:3000/games -H "Content-Type: application/json" -d '{"title": "Minecraft", "genre": "Sandbox"}'
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Enables JSON payload parsing
app.use(express.json());

/*
app.post('/echo', (req: Request, res: Response) => {
    console.log('Received payload: ', req.body);

    res.json({
        message: 'Received loud and clear',
        myData: req.body
    });
});
*/

// In-memory Mock Database
interface VideoGame {
    id: number;
    title: string;
    genre: string;
}

const games: VideoGame[] = [];

// GET route to retrieve stored resources
app.get('/games', (req: Request, res: Response) => {
    res.json(games);
});

app.post('/games', (req: Request, res: Response) => {
    // Destructures the payload properties
    const { title, genre } = req.body;

    // Validates required fields presence
    if (!title || !genre) {
        // Status 400 = "Bad Request"
        res.status(400).json({
            error: 'Missing data: title and genre are strictly required'
        });
        // Early return prevents further execution
        return; 
    }

    const newGame: VideoGame = {
        id: games.length + 1,
        title,
        genre
    };

    games.push(newGame);
    console.log(`Game successfully saved: ${title}`);

    // Status 201 = "Created" (Standard for successful POST requests)
    res.status(201).json(newGame);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});