import { FormEvent } from 'react'
import Button from '@/app/components/common/Button'

interface InputWordProps {
  userInput: string
  onInputChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  isWrong?: boolean
  isCorrect?: boolean
}

export default function InputWord({
  userInput,
  onInputChange,
  onSubmit,
  isWrong = false,
  isCorrect = false
}: InputWordProps) {
  return (
    <div
      className={`mx-auto max-w-2xl rounded-lg bg-white p-3 shadow-lg ${
        isWrong ? 'animate-wrong' : isCorrect ? 'animate-correct' : ''
      }`}>
      {/* 입력 폼 */}
      <form
        onSubmit={onSubmit}
        className={'flex gap-2'}>
        <input
          type="text"
          value={userInput}
          onChange={e => onInputChange(e.target.value)}
          className={
            'flex-1 rounded-md border border-gray-300 px-3 py-1.5 transition-all'
          }
          placeholder="사자성어를 입력하세요"
        />
        <Button type="submit">입력</Button>
      </form>
    </div>
  )
}
