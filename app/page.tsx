'use client'

import GameResult from '@/app/components/game/common/GameResult'
import GameScreen from '@/app/components/game/falling/GameScreen'
import GameSelect from '@/app/components/game/common/GameSelect'
import GameSetup from '@/app/components/game/common/GameSetup'
import {
  GameInitState,
  createInitialGameState,
  useGameStore
} from '@/app/store/gameStore'
import { Difficulty, GameType, Idiom } from '@/app/types/game'

export default function Home() {
  const { gameState, gameResults, setGameState, setGameResults } =
    useGameStore()

  const handleGameSelect = (gameType: GameType) => {
    const initialState: GameInitState = {
      type: gameType,
      difficulty: null,
      count: null
    }
    setGameState(initialState)
  }

  const handleGameStart = (difficulty: Difficulty, count: number) => {
    if (!gameState) return

    const newState = createInitialGameState(gameState.type, difficulty, count)
    setGameState(newState)
    setGameResults(null)
  }

  const handleGameEnd = (results: Idiom[]) => {
    setGameResults(results)
  }

  const renderGameScreen = () => {
    if (!gameState?.difficulty || !gameState?.count) return null

    switch (gameState.type) {
      case 'falling-idioms':
        return (
          <GameScreen
            difficulty={gameState.difficulty}
            count={gameState.count}
            onGameEnd={handleGameEnd}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-paper-100 py-8">
      <div className="container mx-auto px-4">
        {!gameState ? (
          <GameSelect onSelect={handleGameSelect} />
        ) : !gameState.difficulty ? (
          <GameSetup onStart={handleGameStart} />
        ) : gameResults ? (
          <GameResult results={gameResults} />
        ) : (
          renderGameScreen()
        )}
      </div>
    </main>
  )
}
