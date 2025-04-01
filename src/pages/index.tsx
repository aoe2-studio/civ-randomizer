import { AppProvider, type AppContext } from '@/actors/app'
import { localStorageLoader } from '@/actors/local-storage-loader'
import { Configuration } from '@/components/configuration'
import { CurrentCiv } from '@/components/current-civ'
import { Randomize } from '@/components/randomize'
import { Roster } from '@/components/roster'
import { useActor } from '@xstate/react'
import { MotionConfig } from 'motion/react'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <MotionConfig reducedMotion="user">
      <div
        className={`${inter.className} mx-auto prose min-h-screen w-screen max-w-6xl p-8 pb-20 antialiased sm:p-20 dark:prose-invert`}
      >
        {children}
      </div>
    </MotionConfig>
  )
}

const App = ({ context }: { context: AppContext | undefined }) => {
  return (
    <AppProvider
      options={{
        input: {
          context,
        },
      }}
    >
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
  )
}

export default function Home() {
  const [loader] = useActor(localStorageLoader)

  if (loader.status === 'error') {
    throw loader.error
  }

  if (loader.status === 'done') {
    return (
      <Container>
        <App context={loader.output} />
      </Container>
    )
  }

  return <Container>Loading...</Container>
}
