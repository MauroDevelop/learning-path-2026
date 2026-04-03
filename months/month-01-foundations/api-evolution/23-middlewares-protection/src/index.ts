import { AuthMiddleware } from "./AuthMiddleware.js";
import { UsersData } from "./UsersData.js";
import { UserManager } from "./UserManager.js";

async function main(): Promise<void> {
    console.log('--- INITIALIZING PROTECTION SYSTEM ---');

    try {
        // Provisioning the default Admin user for testing purposes
        console.log('Provisioning Admin user...');
        await UserManager.register({
            username: 'Admin',
            email: 'adminServer@code.com',
            password: 'root1234'
        });
    } catch (error) {
        // Silently ignore registration failure assuming the Admin is already provisioned
    }

    // Authenticate to retrieve the authorization token
    const session = await UserManager.login({
        email: 'adminServer@code.com',
        password: 'root1234'
    });
    
    const token = session.token;
    console.log('Authorization token successfully retrieved\n');

    // --- INVALID AUTHORIZATION ATTEMPT ---
    console.log('Attempting access with an invalid token...');

    const invalidAuthAttempt = AuthMiddleware.verifyToken('Admin_Token_2026');

    if (!invalidAuthAttempt.success) {
        console.log('Access Denied: Invalid token provided');
        console.log("Reason:", invalidAuthAttempt.error, '\n');
    }

    // --- VALID AUTHORIZATION ATTEMPT ---
    console.log('Attempting access with a valid token...');
    
    const validAuthAttempt = AuthMiddleware.verifyToken(token);

    if (!validAuthAttempt.success) {
        console.log('Access Denied: Invalid token provided');
        console.log("Reason:", validAuthAttempt.error, '\n');
    } else {
        console.log('Access Granted.');
        console.log('Fetching sensitive data from the user database...');
        
        // Protected resource access simulation
        const users = UsersData.getUsersData();
        console.log('User directory:', users);
    }
}

// Top-level execution with unhandled rejection protection
main().catch(console.error);