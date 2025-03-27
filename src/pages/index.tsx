import { CivIcon } from '@/components/civ-icon'
import { CIVS } from '@/constants'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export default function Home() {
  return (
    <div
      className={`${inter.className} grid min-h-screen items-center justify-items-center gap-16 p-8 pb-20 sm:p-20`}
    >
      <main>
        <ul className="flex flex-wrap">
          {CIVS.map((civ) => (
            <li key={civ}>
              <CivIcon civ={civ} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
