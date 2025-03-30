import type { Meta, StoryObj } from '@storybook/react'
import { Roster } from './roster'

const meta = {
  title: 'Roster',
  component: Roster,
} satisfies Meta<typeof Roster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
