'use client'

import { useState } from 'react'
import GameSetup from './components/game/GameSetup'
import GameScreen from './components/game/GameScreen'
import { Difficulty, Idiom } from './types/game'

export default function Home() {
  const [gameState, setGameState] = useState<{
    difficulty: Difficulty
    count: number
  } | null>(null)
  const [gameResults, setGameResults] = useState<Idiom[] | null>(null)

  const handleGameStart = (difficulty: Difficulty, count: number) => {
    setGameState({ difficulty, count })
    setGameResults(null)
  }

  const handleGameEnd = (results: Idiom[]) => {
    setGameResults(results)
  }

  const handleRestart = () => {
    setGameState(null)
    setGameResults(null)
  }

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {!gameState ? (
          <GameSetup onStart={handleGameStart} />
        ) : gameResults ? (
          <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-center text-2xl font-bold">게임 결과</h2>
            <div className="mb-6 space-y-4">
              {gameResults.map((result, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-4">
                  <p className="font-medium">{result.characters}</p>
                  <p className="text-sm text-gray-600">
                    {result.pronunciation}
                  </p>
                  <p className="text-sm text-gray-600">{result.meaning}</p>
                  <p
                    className={`mt-2 text-sm font-medium ${
                      result.isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {result.isCorrect ? '정답' : '오답'}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={handleRestart}
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              다시 시작
            </button>
          </div>
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
