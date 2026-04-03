import bcrypt from 'bcrypt';
import { UserManager } from './UserManager.js';

async function testPasswordSecurity(): Promise<void> {
    // Define the plain-text password for registration
    const originalPassword = 'mauro123';
    console.log('Original Password:', originalPassword);

    // --- REGISTRATION ---
    // Generate a hash using 10 salt rounds to balance security and performance
    const hashedPassword = await bcrypt.hash(originalPassword, 10);
    console.log('\nHashed Password (DB Storage):');
    console.log(hashedPassword);

    // --- LOGIN ---
    console.log("\nAttempting to log in...");

    // Helper function to handle repeated login authentication attempts
    async function attemptLogin(passwordAttempt: string): Promise<void> {
        console.log('\nPassword entered:', passwordAttempt);
        
        // Compare the plain-text attempt against the generated hash
        const isValid = await bcrypt.compare(passwordAttempt, hashedPassword);
        
        if (isValid) {
            console.log('Success: The password is correct. Welcome!');
        } else {
            console.error('Error: Incorrect password! Please try again.');
        }
    }

    // Test with valid credentials
    await attemptLogin('mauro123');

    // Test with invalid credentials
    await attemptLogin('mauro124');
}

testPasswordSecurity();