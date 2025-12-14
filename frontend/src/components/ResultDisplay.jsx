import { AlertTriangle, CheckCircle, Info, AlertCircle } from 'lucide-react';

/**
 * @param {Object} props
 * @param {import('../types/symptom.js').AnalysisResult} props.result - Analysis result to display
 */
export function ResultDisplay({ result }) {
  const getUrgencyColor = (urgency) => {
    if (urgency.toLowerCase().includes('emergency')) {
      return 'bg-red-100 border-red-300 text-red-800';
    }
    if (urgency.toLowerCase().includes('urgent')) {
      return 'bg-orange-100 border-orange-300 text-orange-800';
    }
    if (urgency.toLowerCase().includes('routine')) {
      return 'bg-yellow-100 border-yellow-300 text-yellow-800';
    }
    return 'bg-blue-100 border-blue-300 text-blue-800';
  };

  const getUrgencyIcon = (urgency) => {
    if (urgency.toLowerCase().includes('emergency')) {
      return <AlertCircle className="w-5 h-5" />;
    }
    if (urgency.toLowerCase().includes('urgent')) {
      return <AlertTriangle className="w-5 h-5" />;
    }
    return <Info className="w-5 h-5" />;
  };

  const getProbabilityColor = (probability) => {
    if (probability.toLowerCase().includes('high')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (probability.toLowerCase().includes('medium')) {
      return 'bg-orange-100 text-orange-800 border-orange-200';
    }
    if (probability.toLowerCase().includes('low')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fadeIn">
      {/* Urgency Level */}
      <div className={`p-4 rounded-lg border-2 flex items-start gap-3 ${getUrgencyColor(result.urgencyLevel)}`}>
        {getUrgencyIcon(result.urgencyLevel)}
        <div>
          <h3 className="font-semibold mb-1">Urgency Assessment</h3>
          <p className="text-sm">{result.urgencyLevel}</p>
        </div>
      </div>

      {/* Possible Conditions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-600" />
          Possible Conditions
        </h2>
        <div className="space-y-4">
          {result.conditions.map((condition, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{condition.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getProbabilityColor(condition.probability)}`}>
                  {condition.probability}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{condition.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Recommendations
        </h2>
        <ul className="space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <p className="text-sm text-gray-700 leading-relaxed pt-0.5">{recommendation}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Medical Disclaimer */}
      <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-900 mb-2">Important Medical Disclaimer</h3>
            <p className="text-sm text-red-800 leading-relaxed">{result.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
