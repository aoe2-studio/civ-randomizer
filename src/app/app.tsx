'use client'

import { useAppSelector } from '@/actors/app'
import { Configuration } from '../components/configuration'
import { CurrentCiv } from '../components/current-civ'
import { Randomize } from '../components/randomize'
import { Roster } from '../components/roster'

export const App = () => {
  const isReady = useAppSelector((snapshot) => snapshot.hasTag('ready'))

  if (!isReady) return <p>Loading...</p>

  return (
    <>
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
    </>
  )
}
