import { useCiv, useEnabledCivs } from '@/machines/app'
import type { Civ } from '@/types'
import { clsx } from 'clsx'
import { CivIcon } from './civ-icon'

const RosterItem = ({ civ }: { civ: Civ }) => {
  const { isEnabled, hasBeenPlayed } = useCiv(civ)
  const className = clsx('transition-opacity', 'duration-200', {
    'opacity-20': !isEnabled,
    'opacity-50': isEnabled && hasBeenPlayed,
  })

  return <CivIcon className={className} civ={civ} size="md" />
}

export const Roster = () => {
  const enabledCivs = useEnabledCivs()

  return (
    <ul className="not-prose flex min-w-[100%] flex-wrap gap-1 gap-y-2">
      {enabledCivs.map((civ) => {
        return (
          <li key={civ}>
            <RosterItem civ={civ} />
          </li>
        )
      })}
    </ul>
  )
}
