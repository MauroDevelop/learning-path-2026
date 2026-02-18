import express from "express";
import { InMemoryTodoRepo } from "./infrastructure/repositories/InMemoryTodoRepo.js";
import { TodoController } from "./infrastructure/controllers/TodoController.js";
import { TodoService } from "./services/TodoService.js";

const app = express();
app.use(express.json()); // Middleware to parce JSON bodies

// --- Dependency Composition (Wring) ---

// Create repository. 'todoReposirory' is an object 
// ready to save data in an array simulating the database
const todoRepository = new InMemoryTodoRepo();

// We create the service and inject the repository we created in 'todoRepository'
const todoService = new TodoService(todoRepository);

// We instantiate the Controller and inject the service
const todoController = new TodoController(todoService);
// Now the 'todoController' has access to the 'todoService',
// which is turn has access to the 'TodoRepositoy'

// We a POST request is received at '/todos', we execute the 'create'
// method of the controller instance
app.post('/todos', todoController.create);


// Server startup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log("Arquitectura de Capas lista para recibir peticiones.");
})


