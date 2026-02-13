// npx prisma generate
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from '../../core/interfaces/IUserRepository.js';
import { User } from '../../core/entities/User.js';

// Initialize prisma (our database client)
// It automatically looks for the DATABASE_URL variable in the system/env
const prisma = new PrismaClient();

// Implement the save method
export class PrismaUserRepo implements IUserRepository {
    async save(user: User): Promise<User> {
        const addUser = prisma.user.create({
            data: {
                name: user.name,
                email: user.email
                // The id is not sent because it is autoincrement
            }
        });

        // Mapping: Convert the prisma result (JSON) in our entitie (Class)
        return new User((await addUser).name, (await addUser).email, (await addUser).id)
    };

    // Implement the findAll method
    async findAll(): Promise<User[]> {
        const users = prisma.user.findMany();

        return (await users).map(u => new User(u.name, u.email, u.id));
    };
};