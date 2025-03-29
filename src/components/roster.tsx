import { CIV_ICON_SIZE, CIVS } from '@/constants'
import { ContextAwareCivIcon } from './civ-icon'

export const Roster = () => {
  return (
    <ul className="flex min-w-[100%] flex-wrap gap-1 gap-y-2">
      {CIVS.map((civ) => (
        <li key={civ}>
          <ContextAwareCivIcon civ={civ} size={CIV_ICON_SIZE / 2.5} />
        </li>
      ))}
    </ul>
  )
}
