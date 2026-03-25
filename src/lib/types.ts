export interface BibleVerse {
  id: string;
  b: number;   // book number (1-66)
  c: number;   // chapter
  v: number;   // verse
  t: string;   // text
}

export interface BookInfo {
  number: number;
  name: string;         // full name e.g. "Genesis"
  abbrev: string;       // primary abbreviation e.g. "Gen"
  aliases: string[];    // all aliases
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  keywords: string[];
  proKeywords: string[];   // keywords supporting the "pro" side
  conKeywords: string[];   // keywords supporting the "con" side
}

export interface PlayedVerse {
  verse: BibleVerse;
  bookName: string;
  score: number;
  reference: string;   // e.g. "John 3:16"
}

export interface RoundState {
  roundNumber: number;
  theme: Theme;
  playerVerse: PlayedVerse | null;
  aiVerse: PlayedVerse | null;
  commentary: string[];
}

export interface GameState {
  phase: 'title' | 'theme-reveal' | 'player-turn' | 'ai-turn' | 'round-result' | 'final-result';
  currentRound: number;
  totalRounds: number;
  theme: Theme | null;
  playerScore: number;
  aiScore: number;
  rounds: RoundState[];
  usedVerseIds: Set<string>;
  difficulty: 'easy' | 'normal' | 'hard';
}

export type GameAction =
  | { type: 'START_GAME'; difficulty: GameState['difficulty'] }
  | { type: 'REVEAL_THEME'; theme: Theme }
  | { type: 'PLAYER_SUBMIT'; verse: PlayedVerse }
  | { type: 'AI_SUBMIT'; verse: PlayedVerse }
  | { type: 'SHOW_ROUND_RESULT' }
  | { type: 'NEXT_ROUND'; theme: Theme }
  | { type: 'END_GAME' }
  | { type: 'ADD_COMMENTARY'; text: string }
  | { type: 'RESET' };
