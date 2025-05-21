'use client'

import { InputHTMLAttributes } from 'react'

interface RadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  isSelected: boolean
}

export default function RadioButton({
  label,
  isSelected,
  className = '',
  ...props
}: RadioButtonProps) {
  return (
    <label
      className={`relative flex cursor-pointer items-center justify-center rounded-lg border p-3 text-sm font-medium transition-colors ${
        isSelected
          ? 'border-paper-600 bg-paper-50 text-paper-700'
          : 'border-paper-200 text-paper-700 hover:bg-paper-50 bg-white'
      } ${className}`}>
      <input
        type="radio"
        className="sr-only"
        {...props}
      />
      {label}
    </label>
  )
}
