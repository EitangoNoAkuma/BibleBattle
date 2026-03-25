import type { GameState, GameAction } from './types';

export const initialGameState: GameState = {
  phase: 'title',
  currentRound: 0,
  totalRounds: 5,
  theme: null,
  playerScore: 0,
  aiScore: 0,
  rounds: [],
  usedVerseIds: new Set(),
  difficulty: 'normal',
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialGameState,
        phase: 'theme-reveal',
        difficulty: action.difficulty,
      };

    case 'REVEAL_THEME':
      return {
        ...state,
        phase: 'player-turn',
        currentRound: state.currentRound + 1,
        theme: action.theme,
        rounds: [
          ...state.rounds,
          {
            roundNumber: state.currentRound + 1,
            theme: action.theme,
            playerVerse: null,
            aiVerse: null,
            commentary: [],
          },
        ],
      };

    case 'PLAYER_SUBMIT': {
      const updatedRounds = [...state.rounds];
      const current = { ...updatedRounds[updatedRounds.length - 1] };
      current.playerVerse = action.verse;
      updatedRounds[updatedRounds.length - 1] = current;

      const newUsed = new Set(state.usedVerseIds);
      newUsed.add(action.verse.verse.id);

      return {
        ...state,
        phase: 'ai-turn',
        playerScore: state.playerScore + action.verse.score,
        rounds: updatedRounds,
        usedVerseIds: newUsed,
      };
    }

    case 'AI_SUBMIT': {
      const updatedRounds = [...state.rounds];
      const current = { ...updatedRounds[updatedRounds.length - 1] };
      current.aiVerse = action.verse;
      updatedRounds[updatedRounds.length - 1] = current;

      const newUsed = new Set(state.usedVerseIds);
      newUsed.add(action.verse.verse.id);

      return {
        ...state,
        phase: 'round-result',
        aiScore: state.aiScore + action.verse.score,
        rounds: updatedRounds,
        usedVerseIds: newUsed,
      };
    }

    case 'ADD_COMMENTARY': {
      const updatedRounds = [...state.rounds];
      const current = { ...updatedRounds[updatedRounds.length - 1] };
      current.commentary = [...current.commentary, action.text];
      updatedRounds[updatedRounds.length - 1] = current;

      return {
        ...state,
        rounds: updatedRounds,
      };
    }

    case 'NEXT_ROUND':
      return {
        ...state,
        phase: 'player-turn',
        currentRound: state.currentRound + 1,
        theme: action.theme,
        rounds: [
          ...state.rounds,
          {
            roundNumber: state.currentRound + 1,
            theme: action.theme,
            playerVerse: null,
            aiVerse: null,
            commentary: [],
          },
        ],
      };

    case 'END_GAME':
      return {
        ...state,
        phase: 'final-result',
      };

    case 'RESET':
      return initialGameState;

    default:
      return state;
  }
}
