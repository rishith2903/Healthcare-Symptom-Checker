/**
 * @typedef {Object} Condition
 * @property {string} name - The name of the condition
 * @property {string} probability - The probability level (High/Medium/Low)
 * @property {string} description - Brief description of the condition
 */

/**
 * @typedef {Object} AnalysisResult
 * @property {Condition[]} conditions - Array of possible conditions
 * @property {string[]} recommendations - Array of recommendations
 * @property {string} urgencyLevel - Urgency level assessment
 * @property {string} disclaimer - Medical disclaimer
 */

/**
 * @typedef {Object} SymptomQuery
 * @property {string} id - Unique identifier
 * @property {string} symptoms - Description of symptoms
 * @property {AnalysisResult} analysis_result - Analysis results
 * @property {string} created_at - Creation timestamp
 * @property {string} session_id - Session identifier
 */

// Export empty object to make this a valid module
export {};
