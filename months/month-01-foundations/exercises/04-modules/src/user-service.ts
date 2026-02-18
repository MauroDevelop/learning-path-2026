/**
 * EJERCICIO PARTE 2: LÓGICA DEL SERVICIO
 * 1. Importa la interfaz 'User' desde './types'.
 * 2. Crea y exporta una variable 'users' que sea un array de 'User' con al menos 2 ejemplos.
 * 3. Crea y exporta una función 'getUserByEmail' que reciba un email (string).
 * - Debe buscar en el array y devolver el usuario encontrado o 'undefined'.
 * 4. Crea y exporta una función 'deleteUser' que reciba un id (number) y muestre un 
 * mensaje en consola: "Usuario con ID [id] eliminado".
 */
 
import {User} from './types.js';
export const users: User[] = [
    {id: 0, name: 'Mauro', email: 'maurodevelop.git@gmail.com', role: 'admin',},
    {id: 3, name: 'Rodrigo', email: 'rodrigo.rivero.dev@gmail.com', role: 'user',},
] 

export function getUserByEmail(email: string): undefined | User {
    return users.find((user) =>  email === user.email)
};

export function deleteUser(id: number): void{
    return console.log(`Usuario con ID ${id} eliminado`)
}
