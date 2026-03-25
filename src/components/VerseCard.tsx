import type { PlayedVerse } from '../lib/types';
import { getScoreRating } from '../lib/scoring';

interface Props {
  playedVerse: PlayedVerse;
  player: string;
  side: 'left' | 'right';
}

export default function VerseCard({ playedVerse, player, side }: Props) {
  const rating = getScoreRating(playedVerse.score);

  const borderColor = side === 'left' ? 'border-wine/40' : 'border-wine/20';
  const bgColor = side === 'left' ? 'bg-cream-light' : 'bg-cream-dark/30';

  return (
    <div className={`${bgColor} border-2 ${borderColor} rounded-xl p-5 w-full`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-wine uppercase tracking-wide">
          {player}
        </span>
        <span className="text-2xl font-bold text-wine">
          +{playedVerse.score}
          <span className="text-xs ml-1 text-ink-faint">{rating}</span>
        </span>
      </div>

      <p className="text-wine font-semibold text-lg mb-2">
        {playedVerse.reference}
      </p>

      <p className="text-ink-light italic leading-relaxed text-sm">
        "{playedVerse.verse.t}"
      </p>
    </div>
  );
}
