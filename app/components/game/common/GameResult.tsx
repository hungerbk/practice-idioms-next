import ResetGameButton from '@/app/components/game/common/ResetGameButton'
import RestartGameButton from '@/app/components/game/common/RestartGameButton'
import { Idiom } from '@/app/types/game'

interface GameResultProps {
  results: Idiom[]
}

export default function GameResult({ results }: GameResultProps) {
  return (
    <section className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">게임 결과</h2>
      <ul className="mb-6 space-y-4">
        {results.map((result: Idiom, index: number) => (
          <li
            key={index}
            className="relative rounded-lg border p-4">
            <span
              className={`absolute right-2 top-3 rounded-lg px-2 py-0 text-sm font-medium ${
                result.isCorrect
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}>
              {result.isCorrect ? '정답' : '오답'}
            </span>
            <p className="text-lg font-bold">
              {result.pronunciation} ({result.characters})
            </p>
            <p className="text-sm text-gray-600">{result.meaning}</p>
          </li>
        ))}
      </ul>
      <div className="mb-6 space-y-3">
        <RestartGameButton />
        <ResetGameButton />
      </div>
    </section>
  )
}
