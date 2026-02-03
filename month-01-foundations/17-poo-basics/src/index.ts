
class Vehiculo {
    // (Propiedad: una variable que vive dentro de la clase)
    public ruedas: number;

    constructor(ruedas: number) {
        this.ruedas = ruedas;
        console.log(`Construyendo un vehículo básico de ${ruedas} ruedas...`);
    }

    arrancar() {
        console.log('El vehiculo ha arracado')
    }
}

class Auto extends Vehiculo {
    marca: string;
    color: string;

    constructor(marcaRecibida: string, colorRecibido: string){
        // SUPER: llamamos al constructor padre
        super(4)
        this.marca = marcaRecibida;
        this.color = colorRecibido;

        console.log('He fabricado un auto')
    }

    // El Auto puede tener sus propios métodos
    tocarBocina() {
        console.log("Se ha tocado la bocina");
    }
}

const miAuto = new Auto('Toyota', 'verde');
console.log(miAuto)


// Podemos usar métodos del padre y del hijo
miAuto.arrancar();    // Heredado de Vehiculo
miAuto.tocarBocina(); // Propio de Auto