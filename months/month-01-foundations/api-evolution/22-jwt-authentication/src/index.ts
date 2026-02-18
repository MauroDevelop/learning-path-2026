import { UserManager } from "./UserManager.js";

async function main() {
    console.log('--- Iniciando sistema de auth ---');
    try {
        // --- REGISTRO DE USUARIO ---
        console.log('Intentando registrar usuario...');

        const registerResult = await UserManager.register({
            username: 'MauroDev',
            email: 'mauro@code.com',
            password: 'MiPasswordSeguro123'
        });

        console.log('Registro exitoso. ID generado:', registerResult.userId);

        // --- LOGIN ---

        // LOGIN EXITOSO (El usuario pone bien sus datos)
        console.log("\nIntentando Login Correcto...");
        const loginExitoso = await UserManager.login({
            email: 'mauro@code.com',
            password: 'MiPasswordSeguro123'
        });

        console.log("¡Bienvenido! Aquí está tu credencial (JWT):");
        // Imprimimos el token
        console.log(loginExitoso.token);

        // LOGIN FALLIDO (El usuario pone mal sus datos)
        console.log('\nIntentando Login Incorrecto...');
        // Esto debería fallar y saltar al bloque 'catch'
        const loginFallido = await UserManager.login({
            email: 'mauro@code.com',
            password: 'Password_Incorrecta_123'
        })

    } catch (error){
        // Aquí capturamos el error del paso 3
        console.error("Error detectado (El sistema bloqueó el acceso):");
        console.error("Mensaje del sistema:", (error as Error).message);
    }
}

main();