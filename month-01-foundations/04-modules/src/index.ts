/**
 * EJERCICIO PARTE 3: EJECUCIÓN PRINCIPAL
 * 1. Importa la función 'getUserByEmail' y la variable 'users' desde './user-service'.
 * 2. Muestra en consola la lista completa de usuarios.
 * 3. Llama a la función para buscar un usuario por su email y muestra el resultado.
 * 4. Prueba importar 'deleteUser' usando un alias (import { deleteUser as remove } ...).
 * 5. Ejecuta la función usando el nuevo nombre 'remove'.
 */

import { getUserByEmail, users, deleteUser as remove} from "./user-service";

console.log( '--- Lista de Usuarios ---')
console.log(users);

console.log(getUserByEmail('maurodevelop.git@gmail.com'));

console.log(remove(3));
