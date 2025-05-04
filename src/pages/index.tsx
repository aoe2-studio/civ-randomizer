import { AppProvider } from '@/actors/app'
import { Configuration } from '@/components/configuration'
import { CurrentCiv } from '@/components/current-civ'
import { Randomize } from '@/components/randomize'
import { Roster } from '@/components/roster'
import { useIsClient } from '@/hooks'
import { MotionConfig } from 'motion/react'
import { Cinzel, Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({
  subsets: ['latin'],
})
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
})

export default function Home() {
  const isClient = useIsClient()

  return (
    <>
      <Head>
        <title>aoe2 civ randomizer</title>
      </Head>
      <MotionConfig reducedMotion="user">
        <div
          className={`${inter.className} ${cinzel.variable} mx-auto prose min-h-screen w-screen max-w-6xl p-8 pb-20 antialiased sm:p-20 dark:prose-invert`}
        >
          {isClient ?
            <AppProvider>
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
          : <>Loading...</>}
        </div>
      </MotionConfig>
    </>
  )
}
