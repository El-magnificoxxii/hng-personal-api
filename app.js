const express = require('express');
const os = require('os');

const app = express();
const PORT = 5000;

// JSON header middleware
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Simple API key (HNG expects auth check behavior)
const API_KEY = "hng-stage-1-key";

function auth(req, res, next) {
    const key = req.headers['x-api-key'];

    if (!key) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    if (key !== API_KEY) {
        return res.status(401).json({ error: "Invalid API key" });
    }

    next();
}

// GET /
app.get('/', (req, res) => {
    res.status(200).json({
        message: "API is running"
    });
});

// GET /health
app.get('/health', (req, res) => {
    const memory = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);

    res.status(200).json({
        message: "healthy",
        cpu: os.loadavg()[0].toFixed(2),
        memory: `${memory}MB`
    });
});

// GET /me (protected)
app.get('/me', auth, (req, res) => {
    res.status(200).json({
        name: "Abdullateef Oni",
        email: "abdullateefoni@yahoo.com",
        github: "https://github.com/El-magnificoxxii",
        repo_name: "hng-personal-api"
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Personal API is running on port ${PORT}`);
});