import { useState } from "react";
import { createClient } from "../lib/supabase.js";

export function useSymptomAnalysis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function analyze(symptoms, sessionId) {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      // Call Supabase function 'analyze-symptoms' via RPC or edge function
      const res = await supabase
        .from("symptom_queries")
        .insert({ symptoms, session_id: sessionId })
        .select("*");
      setLoading(false);
      return res;
    } catch (err) {
      setError(err?.message ?? "Unknown error");
      setLoading(false);
      throw err;
    }
  }

  return { analyze, loading, error };
}
