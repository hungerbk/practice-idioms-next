'use client'

import GameSetup from '@/app/components/game/GameSetup'
import GameScreen from '@/app/components/game/GameScreen'
import GameResult from '@/app/components/game/GameResult'
import { useGameStore } from '@/app/store/gameStore'
import { Difficulty, Idiom } from '@/app/types/game'

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
    <main className="bg-paper-100 min-h-screen py-8">
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
