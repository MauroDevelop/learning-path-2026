/**
 * EJERCICIO PARTE 2: LÓGICA DEL SERVICIO
 * 1. Importa la interfaz 'User' desde './types'.
 * 2. Crea y exporta una variable 'users' que sea un array de 'User' con al menos 2 ejemplos.
 * 3. Crea y exporta una función 'getUserByEmail' que reciba un email (string).
 * - Debe buscar en el array y devolver el usuario encontrado o 'undefined'.
 * 4. Crea y exporta una función 'deleteUser' que reciba un id (number) y muestre un
 * mensaje en consola: "Usuario con ID [id] eliminado".
 */
import { User } from './types';
export declare const users: User[];
export declare function getUserByEmail(email: string): undefined | User;
export declare function deleteUser(id: number): void;
//# sourceMappingURL=user-service.d.ts.map