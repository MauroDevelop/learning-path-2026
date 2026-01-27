import express, {Request, Response} from 'express';
import { get } from 'node:http';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Definición del esquema
const plateSchema = z.object(
    {
        // Debe ser tipo texto, 3 caracteres minimo, y un mensaje de error
        name: z.string().min(3, 'ERROR: El nombre debe tener mas de 3 caracteres'),
        // Deber ser un número positivo
        price: z.number().positive('ERROR: El precio deber ser mayor a 0'),
        // Puedo crear enums para solo permitir una de las palabras
        category: z.enum(['Entrada', 'Principal', 'Postre', 'Bebida']),
        // Al colocar optional() el dato no es necesario
        available: z.boolean().optional()
    }
)

app.post('/menu', async (req: Request, res: Response) => {
    // paso los datos pedidos por el esquema
    const result = plateSchema.safeParse(req.body);

    if (result.success === false) {
        return res.status(400).json({ error: JSON.parse(result.error.message)});
    }

    console.log('Resultados resividos y validados: ', result.data);

    res.status(201).json({
        mensaje: "Plato validado correctamente",
        plato: result.data
    })

})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

