import { User, Role } from "../../core/entities/User";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { prisma } from "../database/prisma";
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserRepository implements IUserRepository {

    private mapToDomain(prismaUser: PrismaUser): User {
        return new User(
            {
            id: prismaUser.id,
            email: prismaUser.email,
            password: prismaUser.password,
            name: prismaUser.name,
            role: prismaUser.role as Role,
            isActive: prismaUser.isActive,
            phone: prismaUser.phone
            }
        );
    }

    public async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!prismaUser) return null;

        return this.mapToDomain(prismaUser);

    }

    public async findById(id: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!prismaUser) return null;

        return this.mapToDomain(prismaUser);
    }

    public async save(user: User): Promise<User> {
        const savedUser = await prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: user.password,
                role: user.role,
                phone: user.phone ?? null, // if phone to user.phone is undefined send a null to the database
            },
        });

        // Map the Prisma result to our pure Domain Entity.
        // This ensures the Service layer is decoupled from and unaware of Prisma.
        return this.mapToDomain(savedUser);

    }
}