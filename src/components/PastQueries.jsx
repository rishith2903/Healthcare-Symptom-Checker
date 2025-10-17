import { useState, useEffect } from 'react';
import { History, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { getSessionId } from '../utils/sessionId.js';

/**
 * @param {Object} props
 * @param {number} props.refreshTrigger - Trigger to refresh the queries list
 */
export function PastQueries({ refreshTrigger }) {
  const [queries, setQueries] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [refreshTrigger]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const sessionId = getSessionId();

      const { data, error } = await supabase
        .from('symptom_queries')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setQueries(data || []);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (queries.length === 0) {
    return (
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <History className="w-6 h-6 text-blue-600" />
          Query History
        </h2>
        <p className="text-gray-600 text-center py-8">No previous queries found. Start by analyzing your symptoms above.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <History className="w-6 h-6 text-blue-600" />
        Query History
      </h2>
      <div className="space-y-3">
        {queries.map((query) => (
          <div key={query.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedId(expandedId === query.id ? null : query.id)}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-150 flex items-center justify-between"
            >
              <div className="flex items-start gap-3 flex-1 text-left">
                <Clock className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {query.symptoms.substring(0, 100)}{query.symptoms.length > 100 ? '...' : ''}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(query.created_at)}</p>
                </div>
              </div>
              {expandedId === query.id ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>

            {expandedId === query.id && (
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Symptoms Described:</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{query.symptoms}</p>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Possible Conditions:</h4>
                  <div className="space-y-2">
                    {query.analysis_result.conditions.map((condition, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="font-medium text-gray-800">{condition.name}</span>
                        <span className="text-gray-500 ml-2">({condition.probability})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Urgency Level:</h4>
                  <p className="text-sm text-gray-600">{query.analysis_result.urgencyLevel}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
