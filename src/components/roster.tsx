import { CIVS } from '@/constants'
import { ContextAwareCivIcon } from './civ-icon'

export const Roster = () => {
  return (
    <ul className="flex min-w-[100%] flex-wrap gap-1">
      {CIVS.map((civ) => (
        <li key={civ}>
          <ContextAwareCivIcon civ={civ} />
        </li>
      ))}
    </ul>
  )
}
