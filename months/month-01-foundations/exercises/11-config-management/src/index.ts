/**
 * MODULE 11: Configuration Management with dotenv
 * Description: Environment variable setup and management
 * - dotenv library integration for loading environment variables
 * - .env file configuration to isolate sensitive data and credentials
 * - process.env utilization for injecting configuration into the application
 * - Gitignore enforcement to prevent sensitive data leaks in version control
 */

import dotenv from 'dotenv';

// Injects variables from the .env file into process.env
dotenv.config();

// Environment variable extraction with fallback defaults
const port = process.env.PORT || 3000;
const dbPath = process.env.DB_PATH;
const environment = process.env.APP_ENV;

// Environment-based logging
if (environment === 'development') {
    console.info('Application is currently running in development mode');
} else {
    console.info('Server is running in production mode');
}

console.log(`Server configured on port: ${port}`);
console.log(`Database connection path: ${dbPath}`);