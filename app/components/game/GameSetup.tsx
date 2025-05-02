'use client'

import { useState } from 'react'
import { Difficulty } from '../../types/game'
import Button from '../common/Button'
import RadioButton from '../common/RadioButton'

interface GameSetupProps {
  onStart: (difficulty: Difficulty, count: number) => void
}

const difficulties: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: '초급' },
  { value: 'medium', label: '중급' },
  { value: 'hard', label: '고급' },
  { value: 'mixed', label: '혼합' }
]

export default function GameSetup({ onStart }: GameSetupProps) {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy')
  const [count, setCount] = useState<number>(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onStart(difficulty, count)
  }

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">
        사자성어 게임 설정
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            난이도 선택
          </label>
          <div className="grid grid-cols-2 gap-2">
            {difficulties.map(({ value, label }) => (
              <RadioButton
                key={value}
                name="difficulty"
                value={value}
                label={label}
                checked={difficulty === value}
                isSelected={difficulty === value}
                onChange={e => setDifficulty(e.target.value as Difficulty)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            문제 개수 (5-20)
          </label>
          <input
            type="number"
            min="5"
            max="20"
            value={count}
            onChange={e =>
              setCount(Math.min(20, Math.max(5, parseInt(e.target.value) || 5)))
            }
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <Button
          type="submit"
          fullWidth>
          게임 시작
        </Button>
      </form>
    </div>
  )
}
