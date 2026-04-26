// 'extends Error': Our AppError class inherits all behaviors and properties from the Error class
export class AppError extends Error {
    // Here we store the HTTP status code (e.g., 404, 400, 401)
    public readonly statusCode: number;

    // Receives the error message and the HTTP status code
    constructor(message: string, statusCode: number = 400) {
        // Call the parent class (Error) constructor and pass the message
        super(message);

        // Assign the HTTP status code
        this.statusCode = statusCode

        // This creates the "Stack Trace" (the list of files and code lines where the error occurred).
        // By passing "this.constructor", we ignore this class in the stack trace
        // to show exactly where the error was originally thrown
        Error.captureStackTrace(this, this.constructor)
    }
}