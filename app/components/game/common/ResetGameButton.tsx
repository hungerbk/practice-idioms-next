'use client'

import Button from '@/app/components/common/Button'
import { useGameStore } from '@/app/store/gameStore'

export default function ResetGameButton() {
  const { resetGame } = useGameStore()

  return (
    <Button
      onClick={resetGame}
      variant="outline"
      fullWidth>
      처음 화면으로 돌아가기
    </Button>
  )
}
