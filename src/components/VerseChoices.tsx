import type { VerseChoice } from '../lib/verse-choices';

interface Props {
  choices: VerseChoice[];
  onSelect: (choice: VerseChoice) => void;
  disabled: boolean;
}

export default function VerseChoices({ choices, onSelect, disabled }: Props) {
  if (choices.length === 0) {
    return <p className="text-parchment-dark">Generating choices...</p>;
  }

  return (
    <div className="w-full max-w-3xl space-y-3">
      <p className="text-center text-gold text-sm uppercase tracking-widest font-bold mb-2">
        Choose Your Verse
      </p>
      {choices.map((choice, i) => (
        <button
          key={choice.verse.id}
          onClick={() => onSelect(choice)}
          disabled={disabled}
          className="w-full text-left p-4 bg-ink-light/40 border-2 border-gold/20 hover:border-gold/60 hover:bg-ink-light/60 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-gold font-bold text-sm w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-gold font-semibold">
                  {choice.reference}
                </span>
              </div>
              <p className="text-parchment-dark italic text-sm leading-relaxed line-clamp-3 group-hover:text-parchment transition-colors">
                "{choice.verse.t}"
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
