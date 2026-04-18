app.js  node_modules  package-lock.json  package.json
const express = require('express');
const app = express();
const PORT = 5000;

// Important: Set JSON content-type for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// GET /
app.get('/', (req, res) => {
    res.status(200).json({
        "message": "API is running"
    });
});

// GET /health
app.get('/health', (req, res) => {
    res.status(200).json({
        "message": "healthy"
    });
});

// GET /me
app.get('/me', (req, res) => {
    res.status(200).json({
        "name": "Abdullateef Oni",
        "email": "abdullateefoni@yahoo.com",
        "github": "https://github.com/El-magnificoxxii"
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Personal API is running on port ${PORT}`);
});
