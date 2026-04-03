import { UserManager } from "./UserManager.js";

async function main(): Promise<void> {
    console.log('--- Initializing Authentication System ---');
    
    try {
        // --- USER REGISTRATION ---
        console.log('Attempting to register user...');

        const registerResult = await UserManager.register({
            username: 'MauroDev',
            email: 'mauro@code.com',
            password: 'MySecurePassword123'
        });

        console.log('Registration successful. Generated ID:', registerResult.userId);

        // --- LOGIN WORKFLOW ---

        // SUCCESSFUL LOGIN: Valid credentials provided
        console.log("\nAttempting valid login...");
        
        const successfulLogin = await UserManager.login({
            email: 'mauro@code.com',
            password: 'MySecurePassword123'
        });

        console.log("Welcome! Here is your authorization credential (JWT):");
        console.log(successfulLogin.token);

        // FAILED LOGIN: Invalid credentials provided
        console.log('\nAttempting invalid login...');
        
        // This operation is expected to fail and transfer the execution flow to the catch block
        await UserManager.login({
            email: 'mauro@code.com',
            password: 'Incorrect_Password_123'
        });

    } catch (error) {
        console.error("Access Denied (System blocked the login attempt):");
        
        // Type Guard implementation to safely access error properties
        if (error instanceof Error) {
            console.error("System message:", error.message);
        } else {
            console.error("An unknown authentication error occurred");
        }
    }
}

main();