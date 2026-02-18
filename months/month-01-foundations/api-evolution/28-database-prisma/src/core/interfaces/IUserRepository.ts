import { User } from "../entities/User.js";

export interface IUserRepository {
    save(user: User): Promise<User>;
    findAll(): Promise<User[]>;
}