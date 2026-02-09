import { v4 as uuidv4 } from "uuid";
import { Client } from "../core/entities/Client.js";
import { IClientRepository } from "../core/interfaces/IClientRepository.js"

export class ClientService {
    // Dependency injection
    constructor(private clientRepository: IClientRepository) {};

    async register(name: string, company: string, email: string): Promise<void> {
        // Validate duplicates
        const allClients = this.clientRepository.findAll();
        const exists = (await allClients).find(c => c.email === email);

        if (exists) throw new Error(`The client with email ${email} is already in the memory`);

        // Generate a unique ID
        const id = uuidv4()

        // Create the entity instance 
        const newClient = new Client(id, name, company, email);

        // Save using the repository
        this.clientRepository.save(newClient);

        console.log('Client saved successfully:', newClient);
    };

    async getAll(): Promise<Client[]> {
        return this.clientRepository.findAll()
    }
}