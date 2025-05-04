import { useCiv } from '@/actors/app'
import { civData } from '@/civ-data'
import { CIVS } from '@/constants'
import type { Civ } from '@/types'
import { CivIcon } from './civ-icon'

const CivConfigItem = ({ civ }: { civ: Civ }) => {
  const { isEnabled, toggleEnabled } = useCiv(civ)
  const { name } = civData[civ]

  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={isEnabled} onChange={toggleEnabled} />
      <span className="flex items-center gap-0.5">
        <CivIcon civ={civ} size="sm" />
        {name}
      </span>
    </label>
  )
}

export const Configuration = () => {
  return (
    <div className="@container">
      <a id="configuration" />

      <h2>Configuration</h2>
      <p className="lead">
        Choose which civilizations you want to play with. Civs will be
        randomized based on your selection.
      </p>

      <ul className="not-prose grid gap-2 @md:grid-flow-col @md:grid-rows-[repeat(27,auto)] @xl:grid-rows-[repeat(18,auto)] @3xl:grid-rows-[repeat(13,auto)]">
        {CIVS.map((civ) => (
          <li key={civ}>
            <CivConfigItem civ={civ} />
          </li>
        ))}
      </ul>
    </div>
  )
}
