import type { GameState } from '../lib/types';

interface Props {
  onStart: (difficulty: GameState['difficulty']) => void;
}

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-gold mb-2 tracking-wider">
          BIBLE BATTLE
        </h1>
        <p className="text-2xl text-parchment-dark italic">
          Scripture vs Scripture
        </p>
        <div className="mt-4 text-5xl">&#9876;&#65039;</div>
      </div>

      <p className="max-w-xl text-lg text-parchment-dark mb-12 leading-relaxed">
        Debate modern issues with ancient wisdom. Cite Bible verses that best
        support your argument on each topic. Face the AI Pastor in 5 rounds
        of scriptural combat!
      </p>

      <div className="flex flex-col gap-4 w-64">
        <p className="text-sm text-gold uppercase tracking-widest mb-2">
          Select Difficulty
        </p>
        <button
          onClick={() => onStart('easy')}
          className="px-8 py-3 bg-green-800 hover:bg-green-700 text-parchment rounded-lg text-lg font-semibold transition-colors cursor-pointer"
        >
          Novice
        </button>
        <button
          onClick={() => onStart('normal')}
          className="px-8 py-3 bg-gold-dark hover:bg-gold text-ink rounded-lg text-lg font-semibold transition-colors cursor-pointer"
        >
          Scholar
        </button>
        <button
          onClick={() => onStart('hard')}
          className="px-8 py-3 bg-battle-red hover:bg-red-700 text-parchment rounded-lg text-lg font-semibold transition-colors cursor-pointer"
        >
          Theologian
        </button>
      </div>

      <p className="mt-12 text-sm text-ink-light">
        KJV &middot; 66 Books &middot; 31,102 Verses
      </p>
    </div>
  );
}
