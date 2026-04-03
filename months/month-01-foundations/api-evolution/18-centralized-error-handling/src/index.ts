/**
 * MODULE 18: CENTRALIZED ERROR HANDLING
 * --------------------------------------------------
 * Objective: Intercept failures using an Error-Handling Middleware
 *
 * 🔗 TESTING LINKS (Click or Copy in browser):
 *
 * 1. SUCCESS (Existing user - 200 OK):
 * http://localhost:3000/users/1
 *
 * 2. OPERATIONAL ERROR (User not found - 404 Not Found):
 * (This error is manually thrown using our AppError class)
 * http://localhost:3000/users/99
 *
 * 3. UNEXPECTED BUG (Undefined variable - 500 Internal Server Error):
 * (Simulates a real code crash that the middleware catches to prevent server downtime)
 * http://localhost:3000/panic
 *
 * 4. HOME:
 * http://localhost:3000/
 * --------------------------------------------------
 */

import express, { Request, Response, NextFunction } from 'express';
// Import custom error class and middleware
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './errors/AppError.js';

const app = express();
app.use(express.json());

// --- Mock Database Simulation ---
const users = [
    { id: 1, name: "Mauro", role: "admin" },
    { id: 2, name: "Guest", role: "guest" }
];

// Operational Error (Controlled)
// Attempts to retrieve a non-existent user (e.g., ID 99)
app.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const idParam = req.params.id;

        // Type Guard: We strictly verify that the parameter exists and is a string
        if (!idParam || typeof idParam !== 'string') {
            // SENIOR TWEAK: Instead of res.status(400), we throw the AppError
            throw new AppError('Invalid ID format provided', 400);
        }

        // Safe parsing with radix 10
        const id = parseInt(idParam, 10);
        
        // Defensive programming against NaN inputs
        if (isNaN(id)) {
            throw new AppError('Invalid ID format provided', 400);
        }

        const user = users.find(u => u.id === id);

        if (!user) {
            // Instead of a direct response, we throw the error to the 'catch' block
            throw new AppError(`User with ID ${id} does not exist`, 404);
        }

        res.json(user);
    } catch (error) {
        // Passes the error to the errorHandler middleware
        next(error);
    }
});

// Programming Error (Unexpected Bug)
// This route contains intentional faulty code to test server resilience
app.get('/panic', (req: Request, res: Response, next: NextFunction) => {
    try {
        // @ts-expect-error - Deliberately referencing an undeclared variable to force a crash
        console.log(undeclaredVariable); 
    } catch (error) {
        next(error);
    }
});

// Success route
app.get('/', (req: Request, res: Response) => {
    res.send("Server is running correctly");
});

// --- ERROR MIDDLEWARE REGISTRATION ---
// This must always be placed at the very end of the route stack, 
// right before app.listen
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Module 18 server running on http://localhost:${PORT}`);
});