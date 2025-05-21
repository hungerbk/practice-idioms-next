import { create } from 'zustand'
import { Difficulty, Idiom } from '../types/game'

interface GameState {
  gameState: {
    difficulty: Difficulty
    count: number
  } | null
  gameResults: Idiom[] | null
  setGameState: (
    state: { difficulty: Difficulty; count: number } | null
  ) => void
  setGameResults: (results: Idiom[] | null) => void
  resetGame: () => void
}

export const useGameStore = create<GameState>(set => ({
  gameState: null,
  gameResults: null,
  setGameState: state => set({ gameState: state }),
  setGameResults: results => set({ gameResults: results }),
  resetGame: () => set({ gameState: null, gameResults: null })
}))
