import { CIVS } from '@/constants'
import { useEnabledCivs, usePlayedCivs } from '@/machines/app'
import { CivIcon } from './civ-icon'

export const Roster = () => {
  const enabled = useEnabledCivs()
  const played = usePlayedCivs()

  return (
    <ul className="not-prose flex min-w-[100%] flex-wrap">
      {CIVS.map((civ) => (
        <li key={civ}>
          <span
            style={{
              opacity:
                !enabled.includes(civ) ? 0.2
                : played.includes(civ) ? 0.5
                : 1,
            }}
          >
            <CivIcon civ={civ} />
          </span>
        </li>
      ))}
    </ul>
  )
}
