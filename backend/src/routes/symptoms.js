const express = require('express');
const router = express.Router();
const { analyzeSymptoms } = require('../services/symptomAnalyzer');

// POST /api/analyze-symptoms
router.post('/analyze-symptoms', async (req, res) => {
    try {
        const { symptoms, sessionId } = req.body;

        if (!symptoms || !sessionId) {
            return res.status(400).json({
                error: 'Symptoms and sessionId are required'
            });
        }

        const analysisResult = analyzeSymptoms(symptoms);

        res.json(analysisResult);
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
});

module.exports = router;
