import type { BibleVerse, Theme } from './types';

/**
 * Score a verse against a theme based on keyword matching.
 * Returns a score from 0-100.
 */
export function scoreVerse(verse: BibleVerse, theme: Theme): number {
  const text = verse.t.toLowerCase();
  const words = text.split(/\s+/);

  // Count keyword matches
  let totalHits = 0;
  let uniqueHits = 0;

  for (const keyword of theme.keywords) {
    const kw = keyword.toLowerCase();
    const hits = words.filter(w => w.includes(kw)).length;
    if (hits > 0) {
      totalHits += hits;
      uniqueHits++;
    }
  }

  // Also check pro and con keywords for bonus
  let sideBonus = 0;
  const allSideKeywords = [...theme.proKeywords, ...theme.conKeywords];
  for (const keyword of allSideKeywords) {
    const kw = keyword.toLowerCase();
    if (words.some(w => w.includes(kw))) {
      sideBonus += 3;
    }
  }

  if (totalHits === 0 && sideBonus === 0) return 0;

  // Base score: keyword hits * 10
  let score = totalHits * 10;

  // Unique keyword diversity bonus: +5 per unique keyword
  score += uniqueHits * 5;

  // Side keyword bonus
  score += sideBonus;

  // Normalize by verse length to avoid long verse advantage
  const lengthFactor = Math.min(1, 20 / words.length);
  score = score * (0.5 + 0.5 * lengthFactor);

  // Clamp to 0-100
  return Math.min(100, Math.max(0, Math.round(score)));
}

/**
 * Get a rating label for a score.
 */
export function getScoreRating(score: number): string {
  if (score >= 80) return 'DIVINE';
  if (score >= 60) return 'POWERFUL';
  if (score >= 40) return 'SOLID';
  if (score >= 20) return 'DECENT';
  if (score > 0) return 'WEAK';
  return 'MISS';
}
