'use client'

import { AppProvider } from '@/actors/app'
import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider>{children}</AppProvider>
    </MotionConfig>
  )
}
