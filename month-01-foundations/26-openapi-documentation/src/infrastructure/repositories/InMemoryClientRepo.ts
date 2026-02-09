import { Client } from "../../core/entities/Client.js";
import { IClientRepository } from "../../core/interfaces/IClientRepository.js";

export class InMemoryClientRepo implements IClientRepository {
    private clients: Client[] = [];

    async save(client: Client): Promise<void> {
        this.clients.push(client);
        console.log('[DB] The client has been saved:', client);
    };

    async findAll(): Promise<Client[]> {
        return this.clients;
    };
};