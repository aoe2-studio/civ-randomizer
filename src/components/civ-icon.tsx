import { CIV_ICON_SIZE } from '@/constants'
import type { Civ } from '@/types'
import Image from 'next/image'

export const CivIcon = ({
  civ,
  className,
  size = CIV_ICON_SIZE / 2,
}: {
  civ: Civ
  className?: string
  size?: number
}) => {
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
