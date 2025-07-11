const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = (filepath, input = '') => {
    return new Promise((resolve, reject) => {
        // Use environment variable for Python path, fallback to 'python'
        const pythonPath = process.env.PYTHON_PATH || 'python';
        
        // Run the Python file with spawn
        const run = spawn(pythonPath, [filepath], { cwd: outputPath });
        let stdout = '';
        let stderr = '';

        if (input) {
            run.stdin.write(input);
        }
        run.stdin.end();

        run.stdout.on('data', (data) => { stdout += data; });
        run.stderr.on('data', (data) => { stderr += data; });

        run.on('error', (err) => {
            reject({
                type: 'runtime',
                message: 'Failed to start process',
                details: err.message
            });
        });

        run.on('close', (code) => {
            if (code !== 0) {
                const details = (stderr && stderr.trim()) ? stderr : (stdout && stdout.trim()) ? stdout : `Process exited with code ${code}`;
                return reject({
                    type: 'runtime',
                    message: 'Runtime error',
                    details
                });
            }
            resolve(stdout);
        });
    });
};

module.exports = {
    executePython,
}; 