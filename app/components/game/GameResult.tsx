import { Idiom } from '@/app/types/game'
import { useGameStore } from '@/app/store/gameStore'
import Button from '@/app/components/common/Button'

interface GameResultProps {
  results: Idiom[]
}

export default function GameResult({ results }: GameResultProps) {
  const { resetGame } = useGameStore()

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">게임 결과</h2>
      <div className="mb-6 space-y-4">
        {results.map((result: Idiom, index: number) => (
          <div
            key={index}
            className="rounded-lg border p-4">
            <p className="font-medium">{result.characters}</p>
            <p className="text-sm text-gray-600">{result.pronunciation}</p>
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
      <Button
        onClick={resetGame}
        fullWidth>
        다시 시작
      </Button>
    </div>
  )
}
