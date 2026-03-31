import { spawn } from 'child_process';

// List of all dev scripts defined in package.json
const scriptsToTest = [
    'dev:01', 'dev:02', 'dev:03', 'dev:04', 'dev:05',
    'dev:06', 'dev:07', 'dev:08', 'dev:09', 'dev:10',
    'dev:11', 'dev:12', 'dev:13', 'dev:14', 'dev:15',
    'dev:16', 'dev:17', 'dev:18', 'dev:21', 'dev:22',
    'dev:23', 'dev:24', 'dev:26', 'dev:27', 'dev:28', 'dev:29'
];

async function runAlgorithm() {
    console.log("Starting Month 1 Automated Audit...\n");

    for (const script of scriptsToTest) {
        process.stdout.write(`Evaluating [${script}]... `);

        await new Promise((resolve) => {
            // 'spawn' creates a child process in the operating system
            const command = `npm run ${script}`;
            const child = spawn(command, { shell: true });
            let hasError = false;

            // Listen for any errors output by the program (stderr)
            child.stderr.on('data', (data) => {
                const output = data.toString();
                // Ignore standard NPM warnings; we are only looking for actual crashes
                if (!output.includes('npm warn') && !output.includes('WARN')) {
                    hasError = true;
                }
            });

            // Allow the module 3 seconds to boot up. 
            // If it has syntax errors or bad import paths, it will crash before this timeout.
            setTimeout(() => {
                // Kill the child process to free up the terminal and the port
                child.kill(); 
                
                if (hasError) {
                    console.log("❌ ERROR (Check import paths or syntax)");
                } else {
                    console.log("✅ SUCCESSFUL COMPILATION");
                }
                
                // Resolve the promise to allow the 'for' loop to proceed to the next script
                resolve();
            }, 3000);
        });
    }
    
    console.log("\nAudit finished");
}

// Execute the main function
runAlgorithm();