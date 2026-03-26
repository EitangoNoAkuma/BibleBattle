import type { PlayedVerse, Theme } from './types';

type CommentaryContext = {
  player: 'Player' | 'AI Pastor';
  verse: PlayedVerse;
  theme: Theme;
  playerTotal: number;
  aiTotal: number;
  round: number;
  totalRounds: number;
  opponentVerse?: PlayedVerse | null;
};

const highScoreLines = [
  "What a BRILLIANT choice! {player} nails the topic with {ref}!",
  "The crowd goes wild! {player} drops {ref} — a devastating strike!",
  "INCREDIBLE! {ref} hits the theme like divine thunder!",
  "Now THAT'S what I call scripture mastery! {player} unleashes {ref}!",
  "A textbook play! {ref} connects perfectly with '{theme}'!",
  "{player} reaches deep into the Word and pulls out {ref} — MAGNIFICENT!",
];

const midScoreLines = [
  "{player} plays {ref} — a solid move with room for interpretation!",
  "A respectable choice! {ref} touches on '{theme}' nicely.",
  "{player} brings {ref} to the arena — the judges are nodding!",
  "Not bad! {ref} has some strong connections to the debate!",
  "{player} opens their Bible to {ref} — a thoughtful selection.",
];

const lowScoreLines = [
  "Hmm... {player} plays {ref} — a bit of a stretch, wouldn't you say?",
  "{ref}? Bold choice by {player}, but the connection to '{theme}' is thin...",
  "The audience murmurs... {player}'s {ref} doesn't quite hit the mark.",
  "An unconventional pick! {ref} might have hidden depth, but the score says otherwise.",
  "{player} swings with {ref}... and it's a glancing blow at best.",
];

const missLines = [
  "{player} plays {ref}... and it completely misses the topic! Zero points!",
  "Oh no! {ref} has nothing to do with '{theme}'! A total whiff!",
  "The crowd winces as {player}'s {ref} falls flat. Back to Bible study!",
];

const comebackLines = [
  "WHAT A COMEBACK! {player} surges ahead with that play!",
  "The tables have turned! {player} fights back into contention!",
  "From behind to the lead — {player} refuses to go down quietly!",
];

const dominationLines = [
  "{player} extends their commanding lead! Is this match already over?",
  "Total domination! {player} is running away with this battle!",
  "The gap widens! Can anyone stop {player}'s scriptural onslaught?",
];

const tieLines = [
  "We're neck and neck! This battle is going down to the wire!",
  "Dead even! The tension in this arena is ELECTRIC!",
  "Neither side gives an inch! What a contest we have here!",
];

const finalRoundLines = [
  "We're in the FINAL ROUND! Everything comes down to this!",
  "Last chance to make your mark! The final round is HERE!",
  "It all ends here — one last verse to decide the champion!",
];

function pickRandom(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillTemplate(template: string, ctx: CommentaryContext): string {
  return template
    .replace(/\{player\}/g, ctx.player)
    .replace(/\{ref\}/g, ctx.verse.reference)
    .replace(/\{theme\}/g, ctx.theme.name)
    .replace(/\{score\}/g, String(ctx.verse.score));
}

/**
 * Generate commentary for a verse being played.
 */
export function generateCommentary(ctx: CommentaryContext): string[] {
  const lines: string[] = [];

  // Final round announcement
  if (ctx.round === ctx.totalRounds && !ctx.opponentVerse) {
    lines.push(pickRandom(finalRoundLines));
  }

  // Score-based commentary
  let scoreLine: string;
  if (ctx.verse.score === 0) {
    scoreLine = pickRandom(missLines);
  } else if (ctx.verse.score >= 60) {
    scoreLine = pickRandom(highScoreLines);
  } else if (ctx.verse.score >= 30) {
    scoreLine = pickRandom(midScoreLines);
  } else {
    scoreLine = pickRandom(lowScoreLines);
  }
  lines.push(fillTemplate(scoreLine, ctx));

  // Situation commentary (after both players have gone)
  if (ctx.opponentVerse) {
    const scoreDiff = ctx.playerTotal - ctx.aiTotal;
    const wasBehind = ctx.player === 'Player'
      ? (ctx.playerTotal - ctx.verse.score) < ctx.aiTotal
      : (ctx.aiTotal - ctx.verse.score) < ctx.playerTotal;

    if (wasBehind && (ctx.player === 'Player' ? scoreDiff > 0 : scoreDiff < 0)) {
      lines.push(fillTemplate(pickRandom(comebackLines), ctx));
    } else if (Math.abs(scoreDiff) > 80) {
      lines.push(fillTemplate(pickRandom(dominationLines), ctx));
    } else if (Math.abs(scoreDiff) <= 10) {
      lines.push(pickRandom(tieLines));
    }
  }

  return lines;
}
