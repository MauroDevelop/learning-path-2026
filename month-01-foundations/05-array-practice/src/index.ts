/**
 * EJERCICIO: "Filtro de Talento Tech"
 * -----------------------------------------
 * Objetivo: Practicar el procesamiento de datos en el Backend usando TypeScript.
 * * 1. Interfaz 'Candidate': Debe tener id (readonly), name, skills (array de strings), 
 * yearsExperience e isAvailable (boolean).
 * * 2. Lógica a implementar:
 * - FILTER: Crear una lista de candidatos que dominen "TypeScript" y tengan 
 * más de 2 años de experiencia.
 * - MAP: Transformar el resultado anterior en un array de frases que digan: 
 * "Candidato [nombre] seleccionado para entrevista técnica".
 * - FIND: Buscar el perfil de "Mauro" dentro de la lista original para 
 * confirmar si está disponible para un nuevo proyecto.
 * * 3. Ejecución: Mostrar todos los resultados en consola para verificar la lógica.
 */

interface Candidate {
  readonly id: number;
  name: string;
  skills: Array<string>;
  yearsExperience: number;
  isAvailable: boolean;
}

const candidates: Candidate[] = [
  {
    id: 1,
    name: "Mauro",
    skills: ["TypeScript", "Node.js", "SQL"],
    yearsExperience: 1,
    isAvailable: true
  },
  {
    id: 2,
    name: "Carla",
    skills: ["TypeScript", "React", "SQL"],
    yearsExperience: 4,
    isAvailable: true
  },
  {
    id: 3,
    name: "Enzo",
    skills: ["Java", "Python"],
    yearsExperience: 5,
    isAvailable: false
  },
  {
    id: 4,
    name: "Sofia",
    skills: ["TypeScript", "AWS", "Node.js"],
    yearsExperience: 3,
    isAvailable: true
  }
];

function filterCandidates(skillToSearch: string, experience: number) {
  return candidates.filter(candidate => {
    return candidate.skills.includes(skillToSearch) && candidate.yearsExperience > experience;
  });
};

const candidatesSelect = filterCandidates('TypeScript', 2);

const candidatesList = candidatesSelect.map(candidate => `Candidato ${candidate.name} seleccionado para entrevista técnica`);

const mauro = candidates.find(candidate => candidate.name === 'Mauro');

if (mauro) {
  console.log(`--- Resultado de búsqueda ---`);
  console.log(`Candidato: ${mauro.name} | Disponible: ${mauro.isAvailable ? 'Sí' : 'No'}`);
}

console.log(candidatesList);
