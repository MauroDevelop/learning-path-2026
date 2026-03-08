import { CreateModifierInput } from "../../shared/dtos/MenuDTO";
import { Modifier } from "../../generated/prisma";

export interface CreateModifierData extends CreateModifierInput {}

export interface IModifierRepository {
    save(data: CreateModifierData): Promise<Modifier>
    findAll(activeOnly?: boolean): Promise<Modifier[]>
    findById(id: string): Promise<Modifier | null>
    softDelete(id: string): Promise<Modifier>
}