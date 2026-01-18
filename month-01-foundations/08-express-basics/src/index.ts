/* 
En este módulo descargué Express y lo usé para acceder a la URL
de mi servidor local con VS Code, hice una sección de filtrado según
las habilidades a través de la URL. Próximamente estaré incorporando
APIs a mi código. Fue un día bastante productivo. 


*/

import express, { Request, Response } from "express";

// Defino la interface
interface Candidate {
    readonly id: number;
    name: string;
    skills: Array<string>;
    yearsExperience: number;
    isAvailable: boolean;
};

const app = express();
const PORT = 3000;

app.use(express.json())

// Simulación de una Base de Datos
const candidates: Candidate[] = [
    { id: 1, name: "Mauro", skills: ["TypeScript", "Node.js"], yearsExperience: 1, isAvailable: true },
    { id: 2, name: "Carla", skills: ["TypeScript", "React"], yearsExperience: 4, isAvailable: true },
    { id: 3, name: "Sofia", skills: ["TypeScript", "AWS"], yearsExperience: 3, isAvailable: true }
];

app.get( '/search', (req: Request, res: Response) => {
    const skills = req.query.skills as string

    if (!skills){
        return res.status(400).json({
            error: "Falta el parámetro de búsqueda",
            ejemplo_de_uso: "http://localhost:3000/search?skill=TypeScript"
        });
    }
    

    const filtered = candidates.filter(c => {
        return c.skills.some(s => s.toLowerCase() === skills.toLowerCase());
    });

    res.json({
        encontrados: filtered.length,
        resultado: filtered
    })
});

app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
})