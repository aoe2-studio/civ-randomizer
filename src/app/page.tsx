import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Client } from './client'

export const metadata: Metadata = {
  title: 'AoE2 Civ Randomizer',
  description: 'A better Random for Age of Empires II',
}

export default async function Page() {
  return <Client />
}
