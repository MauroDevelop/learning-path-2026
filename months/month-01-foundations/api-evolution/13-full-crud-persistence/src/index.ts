/*
Módulo 13: CRUD Completo y Persistencia Real (File System)

En este módulo he aprendido a:
- Integrar módulos nativos (`fs/promises`, `path`, `url`) para gestionar rutas físicas y archivos.
- Implementar persistencia real de datos leyendo y escribiendo en un archivo `database.json`.
- Manejar la asincronía en las rutas de Express mediante `async/await` para asegurar que las operaciones de disco finalicen antes de responder.
- Crear funciones de ayuda (`readGames`, `writeGames`) para encapsular la lógica de acceso a datos.
- Calcular IDs autoincrementales basados en el contenido actual de un archivo físico.

Actividades realizadas:
1. Configuración de un entorno de ejecución específico mediante scripts en `package.json`.
2. Creación de una base de datos física en formato JSON.
3. Implementación de un endpoint GET que extrae información directamente del disco.
4. Implementación de un endpoint POST que valida, procesa y guarda nuevos registros permanentemente.

Comando para ejecutar:
npm run dev:13

Comando para probar POST (Agregar juego):
curl -X POST http://localhost:3000/juegos -H "Content-Type: application/json" -d '{"title": "Minecraft", "genre": "Sandbox"}'
*/

import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express entienda JSON
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, 'database.json');

async function readGames() {
    try {
        const content = await fs.readFile(DB_PATH, 'utf-8');
        return JSON.parse(content);
    } catch (error) {
        return [];
    };
};

async function writeGames(games: any[]) {
    // El 'null, 2' hace que el JSON se guarde con sangria y sea facil de leer
    await fs.writeFile(DB_PATH, JSON.stringify(games, null, 2), 'utf-8');
};

app.post('/juegos', async (req: Request, res: Response) => {
    const { title, genre } = req.body;

    if (!title || !genre) {
        return res.status(400).json({ error: 'Faltan datos: titulo y genero son obligatorios' });
    }

    const games = await readGames();

    // Crear el nuevo objeto con ID autoincremental
    const newGame = {
        id: (games[games.length - 1]?.id || 0) + 1,
        titulo: title,
        genero: genre
    };

    // Guardar en el array y escribir en el disco
    games.push(newGame);
    await writeGames(games);

    // Responder con exito (Status 201)
    res.status(201).json(newGame);
});

app.get('/juegos', async (req: Request, res: Response) => {
    const games = await readGames();
    res.json(games);
});

app.listen(PORT, () => {
    console.log(`Leyendo Base de Datos desde: ${DB_PATH}`);
    console.log(`Servidor listo en http://localhost:${PORT}/juegos`);
})