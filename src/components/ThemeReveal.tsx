import type { Theme } from '../lib/types';

interface Props {
  theme: Theme;
  round: number;
  totalRounds: number;
  onContinue: () => void;
}

export default function ThemeReveal({ theme, round, totalRounds, onContinue }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream">
      <p className="text-wine text-sm uppercase tracking-widest mb-4">
        Round {round} of {totalRounds}
      </p>

      <h2 className="text-4xl font-bold text-ink mb-6">
        Today's Debate Topic
      </h2>

      <div className="bg-cream-light border-2 border-wine/30 rounded-xl p-8 max-w-lg mb-8">
        <p className="text-2xl text-ink italic leading-relaxed">
          "{theme.description}"
        </p>
      </div>

      <button
        onClick={onContinue}
        className="px-10 py-4 bg-wine hover:bg-wine-dark text-cream rounded-lg text-xl font-bold transition-colors cursor-pointer"
      >
        Begin Round
      </button>
    </div>
  );
}
