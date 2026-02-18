import express from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaAuthorRepository } from "./infrastructure/repositories/PrismaAuthorRepository.js";
import { AuthorService } from "./services/AuthorService.js";
import { AuthorController } from "./infrastructure/controllers/AuthorController.js";

const app = express();
app.use(express.json());

// 1. INITIALIZE LAYERS (From the inside out)
const prisma = new PrismaClient(); // Data Layer (Driver)
const authorRepo = new PrismaAuthorRepository(prisma); // Infrastructure Layer
const authorService = new AuthorService(authorRepo); // Application Layer
const authorController = new AuthorController(authorService); // Presentation Layer

// 2. DEFINE ROUTES
// Note: We use an arrow function to preserve the 'this' context
app.get("/authors", (req, res) => authorController.getAllAuthors(req, res));
app.post("/authors", (req, res) => authorController.createAuthor(req, res));

// 3. START SERVER
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Library Server ready at http://localhost:${PORT}`);
});