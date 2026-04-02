/**
 * path: To manipulate folder and file names without system errors
 * fs: To operate (read, write, delete) physical files on the disk
 * url: To translate between the internet format (URL) and the disk format (Path),
 * which is essential in modern TypeScript projects
 */

import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

// --- Path Module ---

const directory = 'users';
const subDirectory = 'Mauro';
const fileName = "preferences.json";

const finalPath = path.join(directory, subDirectory, fileName);

console.log(`Constructed path: ${finalPath}`);

// --- FileSystem Promises ---

async function manageFiles(): Promise<void> {
    try {
        await fs.writeFile('note.txt', 'Hello, I am learning native modules');
        console.log('File written successfully');

        const content = await fs.readFile('note.txt', 'utf-8');
        console.log('The file content is:', content);
    } catch (error) {
        console.error('Oops... an error occurred:', error);
    }
}

manageFiles();

// --- URL Module ---

// 'import.meta.url' is the current location of this file in URL format
const currentUrl = import.meta.url;
console.log('Standard URL:', currentUrl);

// Convert that URL to a standard physical file path
const physicalPath = fileURLToPath(currentUrl);
console.log('Physical path:', physicalPath);

// Using path to extract the extension
const fileExtension = path.extname(physicalPath);
console.log('My file extension is:', fileExtension);