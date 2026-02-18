import bcrypt from 'bcrypt';
import { UserManager } from './UserManager.js';

async function testPasswordSecurity() {
    // Creo una constante con la contraseña original
    const passwordOriginal = 'mauro123'
    console.log('Contraseña original:', passwordOriginal)

    // --- REGISTRO (crear un hash) ---
    // '10' es el costo de procesamiento (mientras más alto, más seguro pero es más lento)
    const hash = await bcrypt.hash(passwordOriginal, 10)   // al llamar un metodo de bcrypt hay que usar await
    console.log('\nContraseña Hasheada (Lo que se guarda en la BD):')
    console.log(hash)

    // --- LOGIN (comparar) ---
    console.log("\nIntentando iniciar sesión...");

    const intentoCorrecto = 'mauro123';
    console.log('\nLa contraseña ingresada es:', intentoCorrecto)

    const isValid = await bcrypt.compare(intentoCorrecto, hash);
    if (isValid === true) {
        console.log('La contraseña ingresada es correcta. \nBienvenido...')
    } else {
        console.error('¡La contraseña ingresada es incorrecta! Intentalo nuevamente.')
    }

    const intentoIncorrecto = 'mauro124';
    console.log('\nLa contraseña ingresada es:', intentoIncorrecto)
    const isValid2 = await bcrypt.compare(intentoIncorrecto, hash);
    if (isValid2 === true) {
        console.log('La contraseña ingresada es correcta. \nBienvenido...')
    } else {
        console.error('¡La contraseña ingresada es incorrecta! Intentalo nuevamente.')
    }



}

testPasswordSecurity()