import { UserService } from "../../services/UserService.js";
import { Request, Response } from 'express'


export class UserController {
    // Inject service
    constructor(private userService: UserService) { };

    register = async (req: Request, res: Response) => {
        try {
            // Extract data from the request body
            const { name, email } = req.body;
            // Call the service
            const user = await this.userService.registerUser(name, email);

            return res.status(201).json(user);

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    getAll = async (req: Request, res: Response) => {
        const users = await this.userService.listUsers();
        return res.json(users);
    }
};