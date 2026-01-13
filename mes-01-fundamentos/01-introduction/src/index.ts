// Declaramos variables con un tipo especifico
let nombre: string = "Mauro";
let edad: number = 25;
let esEstudiante: boolean = true;
let respuesta: string = ""


// Usamos las variables en un mensaje
console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años.`);

if (esEstudiante) {
    respuesta = "si"
} else {
    respuesta = "no"
}
console.log(`Es estudiante?: ${respuesta}`);
// PRUEBA DE ERROR:
// nombre = 100;