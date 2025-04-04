import { useAppActorRef, useAppSelector, useCiv } from '@/actors/app'
import { CIVS } from '@/constants'
import { capitalize } from '@/string'
import type { Civ } from '@/types'
import { CivIcon } from './civ-icon'

const CivConfigItem = ({ civ }: { civ: Civ }) => {
  const { isEnabled, toggleEnabled } = useCiv(civ)

  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" checked={isEnabled} onChange={toggleEnabled} />
      <span className="flex items-center gap-0.5">
        <CivIcon civ={civ} size="sm" />
        {capitalize(civ)}
      </span>
    </label>
  )
}

const Configuration = () => {
  const isInvalid = useAppSelector((snapshot) => snapshot.hasTag('invalid'))

  return (
    <>
      <header className="prose dark:prose-invert">
        <h1>Configuration</h1>
        <p className="lead">
          Choose which civilizations you want to play with. Civs will be chosen
          at random from your selection.
        </p>
      </header>

      {isInvalid && (
        <p className="error">
          You must select{' '}
          <strong>
            <em>at least</em> two
          </strong>{' '}
          civs to use the randomizer.
        </p>
      )}

      <section>
        <ul className="civs">
          {CIVS.map((civ) => (
            <li key={civ}>
              <CivConfigItem civ={civ} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export const Configuring = () => {
  const app = useAppActorRef()

  return (
    <div className="page configuring">
      <Configuration />
      <button
        className="close"
        onClick={() => app.send({ type: 'configuration.close' })}
      >
        ❌
      </button>
    </div>
  )
}
