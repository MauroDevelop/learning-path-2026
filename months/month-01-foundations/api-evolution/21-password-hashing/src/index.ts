import { UserManager } from './UserManager.js';

async function main(): Promise<void> {
    try {
        console.log("--- Secure Registration Attempt ---");

        const registeredUser = await UserManager.register({
            username: "MauroDev",
            email: "maurodevelop.git@gmail.com",
            password: "superSecret123", // Plain-text password to be hashed by the manager
            age: 26
        });

        console.log("System output:");
        console.log(registeredUser);

    } catch (error) {
        console.error("Registration failed:");
        
        // Type Guard to safely access the error message without forced type casting
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("An unknown error occurred during registration");
        }
    }
}

main();