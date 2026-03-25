import type { BibleVerse, Theme, GameState } from './types';
import { getAllVerses, formatReference } from './bible';
import { scoreVerse } from './scoring';
import { bookByNumber } from '../data/books';

export interface VerseChoice {
  verse: BibleVerse;
  reference: string;
  bookName: string;
  keywordScore: number; // pre-computed keyword score for hint display
}

/**
 * Generate 3 verse choices for the player with varying relevance levels.
 * One strong pick, one medium, one weak/wildcard — shuffled randomly.
 */
export function generateVerseChoices(
  theme: Theme,
  usedVerseIds: Set<string>,
): VerseChoice[] {
  const allVerses = getAllVerses();

  // Score all verses by keyword match and bucket them
  const strong: { verse: BibleVerse; score: number }[] = [];
  const medium: { verse: BibleVerse; score: number }[] = [];
  const weak: { verse: BibleVerse; score: number }[] = [];

  for (const raw of allVerses) {
    const verse: BibleVerse = {
      id: raw.id,
      b: Number(raw.b),
      c: Number(raw.c),
      v: Number(raw.v),
      t: raw.t,
    };

    if (usedVerseIds.has(verse.id)) continue;
    // Skip very short verses (less interesting)
    if (verse.t.split(/\s+/).length < 6) continue;

    const score = scoreVerse(verse, theme);
    if (score >= 40) strong.push({ verse, score });
    else if (score >= 15) medium.push({ verse, score });
    else if (score > 0) weak.push({ verse, score });
  }

  const choices: VerseChoice[] = [];

  // Pick one from each bucket (with randomness)
  const pickFrom = (arr: { verse: BibleVerse; score: number }[], topN: number) => {
    if (arr.length === 0) return null;
    // Pick randomly from top N entries
    const pool = arr.slice(0, Math.min(topN, arr.length));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return pick;
  };

  // Sort each bucket by score descending
  strong.sort((a, b) => b.score - a.score);
  medium.sort((a, b) => b.score - a.score);
  weak.sort((a, b) => b.score - a.score);

  const strongPick = pickFrom(strong, 50);
  const mediumPick = pickFrom(medium, 100);
  const weakPick = pickFrom(weak, 200);

  const toChoice = (pick: { verse: BibleVerse; score: number }): VerseChoice => {
    const book = bookByNumber.get(pick.verse.b);
    return {
      verse: pick.verse,
      reference: formatReference(pick.verse),
      bookName: book?.name ?? `Book ${pick.verse.b}`,
      keywordScore: pick.score,
    };
  };

  if (strongPick) choices.push(toChoice(strongPick));
  if (mediumPick) choices.push(toChoice(mediumPick));
  if (weakPick) choices.push(toChoice(weakPick));

  // If we don't have 3, fill from any available bucket
  while (choices.length < 3) {
    const fallbackPool = [...strong, ...medium, ...weak].filter(
      sv => !choices.some(c => c.verse.id === sv.verse.id)
    );
    if (fallbackPool.length === 0) break;
    const pick = fallbackPool[Math.floor(Math.random() * Math.min(50, fallbackPool.length))];
    choices.push(toChoice(pick));
  }

  // Shuffle so player doesn't know which is "best"
  for (let i = choices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[j]] = [choices[j], choices[i]];
  }

  return choices;
}
