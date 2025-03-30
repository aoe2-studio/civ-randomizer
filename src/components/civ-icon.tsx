import { CIV_ICON_SIZE, CIV_ICONS_PATH } from '@/constants'
import type { Civ } from '@/types'
import Image from 'next/image'

export type CivIconSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<CivIconSize, number> = {
  sm: CIV_ICON_SIZE / 3,
  md: CIV_ICON_SIZE / 2,
  lg: CIV_ICON_SIZE,
}

export const CivIcon = ({
  civ,
  className,
  size = 'md',
}: {
  civ: Civ
  className?: string
  size?: CivIconSize
}) => {
  return (
    <Image
      src={`${CIV_ICONS_PATH}/${civ}.png`}
      alt={`${civ} icon`}
      width={sizeMap[size]}
      height={sizeMap[size]}
      className={className}
    />
  )
}
