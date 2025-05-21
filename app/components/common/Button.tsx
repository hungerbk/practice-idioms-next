'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg px-4 py-2 font-medium transition-colors'
  const variantStyles = {
    primary: 'bg-paper-600 text-white hover:bg-paper-700',
    secondary: 'bg-paper-400 text-white hover:bg-paper-500',
    outline: 'border-2 border-paper-600 text-paper-700 hover:bg-paper-50'
  }
  const widthStyles = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${widthStyles} ${className}`}
      {...props}>
      {children}
    </button>
  )
}
