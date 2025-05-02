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
          ? 'border-blue-500 bg-blue-50 text-blue-700'
          : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
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
