interface Props {
  playerScore: number;
  aiScore: number;
  round: number;
  totalRounds: number;
}

export default function ScoreBoard({ playerScore, aiScore, round, totalRounds }: Props) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-4 py-3 bg-cream-light rounded-xl border border-wine/20 animate-fade-in">
      <div className="flex items-center gap-3">
        <span className="text-wine font-bold text-sm uppercase">🙏 You</span>
        <span className="text-3xl font-bold text-ink">{playerScore}</span>
      </div>

      <div className="text-center">
        <p className="text-xs text-wine uppercase tracking-widest">⚔️ Round</p>
        <p className="text-xl font-bold text-ink">{round} / {totalRounds}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-ink">{aiScore}</span>
        <span className="text-wine font-bold text-sm uppercase">AI Pastor ⛪</span>
      </div>
    </div>
  );
}
