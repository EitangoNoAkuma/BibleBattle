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
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-5xl font-bold mb-4">
        {tie ? (
          <span className="text-gold">DRAW!</span>
        ) : playerWon ? (
          <span className="text-gold">VICTORY!</span>
        ) : (
          <span className="text-battle-red">DEFEAT</span>
        )}
      </h1>

      <p className="text-xl text-parchment-dark mb-2">
        {tie
          ? 'An evenly matched battle of theological wits!'
          : playerWon
            ? 'Your scriptural knowledge has prevailed!'
            : 'The AI Pastor proved the stronger debater this time.'}
      </p>

      {/* Score summary */}
      <div className="flex items-center gap-8 my-8">
        <div className="text-center">
          <p className="text-sm text-battle-blue uppercase font-bold">You</p>
          <p className="text-5xl font-bold text-parchment">{playerScore}</p>
        </div>
        <div className="text-3xl text-gold">vs</div>
        <div className="text-center">
          <p className="text-sm text-battle-red uppercase font-bold">AI Pastor</p>
          <p className="text-5xl font-bold text-parchment">{aiScore}</p>
        </div>
      </div>

      {/* Round breakdown */}
      <div className="w-full max-w-lg mb-8">
        <h3 className="text-gold text-sm uppercase tracking-widest mb-3">Round Breakdown</h3>
        <div className="space-y-2">
          {rounds.map((round, i) => (
            <div key={i} className="flex items-center justify-between bg-ink-light/30 rounded-lg px-4 py-2 text-sm">
              <span className="text-parchment-dark">
                R{round.roundNumber}: {round.theme.name}
              </span>
              <div className="flex gap-4">
                <span className={`font-bold ${(round.playerVerse?.score ?? 0) >= (round.aiVerse?.score ?? 0) ? 'text-gold' : 'text-parchment-dark'}`}>
                  {round.playerVerse?.score ?? 0}
                </span>
                <span className="text-parchment-dark">-</span>
                <span className={`font-bold ${(round.aiVerse?.score ?? 0) >= (round.playerVerse?.score ?? 0) ? 'text-gold' : 'text-parchment-dark'}`}>
                  {round.aiVerse?.score ?? 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onPlayAgain}
        className="px-10 py-4 bg-gold-dark hover:bg-gold text-ink rounded-lg text-xl font-bold transition-colors cursor-pointer"
      >
        Play Again
      </button>
    </div>
  );
}
