import { UserManager } from './UserManager.js'; // uso de .js

async function main() {
    try {
        console.log("--- Intento de Registro Seguro ---");

        const usuarioRegistrado = await UserManager.register({
            username: "MauroDev",
            email: "maurodevelop.git@gmail.com",
            password: "superSecreto123", // Contraseña plana
            age: 26
        });

        console.log("Resultado del sistema:");
        console.log(usuarioRegistrado);

    } catch (error) {
        console.error("Hubo un error en el registro:");
        // Casteamos el error para leer el mensaje
        console.error((error as Error).message);
    }
}

main();

// Castear = Forzar o afirmar manualmente que una variable es de un tipo específico
// (en este caso, decirle que es un Error para poder leer su mensaje).