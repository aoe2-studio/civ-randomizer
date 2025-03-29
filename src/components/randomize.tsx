import { useAppActorRef, useIsRandomizable } from '@/machines/app'

export const Randomize = () => {
  const app = useAppActorRef()
  const isRandomizable = useIsRandomizable()
  const onRandomize = () => app.send({ type: 'randomize' })

  return (
    <div className="flex flex-col items-center gap-2">
      <button onClick={onRandomize} disabled={!isRandomizable}>
        Randomize Civ
      </button>
      {!isRandomizable && (
        <p>
          You need to enable <em>at least</em> two civs in{' '}
          <a href="#configuration">Configuration</a> to randomize!
        </p>
      )}
    </div>
  )
}
