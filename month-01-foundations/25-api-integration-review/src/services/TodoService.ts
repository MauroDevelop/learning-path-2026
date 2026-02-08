import { ITodoRepository } from "../core/interface/ITodoRepository.js";
import { Todo } from "../core/entities/Todo.js";
import { randomUUID } from "node:crypto";

export class TodoService {
    // DEPENDENCY INJECTION
    // We require something that implements the interface
    // We don't care if it's in-memory or SQL, as long as it has the sava method
    constructor(private TodoRepo: ITodoRepository) { }

    async createTodo(title: string, userId: string): Promise<Todo> {
        // Validation (logic)
        if (!title || title.length < 3) throw new Error('El título es muy corto')

        // Create entitie
        const newTodo = new Todo(
            randomUUID(),
            title,
            false,
            userId
        )

        // Persistence (called repository)
        await this.TodoRepo.save(newTodo);

        return newTodo;
    }


}