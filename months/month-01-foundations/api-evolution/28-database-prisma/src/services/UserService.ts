
import { IUserRepository } from "../core/interfaces/IUserRepository.js";
import { User } from "../core/entities/User.js";

export class UserService {

    constructor(private iUserRepository: IUserRepository) {}

    async registerUser(name: string, email: string){
        // Validations
        if (!email.includes('@')) {
            throw new Error('The email is invalid');
        };
        
        // Created a new entitie
        const newUser = new User(name, email);

        // Save
        return await this.iUserRepository.save(newUser);
    };

    async listUsers() {
        return await this.iUserRepository.findAll();
    };
};