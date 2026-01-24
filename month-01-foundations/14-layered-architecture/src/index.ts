/*
Modulo 14: Arquitectura de Capas y Separación de Responsabilidades

En este módulo he aprendido a:
- Separar la lógica de negocio (Servicios) de los puntos de entrada (Controladores/Rutas)
- Crear una clase de Servicio para centralizar el acceso al File System
- Mejorar la legibilidad del código eliminando lógica pesada de los endpoints de Express

Comando para ejecutar el codigo:
npm run dev:14
*/

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');


interface Videojuego {
    id: number;
    titulo: string;
    genero: string;
}

// Esta clase se encarga solo de hablar con el archivo JSON
class VideojuegoService {
    async getAll(): Promise<Videojuego[]> {
        try {
            const data = await fs.readFile(DB_PATH, 'utf-8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async create(titulo: string, genero: string): Promise<Videojuego> {
        const juegos = await this.getAll();
        const nuevo: Videojuego = {
            id: (juegos[juegos.length - 1]?.id || 0) + 1,
            titulo,
            genero
        };
        juegos.push(nuevo);
        await fs.writeFile(DB_PATH, JSON.stringify(juegos, null, 2));
        return nuevo;
    }

    async delete(id: number): Promise<boolean> {
        const juegos = await this.getAll();
        const filtrados = juegos.filter(j => j.id !== id);
        if (juegos.length === filtrados.length) return false;
        await fs.writeFile(DB_PATH, JSON.stringify(filtrados, null, 2));
        return true;
    }
}

const service = new VideojuegoService();

// Las rutas ahora son "limpias": solo reciben la req y usan el service.
app.get('/juegos', async (req: Request, res: Response) => {
    const data = await service.getAll();
    res.json(data);
});

app.post('/juegos', async (req: Request, res: Response) => {
    const { title, genre } = req.body;
    if (!title || !genre) {
        return res.status(400).json({ error: 'Faltan datos' });
    }
    const nuevo = await service.create(title, genre);
    res.status(201).json(nuevo);
});

app.delete('/juegos/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string); // ese parametro llegara como una cadena de texto desde la URL
    const deleted = await service.delete(id);
    
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado con éxito' });
});

app.listen(PORT, () => {
    console.log(`Arquitectura de Capas en http://localhost:${PORT}`);
});