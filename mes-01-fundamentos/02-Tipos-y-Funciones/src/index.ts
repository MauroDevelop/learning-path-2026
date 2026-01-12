// Numeros grandes y Tipos
let bloquesColocados = 24_000_000; 
let biomaFavorito = "Deep Dark";
let tieneNetherite = true;

// Funcion con tipo any
function inspeccionarItem (item: any) {
    return item;
}

// Arreglos (Arrays)
let herramientas: string[] = ['pico', 'pala', 'espada'];
let nivelesEncantamiento: number[] = [20, 12, 5];
let inventarioLleno: boolean[] = [true, false, true];

// Segunda forma (genericos)
let cordenadas: Array<number> = [100, 64, -250];

// Tuplas (Tuples)
// Representando a un jugador con ID, Nombre y Rango
let jugador: [number, string, string] = [ 30, "mauro_develop", "Premium" ];

// Enums 
// Usamos const para que sea súper ligero en el backend
const enum Rango {
    Usuario = 1,
    Vip = 2,
    Moderador = 5,
    Admin = 10
}

let miRango: Rango = Rango.Admin;

if (miRango >= Rango.Moderador) {
    console.log("Tienes permisos para banear jugadores.");
}

// Objetos
// Definimos la estructura (molde)
type Jugador = {
    readonly id: number, // 'readonly' para que no se pueda cambiar el ID despues
    nombre: string,
    // Este es el "atributo con atributos" (Objeto anidado)
    coordenadas: {
        x: number,
        y: number,
        z: number
    }
}

// Creamos el objeto siguiendo esa estructura
const proximoJugador: Jugador = {
    id: 1,
    nombre: "Maro-CM",
    coordenadas: {
        x: 150,
        y: 64,
        z: -200
    }
}