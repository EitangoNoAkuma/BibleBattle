interface Props {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-6xl font-bold text-wine mb-2 tracking-wider">
          ⚔️ BIBLE BATTLE ⚔️
        </h1>
        <p className="text-2xl text-ink-light">
          Scripture vs Scripture
        </p>
        <div className="mt-4 text-5xl">📖</div>
      </div>

      <p className="max-w-xl text-lg text-ink-light mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
        Debate modern issues with ancient wisdom. Choose Bible verses that best
        speak to each topic. Face the AI Pastor in 3 rounds of scriptural combat!
      </p>

      <button
        onClick={onStart}
        className="px-10 py-4 bg-wine hover:bg-wine-dark text-cream rounded-lg text-xl font-bold transition-colors cursor-pointer animate-bounce-in animate-pulse-glow"
        style={{ animationDelay: '0.4s' }}
      >
        ⚔️ Enter the Arena
      </button>

      <p className="mt-12 text-sm text-ink-faint animate-fade-in" style={{ animationDelay: '0.6s' }}>
        📜 KJV &middot; 66 Books &middot; 31,102 Verses
      </p>
    </div>
  );
}
