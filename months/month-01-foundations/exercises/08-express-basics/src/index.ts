/**
 * Module: Express Basics
 * Description: Local server setup using Express to handle HTTP GET requests
 * Includes a filtering endpoint using query parameters to search by skill
 * Note: API integrations will be added in upcoming modules
 */

import express, { Request, Response } from "express";

// Define the candidate entity blueprint
interface Candidate {
    readonly id: number;
    name: string;
    skills: string[];
    yearsExperience: number;
    isAvailable: boolean;
}

const app = express();
const PORT = 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// Mock database collection
const candidates: Candidate[] = [
    { id: 1, name: "Mauro", skills: ["TypeScript", "Node.js"], yearsExperience: 1, isAvailable: true },
    { id: 2, name: "Carla", skills: ["TypeScript", "React"], yearsExperience: 4, isAvailable: true },
    { id: 3, name: "Sofia", skills: ["TypeScript", "AWS"], yearsExperience: 3, isAvailable: true }
];

// Search endpoint using query parameters
app.get('/search', (req: Request, res: Response) => {
    // Cast query parameter to string to ensure type safety
    const targetSkill = req.query.skill as string;

    if (!targetSkill) {
        return res.status(400).json({
            error: "Missing search parameter",
            usageExample: "http://localhost:3000/search?skill=TypeScript"
        });
    }

    const matchedCandidates = candidates.filter(candidate => {
        return candidate.skills.some(skill => skill.toLowerCase() === targetSkill.toLowerCase());
    });

    res.json({
        matchCount: matchedCandidates.length,
        results: matchedCandidates
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});