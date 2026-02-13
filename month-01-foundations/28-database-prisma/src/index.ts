import { PrismaUserRepo } from "./infrastructure/repositories/PrismaUserRepo.js";
import { UserService } from "./services/UserService.js";
import { UserController } from "./infrastructure/controllers/UserController.js";
import express from "express";

const app = express();

app.use(express.json());

const userRepo = new PrismaUserRepo();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

app.post('/users', userController.register);
app.get('/users', userController.getAll);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server runing in http://localhost:${PORT}`);
    console.log(`Listening for requests...`);
});