/*
Módulo 11: Gestión de Configuración con dotenv
En este módulo he realizado:
- La instalación de la librería de dotenv.
- Creación de un archivo .env para guardar datos "sensibles" o configuración.
- Uso de process.env para traer variables al código.
- Asegurar el agregado del archivo .env a mi .gitignore para no subir información privada a GitHub.
*/

import dotenv from 'dotenv';

// Carga las variables del archivo .env en process.env
dotenv.config();

const port = process.env.PORT || 3000;
const dbPath = process.env.DB_PATH;
const modo = process.env.APP_ENV;

if (modo === 'development'){
    console.info('Te encuentras en modo de desarrollo');
} else {
    console.info('El servidor esta corriendo en producción');
}

console.log(`Servidor configurado en el puerto: ${port}`);
console.log(`Ruta de base de datos: ${dbPath}`);