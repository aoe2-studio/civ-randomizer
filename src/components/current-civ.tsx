import { useCiv, useCurrentCiv } from '@/machines/app'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import { CivIcon } from './civ-icon'

const CurrentCivInner = ({ civ }: { civ: Civ }) => {
  const { togglePlayed } = useCiv(civ)

  return (
    <div
      onClick={togglePlayed}
      className="inline-flex h-[120px] w-[120px] flex-col items-center justify-center border-3 border-gray-400 shadow-2xl hover:border-gray-500"
    >
      <CivIcon civ={civ} />
      <p>{capitalize(civ)}</p>
    </div>
  )
}

export const CurrentCiv = () => {
  const civ = useCurrentCiv()
  return civ ? <CurrentCivInner civ={civ} /> : null
}
