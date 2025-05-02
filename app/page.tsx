'use client'

import { useState } from 'react'
import GameSetup from './components/GameSetup'
import { Difficulty, GameState } from './types/game'

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  const handleGameStart = (difficulty: Difficulty, count: number) => {
    setGameState({
      difficulty,
      count,
      idioms: [],
      currentIdiomIndex: 0,
      lives: 3,
      isGameOver: false,
      isGameWon: false,
      gameResults: []
    })
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {!gameState ? (
          <GameSetup onStart={handleGameStart} />
        ) : (
          <div>게임 화면 구현 예정</div>
        )}
      </div>
    </main>
  )
}
