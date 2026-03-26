import type { VerseChoice } from '../lib/verse-choices';

interface Props {
  choices: VerseChoice[];
  onSelect: (choice: VerseChoice) => void;
  disabled: boolean;
}

export default function VerseChoices({ choices, onSelect, disabled }: Props) {
  if (choices.length === 0) {
    return <p className="text-ink-faint">Generating choices...</p>;
  }

  return (
    <div className="w-full max-w-3xl space-y-3">
      <p className="text-center text-wine text-sm uppercase tracking-widest font-bold mb-2 animate-fade-in">
        📜 Choose Your Verse
      </p>
      {choices.map((choice, i) => (
        <button
          key={choice.verse.id}
          onClick={() => onSelect(choice)}
          disabled={disabled}
          className="w-full text-left p-4 bg-cream-light border-2 border-wine/15 hover:border-wine/50 hover:bg-cream-dark/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group animate-fade-in-up"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-cream text-sm w-6 h-6 rounded-full bg-wine flex items-center justify-center font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-wine font-semibold">
                  {choice.reference}
                </span>
              </div>
              <p className="text-ink-light text-sm leading-relaxed line-clamp-3 group-hover:text-ink transition-colors">
                "{choice.verse.t}"
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
