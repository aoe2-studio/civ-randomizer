import { CIV_ICON_SIZE } from '@/constants'
import { useCiv } from '@/machines/app'
import type { Civ } from '@/types'
import { clsx } from 'clsx'
import Image from 'next/image'

export interface CivIconProps {
  civ: Civ
  className?: string
  size?: number
}

export const CivIcon = ({
  civ,
  className,
  size = CIV_ICON_SIZE / 2,
}: CivIconProps) => {
  className = clsx(className, 'transition-opacity', 'duration-200')

  return (
    <Image
      src={`/civs/${civ}.png`}
      alt={`${civ} icon`}
      width={size}
      height={size}
      className={className}
    />
  )
}

export const ContextAwareCivIcon = ({
  civ,
  className,
  ...props
}: CivIconProps) => {
  const { isEnabled, hasBeenPlayed } = useCiv(civ)
  className = clsx(className, {
    'opacity-20': !isEnabled,
    'opacity-50': isEnabled && hasBeenPlayed,
  })

  return <CivIcon civ={civ} className={className} {...props} />
}
