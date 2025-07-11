const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const { executeJava } = require('./executeJava');
const { executePython } = require('./executePython');

const app = express();
dotenv.config();

//middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/run", async (req, res) => {
    const { language = 'cpp', code , input = '' } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = generateFile(language, code);
        let output;
        if (language === 'java') {
            output = await executeJava(filePath, input);
        } else if (language === 'python') {
            output = await executePython(filePath, input);
        } else {
            output = await executeCpp(filePath, input);
        }
        res.json({ output });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});
