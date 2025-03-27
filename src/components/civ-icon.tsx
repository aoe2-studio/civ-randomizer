import { CIV_ICON_SIZE } from '@/constants'
import type { Civ } from '@/types'
import Image from 'next/image'

export const CivIcon = ({
  civ,
  size = CIV_ICON_SIZE / 2,
}: {
  civ: Civ
  size?: number
}) => (
  <Image
    src={`/civs/${civ}.png`}
    alt={`${civ} icon`}
    width={size}
    height={size}
  />
)
