/**
 * EXERCISE PART 2: SERVICE LOGIC
 * 1. Import the 'User' interface from './types'
 * 2. Create and export a 'users' array of 'User' type with at least 2 examples
 * 3. Create and export a 'getUserByEmail' function that receives an email (string)
 * - It must search the array and return the matched user or 'undefined'
 * 4. Create and export a 'deleteUser' function that receives an id (number) and outputs
 * a console message: "User with ID [id] deleted"
 */

import { User } from './types.js';

export const users: User[] = [
    { id: 0, name: 'Mauro', email: 'maurodevelop.git@gmail.com', role: 'admin' },
    { id: 3, name: 'Rodrigo', email: 'rodrigo.rivero.dev@gmail.com', role: 'user' }
];

export function getUserByEmail(email: string): User | undefined {
    return users.find((user) => email === user.email);
}

export function deleteUser(id: number): void {
    console.log(`User with ID ${id} deleted`);
}