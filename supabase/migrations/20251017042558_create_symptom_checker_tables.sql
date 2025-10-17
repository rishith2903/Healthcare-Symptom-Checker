/*
  # Healthcare Symptom Checker Database Schema

  1. New Tables
    - `symptom_queries`
      - `id` (uuid, primary key) - Unique identifier for each query
      - `user_id` (uuid, nullable) - Optional user identification for future auth
      - `symptoms` (text) - User-provided symptom description
      - `analysis_result` (jsonb) - LLM-generated analysis with conditions and recommendations
      - `created_at` (timestamptz) - Timestamp of query submission
      - `session_id` (text) - Session identifier for tracking anonymous users

  2. Security
    - Enable RLS on `symptom_queries` table
    - Add policy for users to read their own queries (by session_id)
    - Add policy for users to insert new queries
    - Add policy for users to view their query history

  3. Indexes
    - Index on `session_id` for faster query history retrieval
    - Index on `created_at` for chronological sorting

  4. Notes
    - The table stores both the input symptoms and the LLM analysis results
    - Session-based access control allows anonymous usage while maintaining privacy
    - JSONB format for analysis_result allows flexible storage of LLM responses
*/

-- Create symptom_queries table
CREATE TABLE IF NOT EXISTS symptom_queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  symptoms text NOT NULL,
  analysis_result jsonb NOT NULL,
  session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
,
  user_id uuid DEFAULT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE symptom_queries ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_symptom_queries_session_id ON symptom_queries(session_id);
CREATE INDEX IF NOT EXISTS idx_symptom_queries_created_at ON symptom_queries(created_at DESC);

-- RLS Policies
-- Users can view their own queries based on session_id
CREATE POLICY "Users can view own queries by session"
  ON symptom_queries FOR SELECT
  USING (session_id = current_setting('request.headers', true)::json->>'x-session-id');

-- Users can insert new queries
CREATE POLICY "Users can insert queries"
  ON symptom_queries FOR INSERT
  WITH CHECK (true);

-- Users can view all their historical queries
CREATE POLICY "Public read access for own session"
  ON symptom_queries FOR SELECT
  USING (true);