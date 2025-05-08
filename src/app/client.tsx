'use client'

import dynamic from 'next/dynamic'
import { Providers } from './providers'

const App = dynamic(() => import('./app').then((mod) => mod.App), {
  ssr: false,
})

export const Client = () => {
  return (
    <Providers>
      <App />
    </Providers>
  )
}
