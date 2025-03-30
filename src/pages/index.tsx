import { Configuration } from '@/components/configuration'
import { CurrentCiv } from '@/components/current-civ'
import { Randomize } from '@/components/randomize'
import { Roster } from '@/components/roster'
import { AppProvider } from '@/machines/app'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export default function Home() {
  return (
    <AppProvider>
      <div
        className={`${inter.className} mx-auto prose min-h-screen w-screen max-w-6xl p-8 pb-20 antialiased sm:p-20 dark:prose-invert`}
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
      </div>
    </AppProvider>
  )
}
