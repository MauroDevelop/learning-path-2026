import { User, Role } from "../../core/entities/User";
import { IUserRepository } from "../../core/interfaces/IUserRepository";
import { prisma } from "../database/prisma";

export class PrismaUserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({
            where: { email }
        });

        if (!prismaUser) return null;

        return new User(
            prismaUser.id,
            prismaUser.email,
            prismaUser.name,
            prismaUser.password,
            prismaUser.role as Role,
            prismaUser.isActive,
            prismaUser.phone
        );
    }

    async findById(id: string): Promise<User | null> {
        const prismaUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!prismaUser) return null;

        return new User(
            prismaUser.id,
            prismaUser.email,
            prismaUser.name,
            prismaUser.password,
            prismaUser.role as Role,
            prismaUser.isActive,
            prismaUser.phone
        );
    }

    async save(user: User): Promise<User> {
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
        return new User(
            savedUser.id,
            savedUser.email,
            savedUser.name,
            savedUser.password,
            savedUser.role as Role,
            savedUser.isActive,
            savedUser.phone
        );

    }
}