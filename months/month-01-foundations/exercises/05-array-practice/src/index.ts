/**
 * EXERCISE: "Tech Talent Filter"
 * -----------------------------------------
 * Objective: Practice backend data processing using TypeScript
 * * 1. 'Candidate' Interface: Must contain id (readonly), name, skills (string array), 
 * yearsExperience and isAvailable (boolean)
 * * 2. Logic to implement:
 * - FILTER: Create a list of candidates who are proficient in "TypeScript" and have 
 * more than 2 years of experience
 * - MAP: Transform the previous result into an array of strings stating: 
 * "Candidate [name] selected for technical interview"
 * - FIND: Search for "Mauro" within the original list to 
 * confirm availability for a new project
 * * 3. Execution: Output all results to the console to verify the logic
 */

interface Candidate {
  readonly id: number;
  name: string;
  skills: string[];
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

function filterCandidates(skillToSearch: string, experience: number): Candidate[] {
  return candidates.filter(candidate => {
    return candidate.skills.includes(skillToSearch) && candidate.yearsExperience > experience;
  });
}

const selectedCandidates = filterCandidates('TypeScript', 2);

const interviewMessages = selectedCandidates.map(candidate => `Candidate ${candidate.name} selected for technical interview`);

const mauro = candidates.find(candidate => candidate.name === 'Mauro');

if (mauro) {
  console.log(`--- Search Result ---`);
  console.log(`Candidate: ${mauro.name} | Available: ${mauro.isAvailable ? 'Yes' : 'No'}`);
}

console.log(interviewMessages);