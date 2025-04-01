import {
  AppProvider,
  AppSnapshot,
  useAppActorRef,
  useAppSelector,
} from '@/actors/app'
import { snapshotLoader } from '@/actors/snapshot-loader'
import { Configuration } from '@/components/configuration'
import { CurrentCiv } from '@/components/current-civ'
import { Randomize } from '@/components/randomize'
import { Roster } from '@/components/roster'
import { useActor } from '@xstate/react'
import { MotionConfig } from 'motion/react'
import { Inter } from 'next/font/google'
import { useEffect, type ComponentProps } from 'react'

const inter = Inter({
  subsets: ['latin'],
})

const useSnapshotError = () => {
  const snapshot = useAppSelector((snapshot) => snapshot)
  const status = useAppSelector((snapshot) => snapshot.status)
  const error = useAppSelector((snapshot) => snapshot.error)

  if (status === 'error') {
    console.log('snapshot', snapshot)
    throw error
  }

  return null
}

const useSnapshotSaver = () => {
  const app = useAppActorRef()

  useEffect(() => {
    const { unsubscribe } = app.subscribe(() => {
      const snapshot = app.getPersistedSnapshot()
      localStorage.setItem('snapshot', JSON.stringify(snapshot))
    })
    return unsubscribe
  }, [app])
}

const Snapshot = () => {
  useSnapshotError()
  useSnapshotSaver()

  return null
}

const App = ({ snapshot }: { snapshot?: AppSnapshot }) => {
  return (
    <MotionConfig reducedMotion="user">
      <AppProvider options={{ snapshot }}>
        <Snapshot />
        <header>
          <h1>aoe2 civ randomizer</h1>
        </header>

        <main className="flex flex-col gap-16">
          <section>
            <Roster />
          </section>

          <section className="flex flex-col items-center gap-12">
            <CurrentCiv />
            <Randomize />
          </section>

          <section>
            <Configuration />
          </section>
        </main>
      </AppProvider>
    </MotionConfig>
  )
}

const Container = (props: ComponentProps<'div'>) => (
  <div
    {...props}
    className={`${inter.className} mx-auto prose min-h-screen w-screen max-w-6xl p-8 pb-20 antialiased sm:p-20 dark:prose-invert`}
  />
)

export default function Home() {
  const [loader] = useActor(snapshotLoader)

  if (loader.status === 'error') {
    return (
      <Container>
        <p className="text-red-500">ERROR: </p>
        {String(loader.error)}
      </Container>
    )
  }

  if (loader.status === 'done') {
    return (
      <Container>
        <App snapshot={loader.output} />
      </Container>
    )
  }

  return <Container>Loading...</Container>
}
