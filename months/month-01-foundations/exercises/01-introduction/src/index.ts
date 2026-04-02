// Variable declaration variable with explicit typing
// note: In professional environments, we use 'const' for inmmutable values
// to prevent accidental reassignments 
let name: string = "Mauro";
let years: number = 19;
let IsStudent: boolean = true;
let answer: string = ""


// Format and output developer information to the console
console.log(`Hello, my name is ${name} and i'm ${years} years old.`);


// Conditional logic to determine the human-readable status
if (IsStudent) {
    answer = "yes"
} else {
    answer = "no"
}

console.log(`Is student?: ${answer}`);
// Type safety check:
// The following line would trigger a Compilation Error because 'developerName' is a string
// developerName = 100;