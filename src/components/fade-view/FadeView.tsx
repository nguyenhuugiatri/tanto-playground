import type { MotionNodeAnimationOptions } from 'motion/react'
import type { ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'

type FadeViewProps = MotionNodeAnimationOptions & {
  children: ReactNode
  show: boolean
}

const defaultProps: MotionNodeAnimationOptions = {
  initial: { opacity: 0.8, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0.8, scale: 0.95 },
  transition: { duration: 0.15 },
}

export function FadeView({ children, initial, animate, exit, transition, show }: FadeViewProps) {
  return (
    <AnimatePresence>
      {show && (
        <m.div
          initial={initial || defaultProps.initial}
          animate={animate || defaultProps.animate}
          exit={exit || defaultProps.exit}
          transition={transition || defaultProps.transition}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  )
}
