/*
path: Para manipular nombres de carpetas y archivos sin errores de sistema.

fs: Para operar (leer, escribir, borrar) archivos reales en el disco.

url: Para traducir entre el formato de internet (URL) y el formato del
disco (Path), algo esencial en proyectos modernos de TypeScript.
*/

import path from 'path';

const carpeta = 'usuarios';
const subcarpeta = 'Mauro';
const archivo = "preferencias.json";

const finalPath = path.join(carpeta, subcarpeta, archivo);

console.log(`Ruta consturida ${finalPath}`);

// --- FileSystem Promises ---

import fs from 'fs/promises';

async function managementFiles() {
    try {
        await fs.writeFile('nota.txt', 'Hola, estoy aprendiendo los modulos nativos.');
        console.log('Archivo escrito con exito...');

        const content = await fs.readFile('nota.txt', 'utf-8')
        console.log('El contenido del archivo es:', content);
    } catch (error) {
        console.error('ups... ha habido un error:', error);
    };

};

managementFiles();

// --- url ---
import { fileURLToPath } from 'url';
// import path from 'path';

// 'import.meta.url' es la ubicación actual de este archivo en formato URL
const currrentURL = import.meta.url;
console.log('Ruta normal: ', currrentURL);

// Convertimos esa URL a una ruta de archivo normal
const myFisicPath = fileURLToPath(currrentURL);
console.log( 'Ruta fisica: ', myFisicPath);

// const rutaFisica = fileURLToPath(import.meta.url);

// Uso de path para la extension
const extension = path.extname(myFisicPath);
console.log('La extensión de mi archivo es', extension);