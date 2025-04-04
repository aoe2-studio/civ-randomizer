import { AppProvider, useAppSelector } from '@/actors/app'
import { Configuring } from '@/components/configuring'
import { Randomizing } from '@/components/randomizing'
import { useIsClient } from '@/hooks'
import { MotionConfig } from 'motion/react'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
})

const App = () => {
  const isInRandomizingState = useAppSelector((snapshot) =>
    snapshot.matches('randomizing'),
  )

  return isInRandomizingState ? <Randomizing /> : <Configuring />
}

export default function Home() {
  const isClient = useIsClient()

  return (
    <>
      <Head>
        <title>aoe2 civ randomizer</title>
      </Head>
      <MotionConfig reducedMotion="user">
        <div className={`${inter.className} app`}>
          <div className="page">
            {isClient ?
              <AppProvider>
                <App />
              </AppProvider>
            : <>Loading...</>}
          </div>
        </div>
      </MotionConfig>
    </>
  )
}
