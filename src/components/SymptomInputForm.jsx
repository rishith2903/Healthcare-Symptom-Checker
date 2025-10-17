import { useState } from 'react';
import { AlertCircle, Loader2, Lightbulb } from 'lucide-react';

const SAMPLE_PROMPTS = [
  "I have a fever of 101°F, persistent cough for 3 days, sore throat, and fatigue",
  "Severe headache on one side, sensitivity to light, and nausea for the past 6 hours",
  "Sharp pain in lower right abdomen, nausea, and loss of appetite since yesterday",
  "Persistent dry cough, shortness of breath, and chest tightness for 2 weeks",
  "Sudden onset of severe chest pain and difficulty breathing",
  "Frequent urination, excessive thirst, and unexplained weight loss over the past month"
];

/**
 * @param {Object} props
 * @param {function} props.onAnalyze - Function to call when analyzing symptoms
 * @param {boolean} props.loading - Whether analysis is in progress
 */
export function SymptomInputForm({ onAnalyze, loading }) {
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState('');
  const [showSamples, setShowSamples] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!symptoms.trim()) {
      setError('Please describe your symptoms');
      return;
    }

    if (symptoms.trim().length < 10) {
      setError('Please provide more details about your symptoms (at least 10 characters)');
      return;
    }

    try {
      await onAnalyze(symptoms);
      setSymptoms('');
      setShowSamples(false);
    } catch (err) {
      setError('Failed to analyze symptoms. Please try again.');
    }
  };

  const handleSampleClick = (sample) => {
    setSymptoms(sample);
    setShowSamples(false);
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="symptoms" className="block text-sm font-semibold text-gray-700">
            Describe Your Symptoms
          </label>
          <button
            type="button"
            onClick={() => setShowSamples(!showSamples)}
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
            disabled={loading}
          >
            <Lightbulb className="w-4 h-4" />
            {showSamples ? 'Hide' : 'Show'} Examples
          </button>
        </div>

        {showSamples && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs font-semibold text-blue-900 mb-3">Click any example to use it:</p>
            <div className="space-y-2">
              {SAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSampleClick(prompt)}
                  className="w-full text-left text-sm text-blue-700 hover:text-blue-900 hover:bg-blue-100 p-2 rounded transition-colors"
                  disabled={loading}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <textarea
          id="symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Example: I have a fever of 101°F, persistent cough for 3 days, sore throat, and fatigue..."
          className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
          disabled={loading}
        />
        <p className="mt-2 text-xs text-gray-500">
          Be as specific as possible. Include duration, severity, and any other relevant details.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyzing Symptoms...
          </>
        ) : (
          'Analyze Symptoms'
        )}
      </button>

      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800 leading-relaxed">
          <strong>⚠️ Educational Use Only:</strong> This tool provides educational information and should never replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.
        </p>
      </div>
    </form>
  );
}
