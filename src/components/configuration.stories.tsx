import type { Meta, StoryObj } from '@storybook/react'
import { Configuring } from './configuring'

const meta = {
  title: 'Configuration',
  component: Configuring,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Configuring>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
