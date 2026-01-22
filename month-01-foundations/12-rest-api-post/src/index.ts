/*
Módulo 12: API REST - Recibiendo datos (POST y Middleware)

En este módulo he aprendido a:
- Configurar Express para recibir datos JSON usando el middleware `express.json()`.
- Utilizar el verbo HTTP POST para enviar información al servidor.
- Acceder al cuerpo de la petición mediante `req.body`.
- Validar datos obligatorios (Validación "El Portero") y manejar errores con status 400.
- Persistir datos en una memoria temporal (array) y responder con status 201 (Created).

Actividades realizadas:
1. Configuración de middleware para lectura de body.
2. Implementación de lógica de validación para campos requeridos.
3. Creación de un endpoint para guardar videojuegos en memoria.

Comando para ejecutar desde Git Bash (Agregar juego):
curl -X POST http://localhost:3000/juegos -H "Content-Type: application/json" -d '{"title": "Minecraft", "genre": "Sandbox"}'
*/

import express, {Request, Response} from 'express';
import dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();

//  SE habilita la lectura de JSON
app.use(express.json());

/*
app.post('/echo', (req: Request, res: Response) => {
    console.log('Cuerpo recibido: ', req.body);

    res.json({
        message: 'Recibido fuerte y claro',
        myData: req.body
    });
});
*/
// Base de Datos temporal
interface Videojuego {
    id: number;
    titulo: string;
    genero: string;
}

const juegos: Videojuego[] = [];

// Ruta GET para ver qué tenemos guardado
app.get('/juegos', (req: Request, res: Response) => {
    res.json(juegos);
});

app.post('/juegos', (req: Request, res: Response) => {
    const { title, genre } = req.body;

    // Verificmos si falta el titulo
    if (!title || !genre){
        // Status 400 = "Bad Request" (Petición incorrecta)
        res.status(400).json({
            error: 'Faltan datos: titulo y genero son obligatorios'
        });
        return    // detiene la función para que no se siga ejecutando
    };

    const nuevoJuego: Videojuego = {
        id: juegos.length +1,
        titulo: title,
        genero: genre,
    };

    juegos.push(nuevoJuego);
    console.log('Juego guardado con exito: ', title);

    res.status(200).json(nuevoJuego);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});