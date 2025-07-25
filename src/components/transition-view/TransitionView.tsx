import type { AnimationDefinition, MotionNodeAnimationOptions } from 'motion/react'
import type { ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { forwardRef } from 'react'

interface TransitionViewProps {
  children: ReactNode
  viewKey: string | number | boolean
  onAnimationComplete?: (definition: AnimationDefinition) => void
}

const animationProps: MotionNodeAnimationOptions = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2 },
}

export const TransitionView = forwardRef<HTMLDivElement, TransitionViewProps>(
  ({ children, viewKey, onAnimationComplete }, ref) => (
    <AnimatePresence initial={false} mode="popLayout">
      <m.div
        key={viewKey.toString()}
        ref={ref}
        style={{
          width: '100%',
        }}
        {...animationProps}
        onAnimationComplete={onAnimationComplete}
      >
        {children}
      </m.div>
    </AnimatePresence>
  ),
)
