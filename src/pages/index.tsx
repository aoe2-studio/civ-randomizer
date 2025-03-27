import { Configuration } from '@/components/configuration'
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
        className={`${inter.className} prose min-h-screen min-w-screen p-8 pb-20 sm:p-20 dark:prose-invert`}
      >
        <main className="flex flex-col gap-16">
          <section>
            <Roster />
          </section>

          <section>
            <Configuration />
          </section>
        </main>
      </div>
    </AppProvider>
  )
}
