import { useAppActorRef, useIsInvalid, useIsRandomizable } from '@/actors/app'
import type { ReactNode } from 'react'
import { CurrentCiv } from './current-civ'
import { Roster } from './roster'

const RandomizeButton = ({ children }: { children: ReactNode }) => {
  const app = useAppActorRef()
  const isRandomizable = useIsRandomizable()
  const onRandomize = () => app.send({ type: 'randomize' })

  return (
    <button onClick={onRandomize} disabled={!isRandomizable}>
      {children}
    </button>
  )
}

const ConfigurationButton = ({ children }: { children: ReactNode }) => {
  const app = useAppActorRef()
  const onConfiguration = () => app.send({ type: 'configuration.open' })

  return <button onClick={onConfiguration}>{children}</button>
}

const Buttons = () => {
  const app = useAppActorRef()
  const isInvalid = useIsInvalid()
  const onConfiguration = () => app.send({ type: 'configuration.open' })

  return (
    <div className="buttons-container">
      <div className="buttons">
        <RandomizeButton>Randomize Civ</RandomizeButton>
        <ConfigurationButton>
          <span role="img" aria-hidden className="text-3xl">
            ⚙️
          </span>
        </ConfigurationButton>
      </div>
      {isInvalid && (
        <p className="error">
          You must select{' '}
          <strong>
            <em>at least</em> two
          </strong>{' '}
          civs in{' '}
          <button onClick={onConfiguration} className="link">
            Configuration
          </button>{' '}
          to randomize!
        </p>
      )}
    </div>
  )
}

export const Randomizing = () => {
  return (
    <div className="page randomizing">
      <header className="prose dark:prose-invert">
        <h1>Civ Randomizer</h1>
        <p className="lead">
          Randomize unplayed civs from your preferred civs. When your match is
          finished, click the civ to mark it as played. Once all civs have been
          played, a new round starts with all civs marked as not yet played.
        </p>
      </header>

      <section className="roster">
        <Roster />
      </section>

      <section className="controls">
        <CurrentCiv />
        <Buttons />
      </section>
    </div>
  )
}
