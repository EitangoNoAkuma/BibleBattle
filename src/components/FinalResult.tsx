import type { RoundState } from '../lib/types';

interface Props {
  playerScore: number;
  aiScore: number;
  rounds: RoundState[];
  onPlayAgain: () => void;
}

export default function FinalResult({ playerScore, aiScore, rounds, onPlayAgain }: Props) {
  const playerWon = playerScore > aiScore;
  const tie = playerScore === aiScore;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-cream">
      <h1 className="text-5xl font-bold mb-4 animate-bounce-in">
        {tie ? (
          <span className="text-ink">🤝 DRAW!</span>
        ) : playerWon ? (
          <span className="text-wine">🏆 VICTORY!</span>
        ) : (
          <span className="text-ink-light">😔 DEFEAT</span>
        )}
      </h1>

      <p className="text-xl text-ink-light mb-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        {tie
          ? 'An evenly matched battle of theological wits!'
          : playerWon
            ? 'Your scriptural knowledge has prevailed!'
            : 'The AI Pastor proved the stronger debater this time.'}
      </p>

      <div className="flex items-center gap-8 my-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="text-center">
          <p className="text-sm text-wine uppercase font-bold">🙏 You</p>
          <p className="text-5xl font-bold text-ink animate-score-reveal">{playerScore}</p>
        </div>
        <div className="text-3xl text-wine">⚔️</div>
        <div className="text-center">
          <p className="text-sm text-wine uppercase font-bold">AI Pastor ⛪</p>
          <p className="text-5xl font-bold text-ink animate-score-reveal" style={{ animationDelay: '0.2s' }}>{aiScore}</p>
        </div>
      </div>

      <div className="w-full max-w-lg mb-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <h3 className="text-wine text-sm uppercase tracking-widest mb-3">📊 Round Breakdown</h3>
        <div className="space-y-2">
          {rounds.map((round, i) => (
            <div key={i} className="flex items-center justify-between bg-cream-light rounded-lg px-4 py-2 text-sm border border-wine/10">
              <span className="text-ink-light truncate mr-4">
                R{round.roundNumber}: {round.theme.description}
              </span>
              <div className="flex gap-4 shrink-0">
                <span className={`font-bold ${(round.playerVerse?.score ?? 0) >= (round.aiVerse?.score ?? 0) ? 'text-wine' : 'text-ink-faint'}`}>
                  {round.playerVerse?.score ?? 0}
                </span>
                <span className="text-ink-faint">-</span>
                <span className={`font-bold ${(round.aiVerse?.score ?? 0) >= (round.playerVerse?.score ?? 0) ? 'text-wine' : 'text-ink-faint'}`}>
                  {round.aiVerse?.score ?? 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="px-10 py-4 bg-wine hover:bg-wine-dark text-cream rounded-lg text-xl font-bold transition-colors cursor-pointer animate-bounce-in animate-pulse-glow"
        style={{ animationDelay: '0.9s' }}
      >
        ⚔️ Play Again
      </button>
    </div>
  );
}
