const express = require('express');
const cors = require('cors');
require('dotenv').config();

const symptomRoutes = require('./routes/symptoms');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', symptomRoutes);

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Healthcare Symptom Checker API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🏥 Server running on http://localhost:${PORT}`);
});
