import type { FC, ReactNode } from 'react'
import React from 'react'

interface EmptyableProps {
  className?: string
  children?: ReactNode
  placeholder?: string
  placeholderClass?: string
}

export const Emptyable: FC<EmptyableProps> = ({
  className,
  children,
  placeholder = '--',
  placeholderClass,
}) => {
  const content = children ?? <div className={placeholderClass}>{placeholder}</div>

  return (
    <div className={className}>
      {content}
    </div>
  )
}
