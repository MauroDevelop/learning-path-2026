import { Request, Response, NextFunction } from "express";
// imporamos la clase del archivo AppError
import { AppError } from "../errors/AppError.js";
import { ZodError } from 'zod';

export const errorHandler = (
    err: Error, 
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error('Error: ', err);

    // Si es un error operativo conocido (AppError)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message 
        })
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos inválidos',
            errors: err.issues   // propiedad contiene el array "crudo" con toda la información técnica
        })
    }

    // Si es un error desconocido (Bug o error 500)
    // No le damos detalles técnicos al usuario por seguridad
    return res.status(500).json({
        status: 'error',
        message: 'Algo salió mal en el servidor, intente más tarde.'
    });

}