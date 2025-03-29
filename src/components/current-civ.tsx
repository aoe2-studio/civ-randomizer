import { useAppActorRef, useCurrentCiv } from '@/machines/app'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import { useCallback } from 'react'
import { CivIcon } from './civ-icon'

const CurrentCivInner = ({ civ }: { civ: Civ }) => {
  const app = useAppActorRef()
  const onClick = useCallback(() => {
    app.send({ type: 'civ.toggle.played', civ })
  }, [app, civ])

  return (
    <div
      onClick={onClick}
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
