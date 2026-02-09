import { tr } from "zod/locales";
import { ClientService } from "../../services/ClientService.js";
import { Request, Response } from "express";

export class ClientController {
    constructor(private clientService: ClientService) {};

    /**
     * @openapi
     * /clients:
     * post:
     * summary: Register a new corporate client
     * tags: [Clients]
     * requestBody:
     * required: true
     * content:
     * application/json:
     * schema:
     * type: object
     * required:
     * - name
     * - company
     * - email
     * properties:
     * name:
     * type: string
     * example: "Mauro"
     * company:
     * type: string
     * example: "Mauro Devs Inc."
     * email:
     * type: string
     * format: email
     * example: "contact@mauro.com"
     * responses:
     * 201:
     * description: Client created successfully
     * 400:
     * description: Validation error or duplicate client
     */

    public create = async (req: Request, res: Response) => {
        try {
            const {id, company, email} = req.body();
            // Here we use the register method
            const newClient = await this.clientService.register(id, company, email);
            res.status(200).json(newClient)
        } catch (error: any) {
            // catch the error thrown by the service if email aready exist
            res.status(400).json({ error: error.message });
        };
    };

    /**
     * @openapi
     * /clients:
     * get:
     * summary: Get full client list
     * tags: [Clients]
     * responses:
     * 200:
     * description: List of clients
     * content:
     * application/json:
     * schema:
     * type: array
     * items:
     * type: object
     * properties:
     * id:
     * type: string
     * company:
     * type: string
     */
    
    public getAll = async (req: Request, res: Response) => {
        const clients = await this.clientService.getAll();
        res.status(200).json(clients);
    };
};
