"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Numeros grandes y Tipos
let bloquesColocados = 24000000;
let biomaFavorito = "Deep Dark";
let tieneNetherite = true;
// Funcion con tipo any
function inspeccionarItem(item) {
    return item;
}
// Arreglos (Arrays)
let herramientas = ['pico', 'pala', 'espada'];
let nivelesEncantamiento = [20, 12, 5];
let inventarioLleno = [true, false, true];
// Segunda forma (genericos)
let cordenadas = [100, 64, -250];
// Tuplas (Tuples)
// Representando a un jugador con ID, Nombre y Rango
let jugador = [30, "mauro_develop", "Premium"];
// Enums 
// Usamos const para que sea súper ligero en el backend
var Rango;
(function (Rango) {
    Rango[Rango["Usuario"] = 1] = "Usuario";
    Rango[Rango["Vip"] = 2] = "Vip";
    Rango[Rango["Moderador"] = 5] = "Moderador";
    Rango[Rango["Admin"] = 10] = "Admin";
})(Rango || (Rango = {}));
let miRango = Rango.Admin;
if (miRango >= Rango.Moderador) {
    console.log("Tienes permisos para banear jugadores.");
}
// Creamos el objeto siguiendo esa estructura
const proximoJugador = {
    id: 1,
    nombre: "Maro-CM",
    coordenadas: {
        x: 150,
        y: 64,
        z: -200
    }
};
//# sourceMappingURL=index.js.map