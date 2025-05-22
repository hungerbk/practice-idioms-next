export type Difficulty = 'easy' | 'medium' | 'hard' | 'mixed'

export type GameType = 'falling-idioms' | 'matching-idioms'

export interface Idiom {
  id: number
  characters: string
  pronunciation: string
  meaning: string
  difficulty: Difficulty
  isCorrect?: boolean
}

export interface GameState {
  difficulty: Difficulty
  count: number
  idioms: Idiom[]
  currentIdiomIndex: number
  lives: number
  isGameOver: boolean
  isGameWon: boolean
  gameResults: Idiom[]
}
