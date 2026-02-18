
// Creo y exporto la clase AppError y la convierto en hija de la clase Error
export class AppError extends Error {
    // Creo dos metodos publicos de solo lectura
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    // true (Operacional): Son errores que esperamos que pasen 
    // (ej: "Usuario no encontrado", "Contraseña incorrecta", "Faltan datos").
    // false (Programación): Son bugs que NO esperábamos 
    // (ej: undefined is not a function, fallo de conexión a DB).

    constructor(message: string, statusCode: number) {
        // Llama al constructor del padre (Error)
        // Le pasamos el mensaje para que lo guarde
        super(message);  

        this.statusCode = statusCode;

        // Asumimos que si usamos esta clase, es un error controlado (true)
        this.isOperational = true;
    }
} 