const API_BASE = 'http://localhost:3001/api';

export interface ScoreResult {
  score: number;
  reason: string;
}

export interface CommentaryResult {
  lines: string[];
}

export async function fetchLLMScore(
  verseText: string,
  verseReference: string,
  themeName: string,
  themeDescription: string,
): Promise<ScoreResult> {
  const res = await fetch(`${API_BASE}/score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ verseText, verseReference, themeName, themeDescription }),
  });
  if (!res.ok) throw new Error('Scoring request failed');
  return res.json();
}

export async function fetchLLMCommentary(params: {
  player: string;
  verseReference: string;
  verseText: string;
  score: number;
  scoreReason: string;
  themeName: string;
  themeDescription: string;
  playerTotal: number;
  aiTotal: number;
  round: number;
  totalRounds: number;
  isSecondPlayer: boolean;
}): Promise<CommentaryResult> {
  const res = await fetch(`${API_BASE}/commentary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error('Commentary request failed');
  return res.json();
}
