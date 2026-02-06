import { UserManager } from "./UserManager.js";
import { InMemoryUserRepo } from "./repositories/InMemoryUserRepo.js"; 

async function main() {
    console.log("--- MODULE 24: DEPENDENCY INJECTION ---");

    // 1. PREPARATION 
    // The database implementation we are going to use (In-memory)
    const userRepo = new InMemoryUserRepo(); 

    // 2. INJECTION
    // We pass the repository instance to the UserManager
    const userManager = new UserManager(userRepo);

    // 3. EXECUTION
    try {
        console.log("Registering user...");
        const result = await userManager.register({
            username: "MauroDev",
            email: "mauro@code.com",
            password: "password123"
        });
        
        console.log(result);
        
        // Quick login test
        console.log("\nAttempting login...");
        const loginResult = await userManager.login({
            email: "mauro@code.com",
            password: "password123"
        });
        console.log("Token received:", loginResult.token);

    } catch (error: any) {
        console.error("Operation error:", error.message);
    }
}

main();