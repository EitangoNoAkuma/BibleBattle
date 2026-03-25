interface Props {
  playerScore: number;
  aiScore: number;
  round: number;
  totalRounds: number;
}

export default function ScoreBoard({ playerScore, aiScore, round, totalRounds }: Props) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto px-4 py-3 bg-ink-light/50 rounded-xl border border-gold/20">
      <div className="flex items-center gap-3">
        <span className="text-battle-blue font-bold text-sm uppercase">You</span>
        <span className="text-3xl font-bold text-parchment">{playerScore}</span>
      </div>

      <div className="text-center">
        <p className="text-xs text-gold uppercase tracking-widest">Round</p>
        <p className="text-xl font-bold text-parchment">{round} / {totalRounds}</p>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-parchment">{aiScore}</span>
        <span className="text-battle-red font-bold text-sm uppercase">AI Pastor</span>
      </div>
    </div>
  );
}
