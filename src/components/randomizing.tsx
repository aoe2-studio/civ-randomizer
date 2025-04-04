import { useAppActorRef, useIsRandomizable } from '@/actors/app'
import { CurrentCiv } from './current-civ'
import { Roster } from './roster'

const Controls = () => {
  const app = useAppActorRef()
  const isRandomizable = useIsRandomizable()
  const onRandomize = () => app.send({ type: 'randomize' })
  const onConfiguration = () => app.send({ type: 'configuration.open' })

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <button onClick={onRandomize} disabled={!isRandomizable}>
          Randomize Civ
        </button>
        <button onClick={onConfiguration} className="text-3xl">
          <span role="img" aria-hidden>
            ⚙️
          </span>
        </button>
      </div>
      {!isRandomizable && (
        <p>
          You need to enable <em>at least</em> two civs in{' '}
          <a onClick={onConfiguration}>Configuration</a> to randomize!
        </p>
      )}
    </div>
  )
}

export const Randomizing = () => {
  return (
    <>
      <section>
        <Roster />
      </section>

      <section className="flex flex-col items-center gap-12">
        <CurrentCiv />
        <Controls />
      </section>
    </>
  )
}
