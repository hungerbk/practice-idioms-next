// app/layout.tsx
import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '사자성어 연습 게임',
  description: '게임을 통해 사자성어를 연습할 수 있습니다.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
