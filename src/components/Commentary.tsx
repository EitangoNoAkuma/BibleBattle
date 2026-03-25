interface Props {
  lines: string[];
}

export default function Commentary({ lines }: Props) {
  if (lines.length === 0) return null;

  return (
    <div className="w-full max-w-2xl bg-ink-light/30 border border-gold/30 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">&#127908;</span>
        <span className="text-gold text-xs uppercase tracking-widest font-bold">
          Live Commentary
        </span>
      </div>
      {lines.map((line, i) => (
        <p key={i} className="text-parchment italic text-sm leading-relaxed mb-1 last:mb-0">
          {line}
        </p>
      ))}
    </div>
  );
}
