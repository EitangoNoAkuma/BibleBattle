import { useState, useMemo } from 'react';
import { lookupVerse } from '../lib/bible';
import { books } from '../data/books';

interface Props {
  onSubmit: (reference: string) => void;
  disabled: boolean;
}

export default function VerseInput({ onSubmit, disabled }: Props) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const preview = useMemo(() => {
    if (input.trim().length < 3) return null;
    return lookupVerse(input.trim());
  }, [input]);

  const suggestions = useMemo(() => {
    const parts = input.trim().toLowerCase();
    if (parts.length < 2 || parts.includes(':')) return [];
    return books
      .filter(b =>
        b.name.toLowerCase().startsWith(parts) ||
        b.abbrev.toLowerCase().startsWith(parts) ||
        b.aliases.some(a => a.startsWith(parts))
      )
      .slice(0, 5);
  }, [input]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (disabled) return;

    const result = lookupVerse(input.trim());
    if (!result) {
      setError('Verse not found. Try format: "John 3:16" or "Gen 1:1"');
      return;
    }
    setError('');
    setInput('');
    onSubmit(input.trim());
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(''); }}
            placeholder='Type a verse reference (e.g. "Romans 13:1")'
            disabled={disabled}
            className="w-full px-4 py-3 bg-parchment text-ink rounded-lg text-lg outline-none focus:ring-2 focus:ring-gold disabled:opacity-50"
          />
          {suggestions.length > 0 && !preview && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-parchment text-ink rounded-lg shadow-lg z-10 overflow-hidden">
              {suggestions.map(b => (
                <button
                  key={b.number}
                  type="button"
                  onClick={() => setInput(b.name + ' ')}
                  className="w-full px-4 py-2 text-left hover:bg-parchment-dark cursor-pointer text-sm"
                >
                  {b.name} <span className="text-ink-light">({b.abbrev})</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="px-6 py-3 bg-gold-dark hover:bg-gold text-ink font-bold rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
        >
          Cite!
        </button>
      </form>

      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}

      {preview && (
        <div className="mt-3 p-4 bg-ink-light/30 border border-gold/30 rounded-lg">
          <p className="text-gold text-sm font-semibold mb-1">
            {preview.reference}
          </p>
          <p className="text-parchment-dark text-sm italic leading-relaxed">
            "{preview.verse.t}"
          </p>
        </div>
      )}
    </div>
  );
}
