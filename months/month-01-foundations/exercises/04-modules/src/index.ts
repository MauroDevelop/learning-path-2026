/**
 * EXERCISE PART 3: MAIN EXECUTION
 * 1. Import the 'getUserByEmail' function and the 'users' collection from './user-service'.
 * 2. Log the complete user list to the console.
 * 3. Invoke the function to retrieve a user by their email and output the result.
 * 4. Test importing 'deleteUser' using an alias (import { deleteUser as remove } ...).
 * 5. Execute the function using the new alias 'remove'.
 */

import { getUserByEmail, users, deleteUser as remove } from "./user-service.js";

console.log('--- User List ---');
console.log(users);

console.log(getUserByEmail('maurodevelop.git@gmail.com'));

remove(3);