import { Cinzel, Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-cinzel',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="antialiased">
        <div className="mx-auto prose min-h-screen w-screen max-w-6xl p-8 pb-20 antialiased sm:p-20 dark:prose-invert">
          <header>
            <h1>aoe2 civ randomizer</h1>
          </header>

          <main className="flex flex-col gap-16">{children}</main>
        </div>
      </body>
    </html>
  )
}
