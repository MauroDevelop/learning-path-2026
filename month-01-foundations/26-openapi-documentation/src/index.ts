// import our classes
import { InMemoryClientRepo } from "./infrastructure/repositories/InMemoryClientRepo.js";
import { ClientService } from "./services/ClientService.js";
import { ClientController } from "./infrastructure/controllers/TodoController.js";

import express from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// --- Configuration of Swagger ---
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Client Management API (CRM)",
            version: "1.0.0",
            description: "API for managing corporate clients",
        },
        servers: [
            { url: "http://localhost:3000", description: "Development Server" }
        ],
    },
    apis: ["./src/infrastructure/controllers/*.ts"], 
};

const app = express();
app.use(express.json());

// Dependency injection
const inMemory = new InMemoryClientRepo();
const clientService = new ClientService(inMemory);
const clientController = new ClientController(clientService);

// Define routes
app.post('/clients', clientController.create);
app.get('/client', clientController.getAll);

// Documentation and server
const swaggerSpecs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server CRM ready on http://localhost:${PORT}`);
    console.log(`Documentation on http://localhost:${PORT}/api-docs`);
});