import { useReducer, useCallback, useEffect, useState } from 'react';
import type { PlayedVerse } from '../lib/types';
import { gameReducer, initialGameState } from '../lib/gameReducer';
import { aiSelectVerse } from '../lib/ai-opponent';
import { themes } from '../data/themes';
import { generateVerseChoices } from '../lib/verse-choices';
import type { VerseChoice } from '../lib/verse-choices';
import { fetchLLMScore, fetchLLMCommentary, getApiKey } from '../lib/api';
import ApiKeySetup from './ApiKeySetup';
import TitleScreen from './TitleScreen';
import ScoreBoard from './ScoreBoard';
import VerseChoices from './VerseChoices';
import VerseCard from './VerseCard';
import Commentary from './Commentary';
import FinalResult from './FinalResult';

function pickRandomTheme(usedThemeIds: Set<string>) {
  const available = themes.filter(t => !usedThemeIds.has(t.id));
  if (available.length === 0) return themes[Math.floor(Math.random() * themes.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export default function BattleArena() {
  const [hasApiKey, setHasApiKey] = useState(!!getApiKey());
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [usedThemeIds, setUsedThemeIds] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [verseChoices, setVerseChoices] = useState<VerseChoice[]>([]);
  const [scoreReason, setScoreReason] = useState('');

  const currentRound = state.rounds[state.rounds.length - 1] ?? null;

  // Generate verse choices when it's the player's turn
  useEffect(() => {
    if (state.phase === 'player-turn' && state.theme) {
      const choices = generateVerseChoices(state.theme, state.usedVerseIds);
      setVerseChoices(choices);
    }
  }, [state.phase, state.theme, state.currentRound]);

  const handleStart = useCallback(() => {
    dispatch({ type: 'START_GAME' });
    const theme = pickRandomTheme(new Set());
    setUsedThemeIds(new Set([theme.id]));
    dispatch({ type: 'REVEAL_THEME', theme });
  }, []);

  const handlePlayerSelect = useCallback(async (choice: VerseChoice) => {
    if (!state.theme || isProcessing) return;
    setIsProcessing(true);

    try {
      const scoreResult = await fetchLLMScore(
        choice.verse.t,
        choice.reference,
        state.theme.name,
        state.theme.description,
      );

      setScoreReason(scoreResult.reason);

      const played: PlayedVerse = {
        verse: choice.verse,
        bookName: choice.bookName,
        score: scoreResult.score,
        reference: choice.reference,
      };

      dispatch({ type: 'PLAYER_SUBMIT', verse: played });

      const commentaryResult = await fetchLLMCommentary({
        player: 'Player',
        verseReference: choice.reference,
        verseText: choice.verse.t,
        score: scoreResult.score,
        scoreReason: scoreResult.reason,
        themeName: state.theme.name,
        themeDescription: state.theme.description,
        playerTotal: state.playerScore + scoreResult.score,
        aiTotal: state.aiScore,
        round: state.currentRound,
        totalRounds: state.totalRounds,
        isSecondPlayer: false,
      });

      commentaryResult.lines.forEach(text =>
        dispatch({ type: 'ADD_COMMENTARY', text })
      );
    } catch (err) {
      console.error('Player turn error:', err);
      const played: PlayedVerse = {
        verse: choice.verse,
        bookName: choice.bookName,
        score: choice.keywordScore,
        reference: choice.reference,
      };
      dispatch({ type: 'PLAYER_SUBMIT', verse: played });
      dispatch({ type: 'ADD_COMMENTARY', text: `Player cites ${choice.reference}!` });
      dispatch({ type: 'ADD_COMMENTARY', text: `Let's see how that connects to the topic.` });
    } finally {
      setIsProcessing(false);
    }
  }, [state.theme, state.playerScore, state.aiScore, state.currentRound, state.totalRounds, isProcessing]);

  // AI turn
  useEffect(() => {
    if (state.phase !== 'ai-turn' || !state.theme) return;

    let cancelled = false;
    setIsProcessing(true);

    const runAiTurn = async () => {
      await new Promise(r => setTimeout(r, 1000));
      if (cancelled) return;

      const aiResult = aiSelectVerse(state.theme!, state);
      if (!aiResult || cancelled) {
        setIsProcessing(false);
        return;
      }

      try {
        const scoreResult = await fetchLLMScore(
          aiResult.verse.t,
          aiResult.reference,
          state.theme!.name,
          state.theme!.description,
        );

        if (cancelled) return;

        const played: PlayedVerse = {
          verse: aiResult.verse,
          bookName: aiResult.bookName,
          score: scoreResult.score,
          reference: aiResult.reference,
        };

        dispatch({ type: 'AI_SUBMIT', verse: played });

        const commentaryResult = await fetchLLMCommentary({
          player: 'AI Pastor',
          verseReference: aiResult.reference,
          verseText: aiResult.verse.t,
          score: scoreResult.score,
          scoreReason: scoreResult.reason,
          themeName: state.theme!.name,
          themeDescription: state.theme!.description,
          playerTotal: state.playerScore,
          aiTotal: state.aiScore + scoreResult.score,
          round: state.currentRound,
          totalRounds: state.totalRounds,
          isSecondPlayer: true,
        });

        if (!cancelled) {
          commentaryResult.lines.forEach(text =>
            dispatch({ type: 'ADD_COMMENTARY', text })
          );
        }
      } catch (err) {
        console.error('AI turn error:', err);
        if (!cancelled) {
          const played: PlayedVerse = {
            verse: aiResult.verse,
            bookName: aiResult.bookName,
            score: aiResult.score,
            reference: aiResult.reference,
          };
          dispatch({ type: 'AI_SUBMIT', verse: played });
          dispatch({ type: 'ADD_COMMENTARY', text: `AI Pastor responds with ${aiResult.reference}!` });
          dispatch({ type: 'ADD_COMMENTARY', text: `A bold counter-move indeed.` });
        }
      } finally {
        if (!cancelled) setIsProcessing(false);
      }
    };

    runAiTurn();
    return () => { cancelled = true; };
  }, [state.phase]);

  const handleNextRound = useCallback(() => {
    if (state.currentRound >= state.totalRounds) {
      dispatch({ type: 'END_GAME' });
      return;
    }
    const theme = pickRandomTheme(usedThemeIds);
    setUsedThemeIds(prev => new Set([...prev, theme.id]));
    setScoreReason('');
    dispatch({ type: 'NEXT_ROUND', theme });
  }, [state.currentRound, state.totalRounds, usedThemeIds]);

  // API key setup
  if (!hasApiKey) {
    return <ApiKeySetup onReady={() => setHasApiKey(true)} />;
  }

  // Title screen
  if (state.phase === 'title') {
    return <TitleScreen onStart={handleStart} />;
  }

  // Final result
  if (state.phase === 'final-result') {
    return (
      <FinalResult
        playerScore={state.playerScore}
        aiScore={state.aiScore}
        rounds={state.rounds}
        onPlayAgain={() => dispatch({ type: 'RESET' })}
      />
    );
  }

  // Main battle view
  return (
    <div className="flex-1 flex flex-col items-center gap-4 p-4 max-w-4xl mx-auto w-full">
      <ScoreBoard
        playerScore={state.playerScore}
        aiScore={state.aiScore}
        round={state.currentRound}
        totalRounds={state.totalRounds}
      />

      {/* Topic — description only */}
      {state.theme && (
        <div className="text-center animate-fade-in">
          <p className="text-xs text-wine uppercase tracking-widest mb-1">🏷️ Topic</p>
          <p className="text-xl text-ink whitespace-nowrap">
            "{state.theme.description}"
          </p>
        </div>
      )}

      {/* Verses played this round */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {currentRound?.playerVerse && (
          <VerseCard
            playedVerse={currentRound.playerVerse}
            player="You"
            side="left"
          />
        )}
        {currentRound?.aiVerse && (
          <VerseCard
            playedVerse={currentRound.aiVerse}
            player="AI Pastor"
            side="right"
          />
        )}
      </div>

      {/* Processing / AI thinking indicator */}
      {isProcessing && (
        <div className="text-ink-faint text-center animate-pulse">
          <p className="text-lg animate-shimmer">
            {state.phase === 'ai-turn'
              ? '⛪ AI Pastor is searching the scriptures...'
              : '🏁 The referee is evaluating your verse...'}
          </p>
        </div>
      )}

      {/* Score reason from referee */}
      {scoreReason && currentRound?.playerVerse && !isProcessing && state.phase !== 'player-turn' && (
        <div className="text-center text-sm text-ink-light animate-fade-in">
          <span className="text-wine font-semibold">🏁 Referee:</span> {scoreReason}
        </div>
      )}

      {/* Commentary */}
      {currentRound && currentRound.commentary.length > 0 && (
        <Commentary lines={currentRound.commentary} />
      )}

      {/* Player verse choices */}
      {state.phase === 'player-turn' && (
        <VerseChoices
          choices={verseChoices}
          onSelect={handlePlayerSelect}
          disabled={isProcessing}
        />
      )}

      {/* Round result / next */}
      {state.phase === 'round-result' && (
        <div className="text-center animate-fade-in-up">
          <h3 className="text-xl font-bold text-wine mb-4">
            ✅ Round {state.currentRound} Complete!
          </h3>
          {currentRound && currentRound.playerVerse && currentRound.aiVerse && (
            <p className="text-ink-light mb-4">
              You scored <span className="text-wine font-bold">{currentRound.playerVerse.score}</span>
              {' vs '}
              AI Pastor's <span className="text-wine font-bold">{currentRound.aiVerse.score}</span>
            </p>
          )}
          <button
            onClick={handleNextRound}
            className="px-8 py-3 bg-wine hover:bg-wine-dark text-cream font-bold rounded-lg text-lg transition-colors cursor-pointer"
          >
            {state.currentRound >= state.totalRounds ? 'See Final Results' : 'Next Round'}
          </button>
        </div>
      )}
    </div>
  );
}
