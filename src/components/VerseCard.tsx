import type { PlayedVerse } from '../lib/types';
import { getScoreRating } from '../lib/scoring';

interface Props {
  playedVerse: PlayedVerse;
  player: string;
  side: 'left' | 'right';
}

export default function VerseCard({ playedVerse, player, side }: Props) {
  const rating = getScoreRating(playedVerse.score);

  const borderColor = side === 'left' ? 'border-battle-blue' : 'border-battle-red';
  const bgColor = side === 'left' ? 'bg-battle-blue/20' : 'bg-battle-red/20';
  const scoreColor = playedVerse.score >= 60
    ? 'text-gold'
    : playedVerse.score >= 30
      ? 'text-parchment'
      : 'text-red-400';

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-xl p-5 w-full`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-parchment uppercase tracking-wide">
          {player}
        </span>
        <span className={`text-2xl font-bold ${scoreColor}`}>
          +{playedVerse.score}
          <span className="text-xs ml-1 opacity-70">{rating}</span>
        </span>
      </div>

      <p className="text-gold font-semibold text-lg mb-2">
        {playedVerse.reference}
      </p>

      <p className="text-parchment-dark italic leading-relaxed text-sm">
        "{playedVerse.verse.t}"
      </p>
    </div>
  );
}
