import type { Theme } from '../lib/types';

interface Props {
  theme: Theme;
  round: number;
  totalRounds: number;
  onContinue: () => void;
}

export default function ThemeReveal({ theme, round, totalRounds, onContinue }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <p className="text-gold text-sm uppercase tracking-widest mb-4">
        Round {round} of {totalRounds}
      </p>

      <h2 className="text-4xl font-bold text-parchment mb-4">
        Today's Debate Topic
      </h2>

      <div className="bg-ink-light/50 border-2 border-gold rounded-xl p-8 max-w-lg mb-8">
        <h3 className="text-3xl font-bold text-gold mb-4">{theme.name}</h3>
        <p className="text-xl text-parchment-dark italic">
          "{theme.description}"
        </p>
      </div>

      <p className="text-parchment-dark mb-8 max-w-md">
        Find a Bible verse that speaks to this topic. The more relevant your
        verse is to the debate, the higher your score!
      </p>

      <button
        onClick={onContinue}
        className="px-10 py-4 bg-gold-dark hover:bg-gold text-ink rounded-lg text-xl font-bold transition-colors cursor-pointer"
      >
        Begin Round
      </button>
    </div>
  );
}
