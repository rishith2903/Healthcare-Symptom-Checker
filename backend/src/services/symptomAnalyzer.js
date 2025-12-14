// Personalized by Rishith Kumar — Node.js version

/**
 * Main function to analyze symptoms
 * @param {string} symptoms - User-provided symptom description
 * @returns {Object} Analysis result with conditions, recommendations, urgency, and disclaimer
 */
function analyzeSymptoms(symptoms) {
    return {
        conditions: generateConditions(symptoms),
        recommendations: generateRecommendations(symptoms),
        urgencyLevel: determineUrgency(symptoms),
        disclaimer: "⚠️ IMPORTANT: This analysis is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. If you are experiencing a medical emergency, call your local emergency number immediately."
    };
}

/**
 * Generate possible conditions based on symptoms
 */
function generateConditions(symptoms) {
    const lowerSymptoms = symptoms.toLowerCase();
    const conditions = [];

    // Pattern matching for common symptom clusters
    if (lowerSymptoms.includes("fever") || lowerSymptoms.includes("temperature")) {
        if (lowerSymptoms.includes("cough") || lowerSymptoms.includes("throat")) {
            conditions.push({
                name: "Upper Respiratory Infection",
                probability: "High",
                description: "Common viral or bacterial infection affecting the nose, throat, and airways. Usually self-limiting but may require medical attention if symptoms worsen."
            });
            conditions.push({
                name: "Influenza",
                probability: "Medium",
                description: "Viral infection that affects the respiratory system. Symptoms typically include fever, body aches, fatigue, and respiratory symptoms."
            });
        }
    }

    if (lowerSymptoms.includes("headache")) {
        conditions.push({
            name: "Tension Headache",
            probability: "Medium",
            description: "Most common type of headache, often caused by stress, muscle tension, or poor posture. Usually manageable with rest and over-the-counter pain relievers."
        });

        if (lowerSymptoms.includes("nausea") || lowerSymptoms.includes("light")) {
            conditions.push({
                name: "Migraine",
                probability: "Medium",
                description: "Neurological condition causing moderate to severe headaches, often with sensitivity to light and sound, and sometimes nausea."
            });
        }
    }

    if (lowerSymptoms.includes("stomach") || lowerSymptoms.includes("abdominal")) {
        conditions.push({
            name: "Gastroenteritis",
            probability: "Medium",
            description: "Inflammation of the stomach and intestines, often caused by viral or bacterial infection. Symptoms include stomach pain, nausea, and diarrhea."
        });
    }

    if (lowerSymptoms.includes("chest pain") || lowerSymptoms.includes("chest pressure")) {
        conditions.push({
            name: "Cardiac Event (Requires Immediate Evaluation)",
            probability: "Unknown - Urgent Evaluation Needed",
            description: "Chest pain can indicate serious cardiac conditions. Immediate medical evaluation is essential to rule out heart attack or other cardiac emergencies."
        });
    }

    // Generic conditions if no specific patterns matched
    if (conditions.length === 0) {
        conditions.push({
            name: "General Malaise",
            probability: "Medium",
            description: "Non-specific symptoms that could indicate various conditions. Medical evaluation recommended for proper diagnosis."
        });
        conditions.push({
            name: "Viral Infection",
            probability: "Low to Medium",
            description: "Many viral infections present with general symptoms. Most are self-limiting but monitoring is important."
        });
    }

    return conditions.slice(0, 4);
}

/**
 * Generate recommendations based on symptoms
 */
function generateRecommendations(symptoms) {
    const lowerSymptoms = symptoms.toLowerCase();
    const recommendations = [];

    // Always include these
    recommendations.push("Consult with a healthcare professional for proper diagnosis and treatment plan");

    // Symptom-specific recommendations
    if (lowerSymptoms.includes("fever")) {
        recommendations.push("Monitor your temperature regularly and stay hydrated");
        recommendations.push("Rest adequately to help your body recover");
    }

    if (lowerSymptoms.includes("pain")) {
        recommendations.push("Keep track of pain intensity, location, and triggers");
        recommendations.push("Consider over-the-counter pain relief as appropriate (consult pharmacist)");
    }

    if (lowerSymptoms.includes("cough") || lowerSymptoms.includes("throat")) {
        recommendations.push("Stay hydrated and consider warm liquids to soothe throat irritation");
        recommendations.push("Avoid irritants like smoke and strong odors");
    }

    recommendations.push("Document your symptoms, including when they started and any changes in severity");
    recommendations.push("Seek immediate care if symptoms worsen or new concerning symptoms develop");

    return recommendations.slice(0, 5);
}

/**
 * Determine urgency level based on symptoms
 */
function determineUrgency(symptoms) {
    const lowerSymptoms = symptoms.toLowerCase();

    // Emergency indicators
    const emergencyKeywords = [
        "chest pain", "difficulty breathing", "can't breathe", "severe bleeding",
        "unconscious", "seizure", "stroke", "heart attack", "severe head injury",
        "severe abdominal pain", "coughing blood", "suicidal"
    ];

    for (const keyword of emergencyKeywords) {
        if (lowerSymptoms.includes(keyword)) {
            return "Emergency - Seek immediate medical attention or call emergency services";
        }
    }

    // Urgent indicators
    const urgentKeywords = [
        "high fever", "persistent vomiting", "severe pain", "confusion",
        "persistent diarrhea", "dehydration", "spreading rash"
    ];

    for (const keyword of urgentKeywords) {
        if (lowerSymptoms.includes(keyword)) {
            return "Urgent - Consult healthcare provider within 24 hours";
        }
    }

    // Check for multiple symptoms
    const symptomCount = symptoms.split(",").length + symptoms.split("and").length;
    if (symptomCount > 3) {
        return "Routine - Schedule appointment with healthcare provider soon";
    }

    return "Monitor - Track symptoms and consult healthcare provider if worsening or persistent";
}

module.exports = { analyzeSymptoms, generateConditions, generateRecommendations, determineUrgency };
