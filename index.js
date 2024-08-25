const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors=require("cors")

const corsOptions = {
    origin: '*', // Allow requests from any origin (useful for testing)
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());
// POST Method Endpoint: /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "joshn_doe_17091999";
    const email = "john@xyz.com";
    const roll_number = "ABCD123";
    
    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ 
            is_success: false, 
            user_id, 
            email, 
            roll_number, 
            numbers: [], 
            alphabets: [], 
            highest_lowercase_alphabet: [] 
        });
    }

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item.toString()));
    const alphabets = data.filter(item => isNaN(item));
    const lowercaseAlphabets = alphabets.filter(item => /^[a-z]$/.test(item));
    
    // Find the highest lowercase alphabet
    const highestLowercaseAlphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
    });
});

// GET Method Endpoint: /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
