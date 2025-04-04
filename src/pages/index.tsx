import { AppProvider, useAppSelector } from '@/actors/app'
import { Configuring } from '@/components/configuring'
import { PageLayout } from '@/components/page-layout'
import { Randomizing } from '@/components/randomizing'
import { useIsClient } from '@/hooks'
import { MotionConfig } from 'motion/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
})

const App = () => {
  const isInConfiguringState = useAppSelector((snapshot) =>
    snapshot.matches('configuring'),
  )

  return (
    <>
      <header>
        <h1>aoe2 civ randomizer</h1>
      </header>

      <main className="flex flex-col gap-16">
        <Randomizing />
        {isInConfiguringState && <Configuring />}
      </main>
    </>
  )
}

export default function Home() {
  const isClient = useIsClient()

  return (
    <>
      <Head>
        <title>aoe2 civ randomizer</title>
      </Head>
      <MotionConfig reducedMotion="user">
        <PageLayout className={inter.className}>
          {isClient ?
            <AppProvider>
              <App />
            </AppProvider>
          : <>Loading...</>}
        </PageLayout>
      </MotionConfig>
    </>
  )
}
