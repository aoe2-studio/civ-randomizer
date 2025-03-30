import { AppProvider } from '@/machines/app'
import type { Preview } from '@storybook/react'
import { Inter } from 'next/font/google'
import '../src/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <AppProvider>
        <Story />
      </AppProvider>
    ),
    (Story) => (
      <main className={`${inter.className} prose`}>
        <Story />
      </main>
    ),
  ],
}

export default preview
