import { Request, Response } from "express";
import { AuthorService } from "../../services/AuthorService.js";

export class AuthorController {
    // Dependency Injection:
    // The controller requires the Service to function
    constructor(private authorService: AuthorService) {}

    // Method for GET /authors
    async getAllAuthors(req: Request, res: Response) {
        try {
            const authors = await this.authorService.findAll();
            res.json(authors);
        } catch (error: any) {
            res.status(500).json({ error: "Internal server error" });
        }
    }

    // Method for POST /authors
    async createAuthor(req: Request, res: Response) {
        try {
            // Extract data from the Request Body (JSON)
            const { name, bio, bookTitles } = req.body;

            // Call the Service (Actual business logic)
            const newAuthor = await this.authorService.create(name, bio, bookTitles);

            // Respond with success (201 Created)
            res.status(201).json(newAuthor);

        } catch (error: any) {
            // If the service throws an error (e.g., "Missing books"), we catch it here
            // and return a "400 Bad Request" to the user
            res.status(400).json({ error: error.message });
        }
    }
}