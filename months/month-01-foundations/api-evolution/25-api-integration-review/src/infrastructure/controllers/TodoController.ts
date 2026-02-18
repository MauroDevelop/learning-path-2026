import { Request, Response } from "express";
import { TodoService } from "../../services/TodoService.js";
import { tr } from "zod/locales";

export class TodoController {
    // The controller requires access to the entire service to function
    constructor(private todoService: TodoService) {}
    // We used a Arrow Fuction 
    create = async (res: Response, req: Request) => {
        try {
            // Extract data from the request body (HTTP)
            const {title, userId} = req.body;

            // Call the service (logic)
            const createdTodo = await this.todoService.createTodo(title, userId);

            // Respond to the client (HTTP 201 Created)
            res.status(201).json({
                message: 'Tarea creada correctamente',
                data: createdTodo
            });

        } catch (error: any) {
            // Catch and handle errors
            if (error instanceof Error) {
                res.status(400).json({error: error.message})
            } else {
                res.status(500).json({ error: 'Ocurrió un error desconocido'});
            };
        };
    };
};