'use client'

import Button from '@/app/components/common/Button'
import { GameType } from '@/app/types/game'

interface GameSelectProps {
  onSelect: (gameType: GameType) => void
}

const games = [
  {
    id: 'falling-idioms' as GameType,
    title: '떨어지는 사자성어',
    description: '떨어지는 사자성어를 맞추는 게임입니다.'
  },
  {
    id: 'matching-idioms' as GameType,
    title: '사자성어 짝 맞추기',
    description: '사자성어와 뜻을 짝지어 맞추는 게임입니다.'
  }
]

export default function GameSelect({ onSelect }: GameSelectProps) {
  return (
    <div className="mx-auto max-w-md rounded-lg bg-paper-50 p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">게임 선택</h2>
      <ul className="space-y-4">
        {games.map(game => (
          <li
            key={game.id}
            className="rounded-lg border border-paper-200 bg-white p-4 transition-colors">
            <h3 className="mb-2 text-lg font-medium text-paper-900">
              {game.title}
            </h3>
            <p className="mb-4 text-sm text-paper-600">{game.description}</p>
            <Button
              onClick={() => onSelect(game.id)}
              fullWidth>
              시작하기
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
