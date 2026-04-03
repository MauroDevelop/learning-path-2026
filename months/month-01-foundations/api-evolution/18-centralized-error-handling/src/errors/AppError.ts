// Creates and exports the AppError class, extending the native Error class
export class AppError extends Error {
    // Defines two public read-only properties (not methods)
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    
    // true (Operational): Expected errors we can foresee and handle 
    // (e.g., "User not found", "Invalid password", "Missing data")
    // false (Programming): Unexpected bugs or system failures 
    // (e.g., "undefined is not a function", DB connection loss)

    constructor(message: string, statusCode: number) {
        // Invokes the parent constructor (Error) and passes the message parameter
        super(message);  

        this.statusCode = statusCode;
        
        // Instances of this class are considered controlled operational errors by default
        this.isOperational = true;

        // Captures the stack trace, excluding the constructor call from it
        Error.captureStackTrace(this, this.constructor);
    }
}