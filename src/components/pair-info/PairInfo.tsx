import type { FC, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Emptyable } from '../emptyable/Emptyable'

interface PairInfoProps {
  className?: string
  label: ReactNode
  value?: ReactNode
}

export const PairInfo: FC<PairInfoProps> = ({ className, label, value }) => (
  <div className={cn('flex flex-col space-y-4', className)}>
    <p className="text-body-s text-text-subdued">
      {label}
    </p>

    <Emptyable className="text-body-m-strong">
      {value}
    </Emptyable>
  </div>
)
