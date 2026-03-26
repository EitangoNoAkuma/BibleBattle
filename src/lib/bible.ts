import type { BibleVerse } from './types';
import { bookLookup, bookByNumber } from '../data/books';
import bibleData from '../../t_kjv.json';

// Index verses by "b:c:v" for O(1) lookup
const verseMap = new Map<string, BibleVerse>();
const versesByBook = new Map<number, BibleVerse[]>();

(bibleData as BibleVerse[]).forEach(v => {
  const verse: BibleVerse = {
    id: v.id,
    b: Number(v.b),
    c: Number(v.c),
    v: Number(v.v),
    t: v.t,
  };
  verseMap.set(`${verse.b}:${verse.c}:${verse.v}`, verse);

  if (!versesByBook.has(verse.b)) {
    versesByBook.set(verse.b, []);
  }
  versesByBook.get(verse.b)!.push(verse);
});

export interface ParsedReference {
  bookNumber: number;
  bookName: string;
  chapter: number;
  verse: number;
}

/**
 * Parse a reference like "John 3:16" or "1 Cor 13:4" into structured data.
 */
export function parseReference(input: string): ParsedReference | null {
  const trimmed = input.trim();
  // Match patterns like: "John 3:16", "1 Cor 13:4", "Genesis 1:1"
  // Book name may start with a number prefix like "1 ", "2 ", "3 "
  const match = trimmed.match(/^(\d?\s*\w[\w\s]*?)\s+(\d+)\s*:\s*(\d+)$/i);
  if (!match) return null;

  const bookInput = match[1].trim();
  const chapter = parseInt(match[2], 10);
  const verse = parseInt(match[3], 10);

  const bookNumber = bookLookup.get(bookInput.toLowerCase());
  if (!bookNumber) return null;

  const bookInfo = bookByNumber.get(bookNumber);
  if (!bookInfo) return null;

  return { bookNumber, bookName: bookInfo.name, chapter, verse };
}

/**
 * Look up a verse by parsed reference.
 */
export function getVerse(ref: ParsedReference): BibleVerse | null {
  return verseMap.get(`${ref.bookNumber}:${ref.chapter}:${ref.verse}`) ?? null;
}

/**
 * Look up a verse directly by reference string.
 */
export function lookupVerse(input: string): { verse: BibleVerse; bookName: string; reference: string } | null {
  const ref = parseReference(input);
  if (!ref) return null;

  const verse = getVerse(ref);
  if (!verse) return null;

  return {
    verse,
    bookName: ref.bookName,
    reference: `${ref.bookName} ${ref.chapter}:${ref.verse}`,
  };
}

/**
 * Get all verses for a specific book.
 */
export function getVersesForBook(bookNumber: number): BibleVerse[] {
  return versesByBook.get(bookNumber) ?? [];
}

/**
 * Get all verses (used by AI to search).
 */
export function getAllVerses(): BibleVerse[] {
  return bibleData as BibleVerse[];
}

/**
 * Format a verse reference string from a BibleVerse object.
 */
export function formatReference(verse: BibleVerse): string {
  const book = bookByNumber.get(verse.b);
  return book ? `${book.name} ${verse.c}:${verse.v}` : `Book${verse.b} ${verse.c}:${verse.v}`;
}
