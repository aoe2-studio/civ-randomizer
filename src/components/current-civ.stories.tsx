import { useAppActorRef } from '@/actors/app'
import type { Meta, StoryObj } from '@storybook/react'
import { useEffect } from 'react'
import { CurrentCiv } from './current-civ'

const meta = {
  title: 'CurrentCiv',
  component: CurrentCiv,
  decorators: [
    (Story) => {
      const app = useAppActorRef()

      useEffect(() => {
        app.send({ type: 'randomize' })
      }, [app])

      return <Story />
    },
  ],
} satisfies Meta<typeof CurrentCiv>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
