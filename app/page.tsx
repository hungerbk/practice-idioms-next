'use client'

import GameSetup from './components/game/GameSetup'
import GameScreen from './components/game/GameScreen'
import GameResult from './components/game/GameResult'
import { useGameStore } from './store/gameStore'
import { Difficulty, Idiom } from './types/game'

export default function Home() {
  const { gameState, gameResults, setGameState, setGameResults } =
    useGameStore()

  const handleGameStart = (difficulty: Difficulty, count: number) => {
    setGameState({ difficulty, count })
    setGameResults(null)
  }

  const handleGameEnd = (results: Idiom[]) => {
    setGameResults(results)
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {!gameState ? (
          <GameSetup onStart={handleGameStart} />
        ) : gameResults ? (
          <GameResult results={gameResults} />
        ) : (
          <GameScreen
            difficulty={gameState.difficulty}
            count={gameState.count}
            onGameEnd={handleGameEnd}
          />
        )}
      </div>
    </main>
  )
}
