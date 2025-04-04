import { clsx } from 'clsx'
import type { ComponentProps } from 'react'

export const PageLayout = ({ className, ...props }: ComponentProps<'div'>) => {
  className = clsx(
    className,
    'page-layout',
    'mx-auto prose min-h-screen w-screen max-w-6xl p-8 pb-20 antialiased sm:p-20 dark:prose-invert',
  )
  return <div className={className} {...props} />
}
