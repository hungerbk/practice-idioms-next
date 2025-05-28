'use client'

import FallingIdiom from '@/app/components/game/falling/FallingWord'
import InputWord from '@/app/components/game/common/InputWord'
import { Difficulty, GameState, Idiom } from '@/app/types/game'
import { useCallback, useEffect, useState } from 'react'

interface GamePlayProps {
  difficulty: Difficulty
  count: number
  onGameEnd: (results: Idiom[]) => void
}

interface FallingIdiomPosition {
  id: number
  top: number
  left: number
  width: number
  height: number
}

// 단어의 높이 (text-2xl의 실제 높이)
const WORD_HEIGHT = 24

export default function GamePlay({
  difficulty,
  count,
  onGameEnd
}: GamePlayProps) {
  const [gameState, setGameState] = useState<GameState>({
    difficulty,
    count,
    idioms: [],
    currentIdiomIndex: 0,
    lives: 3,
    isGameOver: false,
    isGameWon: false,
    gameResults: []
  })
  const [userInput, setUserInput] = useState('')
  const [fallingIdioms, setFallingIdioms] = useState<FallingIdiomPosition[]>([])
  const [screenHeight, setScreenHeight] = useState(0)
  const [isWrong, setIsWrong] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  // 화면 높이 설정
  const updateScreenHeight = useCallback(() => {
    setScreenHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    updateScreenHeight() // 초기화

    window.addEventListener('resize', updateScreenHeight)

    return () => window.removeEventListener('resize', updateScreenHeight)
  }, [updateScreenHeight])

  // 게임 초기화
  useEffect(() => {
    const generateRandomPosition = (
      existingPositions: FallingIdiomPosition[]
    ) => {
      const minGap = 150
      let attempts = 0
      const maxAttempts = 100
      //TODO: 게임 영역 수정 필요. 단어 시작 위치가 문제 영역과 겹치는 문제. 하단 경계선 부분에 눈에 보이는 글자가 아닌 글자의 영역이 닿으면 게임이 종료되는 문제
      // 화면 경계 설정 (게임 UI 영역 제외)
      const padding = 100
      const maxWidth = window.innerWidth - padding * 2
      const problemAreaHeight = 80 // 문제 영역 높이
      const gameAreaHeight = screenHeight - problemAreaHeight - 240 // 게임 영역 높이 (하단 UI 영역 제외)

      while (attempts < maxAttempts) {
        const left = Math.random() * maxWidth + padding
        const top = problemAreaHeight + Math.random() * (gameAreaHeight * 0.3)

        // 기존 위치와의 충돌 확인
        const isOverlapping = existingPositions.some(pos => {
          const horizontalGap = Math.abs(pos.left - left)
          const verticalGap = Math.abs(pos.top - top)
          return horizontalGap < minGap && verticalGap < minGap
        })

        if (!isOverlapping) {
          return {
            left,
            top,
            width: 100,
            height: WORD_HEIGHT
          }
        }

        attempts++
      }

      return {
        left: padding + Math.random() * (maxWidth - 200),
        top: problemAreaHeight + Math.random() * (gameAreaHeight * 0.3),
        width: 100,
        height: WORD_HEIGHT
      }
    }

    const initializeGame = async () => {
      try {
        const response = await fetch('/idioms.json')
        const allIdioms: Idiom[] = await response.json()

        let filteredIdioms = allIdioms
        if (difficulty !== 'mixed') {
          filteredIdioms = allIdioms.filter(
            idiom => idiom.difficulty === difficulty
          )
        }

        const selectedIdioms = filteredIdioms
          .sort(() => Math.random() - 0.5)
          .slice(0, count)
          .map((idiom, index) => ({
            ...idiom,
            id: index + 1
          }))

        setGameState(prev => ({
          ...prev,
          idioms: selectedIdioms
        }))

        const initialPositions: FallingIdiomPosition[] = []
        selectedIdioms.forEach(idiom => {
          const position = generateRandomPosition(initialPositions)
          initialPositions.push({
            id: idiom.id,
            ...position
          })
        })
        setFallingIdioms(initialPositions)
      } catch (error) {
        console.error('Failed to load idioms:', error)
      }
    }

    initializeGame()
  }, [difficulty, count, screenHeight])

  // 떨어지는 애니메이션
  useEffect(() => {
    if (gameState.isGameOver) return

    const interval = setInterval(() => {
      setFallingIdioms(prev =>
        prev.map(idiom => {
          const newTop = idiom.top + 1
          // 화면 하단 경계 체크 (단어의 끝부분이 닿을 때)
          if (newTop + WORD_HEIGHT > screenHeight - 100) {
            // 게임 오버 처리
            setGameState(prev => ({
              ...prev,
              isGameOver: true,
              isGameWon: false
            }))
            onGameEnd(gameState.idioms)
            return idiom
          }
          return { ...idiom, top: newTop }
        })
      )
    }, 150)

    return () => clearInterval(interval)
  }, [gameState.isGameOver, screenHeight, gameState.idioms, onGameEnd])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const currentIdiom = gameState.idioms[gameState.currentIdiomIndex]

    if (!currentIdiom) return

    const isCorrect = userInput === currentIdiom.pronunciation
    const newResults = [
      ...gameState.gameResults,
      { ...currentIdiom, isCorrect }
    ]

    if (isCorrect) {
      setIsWrong(false)
      setIsCorrect(true)
      // 정답 애니메이션이 끝나면 isCorrect를 false로 설정
      setTimeout(() => {
        setIsCorrect(false)
      }, 300)

      // 정답인 경우 해당 단어를 화면에서 제거
      setFallingIdioms(prev =>
        prev.filter(idiom => idiom.id !== currentIdiom.id)
      )

      if (gameState.currentIdiomIndex === gameState.idioms.length - 1) {
        // 모든 단어의 결과를 포함하여 게임 종료
        const allResults = gameState.idioms.map(idiom => ({
          ...idiom,
          isCorrect: newResults.some(
            result => result.id === idiom.id && result.isCorrect
          )
        }))
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          isGameWon: true,
          gameResults: allResults
        }))
        onGameEnd(allResults)
      } else {
        setGameState(prev => ({
          ...prev,
          currentIdiomIndex: prev.currentIdiomIndex + 1,
          gameResults: newResults
        }))
      }
    } else {
      setIsWrong(true)
      setIsCorrect(false)
      // 오답 애니메이션이 끝나면 isWrong을 false로 설정
      setTimeout(() => {
        setIsWrong(false)
      }, 200)

      // 오답인 경우 모든 단어를 한 칸씩 내림
      setFallingIdioms(prev =>
        prev.map(idiom => ({
          ...idiom,
          top: idiom.top + WORD_HEIGHT
        }))
      )

      if (gameState.lives === 1) {
        // 생명이 1일 때 오답을 입력하면 게임 종료
        const allResults = gameState.idioms.map(idiom => ({
          ...idiom,
          isCorrect: newResults.some(
            result => result.id === idiom.id && result.isCorrect
          )
        }))
        setGameState(prev => ({
          ...prev,
          isGameOver: true,
          isGameWon: false,
          gameResults: allResults
        }))
        onGameEnd(allResults)
      } else {
        setGameState(prev => ({
          ...prev,
          lives: prev.lives - 1,
          gameResults: newResults
        }))
      }
    }

    setUserInput('')
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-paper-100">
      {/* 생명력 표시 */}
      <div className="absolute right-4 top-4 flex space-x-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className={`h-6 w-6 rounded-full ${
              index < gameState.lives ? 'bg-paper-600' : 'bg-paper-200'
            }`}
          />
        ))}
      </div>

      {/* 상단 문제 영역 */}
      <div className="absolute left-0 right-0 top-0 p-4">
        <div className="mx-auto max-w-2xl rounded-lg bg-white/90 p-4 shadow-lg backdrop-blur-sm">
          <p className="text-center text-xl font-medium text-paper-900">
            {gameState.idioms[gameState.currentIdiomIndex]?.meaning || ''}
          </p>
        </div>
      </div>

      {/* 떨어지는 사자성어들 */}
      {fallingIdioms.map(idiom => {
        const idiomData = gameState.idioms.find(i => i.id === idiom.id)
        return (
          <FallingIdiom
            key={idiom.id}
            id={idiom.id}
            top={idiom.top}
            left={idiom.left}
            pronunciation={idiomData?.pronunciation || ''}
          />
        )
      })}

      {/* 하단 경계선 */}
      <div
        className="absolute left-0 right-0 bg-paper-200"
        style={{
          top: `${screenHeight - 100}px`,
          height: '100px'
        }}
      />

      {/* 단어 입력 */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <InputWord
          userInput={userInput}
          onInputChange={setUserInput}
          onSubmit={handleSubmit}
          isWrong={isWrong}
          isCorrect={isCorrect}
        />
      </div>
    </div>
  )
}
