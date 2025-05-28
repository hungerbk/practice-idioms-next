'use client'

import Button from '@/app/components/common/Button'
import { useGameStore } from '@/app/store/gameStore'

export default function RestartGameButton() {
  const { restartGame } = useGameStore()

  return (
    <Button
      onClick={restartGame}
      fullWidth>
      다시하기
    </Button>
  )
}
