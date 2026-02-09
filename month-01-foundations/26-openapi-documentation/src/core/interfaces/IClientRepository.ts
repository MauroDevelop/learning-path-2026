import { Client } from "../entities/Client.js";

export interface IClientRepository {
    save(client: Client): Promise<void>;
    findAll(): Promise<Client[]>;
}