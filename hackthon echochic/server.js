// server.js

const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Example data storage using a JSON file
const dataFilePath = 'data.json';

// Routes
app.get('/api/data', (req, res) => {
    // Read data from file
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const jsonData = JSON.parse(data);
        res.json(jsonData);
    });
});

app.post('/api/data', (req, res) => {
    // Example: Append new data to the file
    const newData = req.body;
    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        const jsonData = JSON.parse(data);
        jsonData.push(newData);
        fs.writeFile(dataFilePath, JSON.stringify(jsonData), err => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
            res.status(201).json({ message: 'Data added successfully' });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
