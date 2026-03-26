interface Props {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream">
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-wine mb-2 tracking-wider">
          BIBLE BATTLE
        </h1>
        <p className="text-2xl text-ink-light italic">
          Scripture vs Scripture
        </p>
        <div className="mt-4 text-5xl">&#9876;&#65039;</div>
      </div>

      <p className="max-w-xl text-lg text-ink-light mb-12 leading-relaxed">
        Debate modern issues with ancient wisdom. Choose Bible verses that best
        speak to each topic. Face the AI Pastor in 3 rounds of scriptural combat!
      </p>

      <button
        onClick={onStart}
        className="px-10 py-4 bg-wine hover:bg-wine-dark text-cream rounded-lg text-xl font-bold transition-colors cursor-pointer"
      >
        Enter the Arena
      </button>

      <p className="mt-12 text-sm text-ink-faint">
        KJV &middot; 66 Books &middot; 31,102 Verses
      </p>
    </div>
  );
}
