import { Todo } from "../entities/Todo.js";

export interface ITodoRepository {
    // Defining a contract: any repository must have a save method
    // Take a task (Todo) and return a void promise or the saved task
    save(todo: Todo): Promise<void>;
}