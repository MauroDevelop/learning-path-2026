import { describe, test, expect } from '@jest/globals';
import { TodoService } from "./TodoService.js";
import { InMemoryTodoRepo } from "../infrastructure/repositories/InMemoryTodoRepo.js";

describe('TodoService', () => {

    test('Debería crear una tarea nueva correctamente', async () => {
        // 1. ARRANGE
        // Set up the test 
        const repo = new InMemoryTodoRepo();

        // Create the service and inject the repository
        const servicio = new TodoService(repo);

        // 2. Execute the action (Act)
        // Call the service
        const nuevaTarea = await servicio.createTodo("Estudiar Testing", "mauro-1");

        // 3. ASSERT
        expect(nuevaTarea.title).toBe("Estudiar Testing");
        expect(nuevaTarea.id).toBeDefined(); // Que tenga un ID
    });

    test('Debería fallar si el título es muy corto', async () => {
        // 1. ARRANGE
        // Re-create the instance to ensure the test starts with a clean state
        const repo = new InMemoryTodoRepo();
        const servicio = new TodoService(repo);

        // 2. Act and Assert
        // Expecting it to throw an error when providing a short title
        await expect(
            servicio.createTodo("A", "mauro-1")
        ).rejects.toThrow("El título es muy corto");
    });

});