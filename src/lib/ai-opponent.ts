import type { BibleVerse, Theme, GameState } from './types';
import { getAllVerses, formatReference } from './bible';
import { scoreVerse } from './scoring';
import { bookByNumber } from '../data/books';

interface ScoredVerse {
  verse: BibleVerse;
  score: number;
}

// Pre-compute scored verses for a theme (cached)
const themeCache = new Map<string, ScoredVerse[]>();

function getScoredVerses(theme: Theme): ScoredVerse[] {
  if (themeCache.has(theme.id)) {
    return themeCache.get(theme.id)!;
  }

  const allVerses = getAllVerses();
  const scored: ScoredVerse[] = [];

  for (const v of allVerses) {
    const verse: BibleVerse = {
      id: v.id,
      b: Number(v.b),
      c: Number(v.c),
      v: Number(v.v),
      t: v.t,
    };
    const score = scoreVerse(verse, theme);
    if (score > 0) {
      scored.push({ verse, score });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  themeCache.set(theme.id, scored);
  return scored;
}

/**
 * AI selects a verse based on difficulty and theme.
 */
export function aiSelectVerse(
  theme: Theme,
  gameState: GameState,
): { verse: BibleVerse; score: number; bookName: string; reference: string } | null {
  const scored = getScoredVerses(theme);
  if (scored.length === 0) return null;

  // Filter out already used verses
  const available = scored.filter(sv => !gameState.usedVerseIds.has(sv.verse.id));
  if (available.length === 0) return null;

  let pickIndex: number;

  switch (gameState.difficulty) {
    case 'easy': {
      // Pick from top 60-100% range (weaker verses)
      const start = Math.floor(available.length * 0.6);
      pickIndex = start + Math.floor(Math.random() * (available.length - start));
      break;
    }
    case 'normal': {
      // Pick from top 20-60% range
      const start = Math.floor(available.length * 0.2);
      const end = Math.floor(available.length * 0.6);
      pickIndex = start + Math.floor(Math.random() * (end - start));
      break;
    }
    case 'hard': {
      // Pick from top 10 with slight randomness
      pickIndex = Math.floor(Math.random() * Math.min(10, available.length));
      break;
    }
  }

  pickIndex = Math.min(pickIndex, available.length - 1);
  const pick = available[pickIndex];

  const book = bookByNumber.get(pick.verse.b);
  const bookName = book ? book.name : `Book ${pick.verse.b}`;
  const reference = formatReference(pick.verse);

  return {
    verse: pick.verse,
    score: pick.score,
    bookName,
    reference,
  };
}
