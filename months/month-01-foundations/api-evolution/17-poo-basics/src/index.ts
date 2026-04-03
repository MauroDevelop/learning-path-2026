class Vehicle {
    // Property: a variable that lives inside the class
    public wheels: number;

    constructor(wheels: number) {
        this.wheels = wheels;
        console.log(`Building a basic ${wheels}-wheel vehicle...`);
    }

    startEngine(): void {
        console.log('The vehicle has started');
    }
}

class Car extends Vehicle {
    brand: string;
    color: string;

    constructor(brand: string, color: string) {
        // SUPER: Invokes the parent constructor
        super(4);
        this.brand = brand;
        this.color = color;

        console.log('A car has been manufactured');
    }

    // The Car class can have its own specific methods
    honkHorn(): void {
        console.log("The horn has been honked");
    }
}

const myCar = new Car('Toyota', 'green');
console.log(myCar);

// We can invoke methods from both the parent and the child classes
myCar.startEngine(); // Inherited from Vehicle
myCar.honkHorn();    // Specific to Car