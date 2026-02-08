import { ITodoRepository } from "../../core/interface/ITodoRepository.js";
import { Todo } from "../../core/entities/Todo.js";

// This class implemented the interface. 
export class InMemoryTodoRepo implements ITodoRepository {
    // We are moking a database using a private array
    private todos: Todo[] = [];

    async save(todo: Todo): Promise<void> {
       // Database code goes here
        this.todos.push(todo);
        console.log('LOG (repo): Tarea guardada en memoria:', todo);
    };
}