import { AuthMiddleware } from "./AuthMiddleware.js";
import { UsersData } from "./UsersData.js";
// Reutilizamos la clase UserManager del módulo anterior (22) para registrar y hacer el login
import { UserManager } from "./UserManager.js";

async function main() {
    console.log('--- INICIANDO SISTEMA DE PROTECCIÓN ---');

    try {
        console.log('Creando un usuario Admin...');
        await UserManager.register({
            username: 'Admin',
            email: 'adminServer@code.com',
            password: 'root1234'
        })
    } catch (e) { };  // Ignoramos por si ya existe

    // Login para obtener el token
    const session = await UserManager.login({
        email: 'adminServer@code.com',
        password: 'root1234'
    })
    const token = session.token
    console.log('Token obtenido exitosamente\n')

    // Intento de login fallido
    console.log('Intentando login con datos incorrectos...')

    const intento1 = AuthMiddleware.verifyToken('Admin_Token_2026');
    // console.log(intento1);

    if (!intento1.success) {
        console.log('acceso denegado. El token es incorrecto')
        console.log("Razón:", intento1.error, '\n');
    }

    // Intentando login con token correcto
    console.log('Intentando login con datos correctos...')
    const intento2 = AuthMiddleware.verifyToken(token);
    // console.log(intento2);

    if (!intento2.success) {
        console.log('acceso denegado. El token es incorrecto')
        console.log("Razón:", intento2.error, '\n');
    } else {
        console.log('Login exitoso.');
        console.log('Intentando acceder a la base de datos de usuarios...');
        const users = UsersData.getUsersData();
        console.log('Lista de usuarios: ', users);

    }

}

await main()
