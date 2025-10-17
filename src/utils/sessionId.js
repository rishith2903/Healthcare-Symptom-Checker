export function getSessionId() {
  let sessionId = localStorage.getItem('symptom_checker_session_id');

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('symptom_checker_session_id', sessionId);
  }

  return sessionId;
}
