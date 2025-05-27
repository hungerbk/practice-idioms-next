import { create } from 'zustand'
import { Difficulty, GameType, Idiom } from '@/app/types/game'

// 기본 게임 상태
interface BaseGameState {
  type: GameType
  difficulty: Difficulty
  count: number
  idioms: Idiom[]
  isGameOver: boolean
  isGameWon: boolean
  gameResults: Idiom[]
}

// 떨어지는 사자성어 게임 상태
export interface FallingIdiomsState extends BaseGameState {
  type: 'falling-idioms'
  currentIdiomIndex: number
  lives: number
}

// 사자성어 짝 맞추기 게임 상태
export interface MatchingIdiomsState extends BaseGameState {
  type: 'matching-idioms'
  matchedPairs: number
}

// 게임 상태 타입
export type GameStateType = FallingIdiomsState | MatchingIdiomsState

// 게임 초기화 상태
export interface GameInitState {
  type: GameType
  difficulty: null
  count: null
}

interface GameStore {
  gameState: GameStateType | GameInitState | null
  gameResults: Idiom[] | null
  setGameState: (state: GameStateType | GameInitState | null) => void
  setGameResults: (results: Idiom[] | null) => void
  resetGame: () => void
  restartGame: () => void
}

// 게임 타입별 초기 상태 생성 함수
export const createInitialGameState = (
  type: GameType,
  difficulty: Difficulty,
  count: number
): GameStateType => {
  const baseState = {
    type,
    difficulty,
    count,
    idioms: [],
    isGameOver: false,
    isGameWon: false,
    gameResults: []
  }

  if (type === 'falling-idioms') {
    return {
      ...baseState,
      type: 'falling-idioms',
      currentIdiomIndex: 0,
      lives: 3
    }
  } else {
    return {
      ...baseState,
      type: 'matching-idioms',
      matchedPairs: 0
    }
  }
}

export const useGameStore = create<GameStore>(set => ({
  gameState: null,
  gameResults: null,
  setGameState: state => set({ gameState: state }),
  setGameResults: results => set({ gameResults: results }),
  resetGame: () => set({ gameState: null, gameResults: null }),
  restartGame: () =>
    set(state => {
      if (!state.gameState) return state

      return {
        gameState: {
          type: state.gameState.type,
          difficulty: null,
          count: null
        },
        gameResults: null
      }
    })
}))
