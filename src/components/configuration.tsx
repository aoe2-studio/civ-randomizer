import { CIVS } from '@/constants'
import { useAppActorRef, useEnabledCivs } from '@/machines/app'
import { capitalize } from '@/string'
import { CivIcon } from './civ-icon'

export const Configuration = () => {
  const enabled = useEnabledCivs()
  const app = useAppActorRef()

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
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enabled.includes(civ)}
                onChange={() => app.send({ type: 'civ.toggle.enabled', civ })}
              />
              <span className="flex items-center gap-0.5">
                <CivIcon civ={civ} size={30} />
                {capitalize(civ)}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
