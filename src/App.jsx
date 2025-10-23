import { useState } from 'react';
import { Activity, Stethoscope } from 'lucide-react';
import { SymptomInputForm } from './components/SymptomInputForm';
import { ResultDisplay } from './components/ResultDisplay';
// Removed: import { PastQueries } from './components/PastQueries';
import { getSessionId } from './utils/sessionId';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  // Removed: const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const analyzeSymptoms = async (symptoms) => {
    setLoading(true);

    try {
      const sessionId = getSessionId();
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-symptoms`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ symptoms, sessionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze symptoms');
      }

      const result = await response.json();
      setAnalysisResult(result);
      // REMOVED: setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Healthcare Symptom Checker</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get educational insights about your symptoms. This tool uses advanced analysis to suggest possible conditions
            and recommendations, but should never replace professional medical advice.
          </p>
        </header>

        <div className="flex flex-col items-center gap-8">
          <SymptomInputForm onAnalyze={analyzeSymptoms} loading={loading} />

          {analysisResult && (
            <div className="w-full flex flex-col items-center">
              <div className="mb-6 flex items-center gap-2 text-blue-600">
                <Activity className="w-5 h-5" />
                <h2 className="text-lg font-semibold">Analysis Results</h2>
              </div>
              <ResultDisplay result={analysisResult} />
            </div>
          )}

          {/* REMOVED: The entire PastQueries rendering block */}
          
        </div>

        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>
            Built for educational purposes only. Always consult with qualified healthcare professionals
            for medical advice, diagnosis, and treatment.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;