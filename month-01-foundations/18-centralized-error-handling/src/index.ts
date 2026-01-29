/*
MÓDULO 18: MANEJO CENTRALIZADO DE ERRORES
--------------------------------------------------
Objetivo: Interceptar fallos usando un Middleware.

🔗 LINKS DE PRUEBA (Click o Copiar en navegador):

1. ÉXITO (Usuario existente - 200 OK):
   http://localhost:3000/users/1

2. ERROR OPERATIVO (Usuario no existe - 404 Not Found):
   (Este error es lanzado manualmente con nuestra clase AppError)
   http://localhost:3000/users/99

3. BUG INESPERADO (Variable no definida - 500 Internal Server Error):
   (Simula un fallo de código real que el middleware captura para que el server no caiga)
   http://localhost:3000/panico

4. HOME:
   http://localhost:3000/
--------------------------------------------------
*/


import express, { Request, Response, NextFunction } from 'express';
// Importar middleware y clase personalizada
import { errorHandler } from './middlewares/errorHandler.js';
import { AppError } from './errors/AppError.js';

const app = express();
app.use(express.json());

// --- Simulamos una Base de Datos ---
const users = [
    { id: 1, name: "Mauro", role: "admin" },
    { id: 2, name: "Invitado", role: "guest" }
];

// Error Operativo (Controlado)
// Intenta buscar un usuario que no existe (ej: ID 99)
app.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string);
        const user = users.find(u => u.id === id);

        if (!user) {
            // En lugar de responder directo, lanzamos el error al "next"
            throw new AppError(`El usuario con ID ${id} no existe`, 404);
        }

        res.json(user);
    } catch (error) {
        // Pasamos el error al middleware errorHandler
        next(error);
    }
});

// Error de Programación (Bug inesperado)
// Esta ruta tiene un error de código a propósito para ver si el servidor aguanta
app.get('/panico', (req: Request, res: Response, next: NextFunction) => {
    try {
        // ignorar y compilar el código de todas formas con
        // @ts-ignore
        console.log(variableQueNoExiste); // Esto provocará un error de JS nativo
    } catch (error) {
        next(error);
    }
});

// Éxito
app.get('/', (req, res) => {
    res.send("El servidor funciona correctamente!");
});

// --- REGISTRO DEL MIDDLEWARE DE ERRORES ---
// Esto debe ir simpre al final de todas las rutas, 
// justo antes del app.listen
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor del modulo 18 listo en http://localhost:${PORT}`);
});