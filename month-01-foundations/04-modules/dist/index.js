"use strict";
/**
 * EJERCICIO PARTE 3: EJECUCIÓN PRINCIPAL
 * 1. Importa la función 'getUserByEmail' y la variable 'users' desde './user-service'.
 * 2. Muestra en consola la lista completa de usuarios.
 * 3. Llama a la función para buscar un usuario por su email y muestra el resultado.
 * 4. Prueba importar 'deleteUser' usando un alias (import { deleteUser as remove } ...).
 * 5. Ejecuta la función usando el nuevo nombre 'remove'.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("./user-service");
console.log('--- Lista de Usuarios ---');
console.log(user_service_1.users);
console.log((0, user_service_1.getUserByEmail)('maurodevelop.git@gmail.com'));
console.log((0, user_service_1.deleteUser)(3));
//# sourceMappingURL=index.js.map