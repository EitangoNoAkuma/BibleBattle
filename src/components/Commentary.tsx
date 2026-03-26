interface Props {
  lines: string[];
}

export default function Commentary({ lines }: Props) {
  if (lines.length === 0) return null;

  return (
    <div className="w-full max-w-2xl bg-cream-light border border-wine/20 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">📡</span>
        <span className="text-wine text-xs uppercase tracking-widest font-bold">
          Live Commentary
        </span>
      </div>
      <div className="space-y-2">
        {lines.map((line, i) => {
          const isReporterA = i % 2 === 0;
          return (
            <div key={i} className="flex gap-2 items-start animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <span className={`text-xs font-bold uppercase shrink-0 mt-0.5 ${isReporterA ? 'text-wine' : 'text-ink-light'}`}>
                {isReporterA ? '🎙️ Mike:' : '🗣️ Dave:'}
              </span>
              <p className="text-ink text-sm leading-relaxed">
                {line}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
