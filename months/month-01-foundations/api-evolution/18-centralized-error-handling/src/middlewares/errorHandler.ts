import { Request, Response, NextFunction } from "express";
// Import custom operational error class
import { AppError } from "../errors/AppError.js";
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error, 
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error log:', err);

    // Handle known operational errors defined by our custom AppError class
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message 
        });
    }

    // Intercept Zod validation errors and format them for the client
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid data format provided',
            // The 'issues' property contains the raw array with detailed technical validation data
            errors: err.issues  
        });
    }

    // Fallback for unexpected bugs or system crashes
    // Do not leak technical details to the client for security reasons
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error, please try again later'
    });
};