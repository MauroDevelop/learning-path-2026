

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { error } from 'console';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'database.json');

// console.log(await fs.readFile(BD_PATH, 'utf-8'));


app.use(express.json());

type Category = 'Entrada' | 'Principal' | 'Postre' | 'Bebida';

// enum Category {
//     Entrada,
//     Principal,
//     Postre,
//     Bebida,
// };

interface Plate {
    readonly id: number,
    name: string,
    price?: number,
    category?: Category,
    available?: boolean,
}

class MenuService {
    async getAll(): Promise<Plate[]> {
        try {
            const contend = JSON.parse(await fs.readFile(DB_PATH, 'utf-8'));
            return contend;
        } catch (error) {
            return [];
        };
    };

    async getById(id: number) {
        const platos = await this.getAll(); // uso de this en lugar de sevice
        const plato = platos.find((p) => p.id === id);
        return plato;
    };

    async savePlate(plate: Plate[]): Promise<void> {

        const plateString = JSON.stringify(plate, null, 2);

        await fs.writeFile(DB_PATH, plateString);
    };

    async create(data: Omit<Plate, 'id'>): Promise<Plate> {
        const platos = await this.getAll();

        // El signo de pregunta es por si hay un error al acceder a id (undefine), si no se cumple usa 0
        const lastId = platos.length > 0 ? platos[platos.length - 1]?.id || 0 : 0
        const newId = lastId + 1

        const newPlate: Plate = {
            id: newId,
            ...data // Copia nombre, precio, etc...
        };

        platos.push(newPlate);
        await this.savePlate(platos);

        return newPlate;
    }

    async getOccupiedId(): Promise<number[]> {
        const plates = await this.getAll();
        return plates.map(p => p.id)
    }

    async deletePlate(id: number) {
        const allPlates = await this.getAll();
        const plates = allPlates.filter(p => p.id !== id)
        if (plates.length === allPlates.length) {
            return 'No se elimino ningun plato';
        }
        await this.savePlate(plates);
        return 'Plato eliminado con exito';

    }
};

const service = new MenuService;

(async () => {
    try {
        // console.log('--- Metodo getAll ---')
        // const menuCompleto = await service.getAll();
        // console.log(menuCompleto);

        // console.log('--- Metodo getById ---')
        // const platoUno = await service.getById(1);
        // console.log(platoUno);

        // console.log('--- Metodo savePlate ---')
        // const platos = await service.getAll();

        // platos.push({
        //     id: 99,
        //     name: "Plato de Prueba",
        //     price: 1080,
        //     category: "Entrada",
        //     available: true
        // });

        // await service.savePlate(platos);
        // console.log("Plato de prueba guardado en el archivo database.json");

        // console.log('--- Metodo create ---')
        // const plate1 = await service.create({
        //     name: "Asado de Tira",
        //     price: 12500,
        //     category: "Principal", // Debe ser exacto como en tu Type ('Principal')
        //     available: true
        // })

        // console.log('El plato fue creado y guardado: ', plate1)

        // const plate2 = await service.create({
        //     name: "Flan con Dulce de Leche",
        //     price: 4500,
        //     category: "Postre",
        //     available: true
        // });

        // console.log('El plato fue creado y guardado: ', plate2)

        console.log(await service.getOccupiedId());

        console.log(await service.deletePlate(4))

    } catch (error) {
        console.log('Al parecer hubo un error: ', error)
    }
})();

app.get('/menu/:id', async (req: Request, res: Response) => {
    // tengo que conventir la id de la URL a número
    const id = parseInt(req.params.id as string);

    if (isNaN(id)) {
        return res.status(400).json({error: "El ID debe ser un número"})
    };

    const plato = await service.getById(id);

    if (plato) {
        res.json(plato);
    } else {
        res.status(400).json({ error: "Plato no encontrado"})
    };
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}/menu`);
});