import { useReducer, useCallback, useEffect, useState } from 'react';
import type { GameState, PlayedVerse, Theme } from '../lib/types';
import { gameReducer, initialGameState } from '../lib/gameReducer';
import { lookupVerse } from '../lib/bible';
import { scoreVerse } from '../lib/scoring';
import { aiSelectVerse } from '../lib/ai-opponent';
import { generateCommentary } from '../lib/commentary';
import { themes } from '../data/themes';
import TitleScreen from './TitleScreen';
import ThemeReveal from './ThemeReveal';
import ScoreBoard from './ScoreBoard';
import VerseInput from './VerseInput';
import VerseCard from './VerseCard';
import Commentary from './Commentary';
import FinalResult from './FinalResult';

function pickRandomTheme(usedThemeIds: Set<string>): Theme {
  const available = themes.filter(t => !usedThemeIds.has(t.id));
  if (available.length === 0) return themes[Math.floor(Math.random() * themes.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export default function BattleArena() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [usedThemeIds, setUsedThemeIds] = useState<Set<string>>(new Set());
  const [allCommentary, setAllCommentary] = useState<string[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const currentRound = state.rounds[state.rounds.length - 1] ?? null;

  const handleStart = useCallback((difficulty: GameState['difficulty']) => {
    dispatch({ type: 'START_GAME', difficulty });
    const theme = pickRandomTheme(new Set());
    setUsedThemeIds(new Set([theme.id]));
    setAllCommentary([]);
    dispatch({ type: 'REVEAL_THEME', theme });
  }, []);

  const handlePlayerSubmit = useCallback((input: string) => {
    const result = lookupVerse(input);
    if (!result || !state.theme) return;

    const score = scoreVerse(result.verse, state.theme);
    const played: PlayedVerse = {
      verse: result.verse,
      bookName: result.bookName,
      score,
      reference: result.reference,
    };

    dispatch({ type: 'PLAYER_SUBMIT', verse: played });

    // Generate commentary for player's verse
    const commentary = generateCommentary({
      player: 'Player',
      verse: played,
      theme: state.theme,
      playerTotal: state.playerScore + score,
      aiTotal: state.aiScore,
      round: state.currentRound,
      totalRounds: state.totalRounds,
    });
    commentary.forEach(text => dispatch({ type: 'ADD_COMMENTARY', text }));
    setAllCommentary(prev => [...prev, ...commentary]);
  }, [state.theme, state.playerScore, state.aiScore, state.currentRound, state.totalRounds]);

  // AI turn
  useEffect(() => {
    if (state.phase !== 'ai-turn' || !state.theme) return;

    setIsAiThinking(true);
    const timer = setTimeout(() => {
      const aiResult = aiSelectVerse(state.theme!, state);
      if (!aiResult) {
        setIsAiThinking(false);
        return;
      }

      const played: PlayedVerse = {
        verse: aiResult.verse,
        bookName: aiResult.bookName,
        score: aiResult.score,
        reference: aiResult.reference,
      };

      dispatch({ type: 'AI_SUBMIT', verse: played });

      // Generate commentary for AI's verse
      const commentary = generateCommentary({
        player: 'AI Pastor',
        verse: played,
        theme: state.theme!,
        playerTotal: state.playerScore,
        aiTotal: state.aiScore + aiResult.score,
        round: state.currentRound,
        totalRounds: state.totalRounds,
        opponentVerse: currentRound?.playerVerse,
      });
      commentary.forEach(text => dispatch({ type: 'ADD_COMMENTARY', text }));
      setAllCommentary(prev => [...prev, ...commentary]);
      setIsAiThinking(false);
    }, 1500 + Math.random() * 1000);

    return () => clearTimeout(timer);
  }, [state.phase]);

  const handleNextRound = useCallback(() => {
    if (state.currentRound >= state.totalRounds) {
      dispatch({ type: 'END_GAME' });
      return;
    }
    const theme = pickRandomTheme(usedThemeIds);
    setUsedThemeIds(prev => new Set([...prev, theme.id]));
    dispatch({ type: 'NEXT_ROUND', theme });
  }, [state.currentRound, state.totalRounds, usedThemeIds]);

  // Title screen
  if (state.phase === 'title') {
    return <TitleScreen onStart={handleStart} />;
  }

  // Theme reveal (initial)
  if (state.phase === 'theme-reveal' && state.theme) {
    return (
      <ThemeReveal
        theme={state.theme}
        round={state.currentRound}
        totalRounds={state.totalRounds}
        onContinue={() => {}}
      />
    );
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
      {/* Score board */}
      <ScoreBoard
        playerScore={state.playerScore}
        aiScore={state.aiScore}
        round={state.currentRound}
        totalRounds={state.totalRounds}
      />

      {/* Theme */}
      {state.theme && (
        <div className="text-center">
          <p className="text-xs text-gold uppercase tracking-widest">Topic</p>
          <h2 className="text-2xl font-bold text-parchment">{state.theme.name}</h2>
          <p className="text-sm text-parchment-dark italic">"{state.theme.description}"</p>
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

      {/* AI thinking indicator */}
      {isAiThinking && (
        <div className="text-parchment-dark text-center animate-pulse">
          <p className="text-lg">AI Pastor is searching the scriptures...</p>
        </div>
      )}

      {/* Commentary */}
      {currentRound && currentRound.commentary.length > 0 && (
        <Commentary lines={currentRound.commentary} />
      )}

      {/* Player input */}
      {state.phase === 'player-turn' && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-gold text-sm uppercase tracking-widest font-bold">
            Your Turn — Cite a Verse
          </p>
          <VerseInput onSubmit={handlePlayerSubmit} disabled={false} />
        </div>
      )}

      {/* Round result / next */}
      {state.phase === 'round-result' && (
        <div className="text-center">
          <h3 className="text-xl font-bold text-gold mb-4">
            Round {state.currentRound} Complete!
          </h3>
          {currentRound && currentRound.playerVerse && currentRound.aiVerse && (
            <p className="text-parchment-dark mb-4">
              You scored <span className="text-gold font-bold">{currentRound.playerVerse.score}</span>
              {' vs '}
              AI Pastor's <span className="text-gold font-bold">{currentRound.aiVerse.score}</span>
            </p>
          )}
          <button
            onClick={handleNextRound}
            className="px-8 py-3 bg-gold-dark hover:bg-gold text-ink font-bold rounded-lg text-lg transition-colors cursor-pointer"
          >
            {state.currentRound >= state.totalRounds ? 'See Final Results' : 'Next Round'}
          </button>
        </div>
      )}
    </div>
  );
}
