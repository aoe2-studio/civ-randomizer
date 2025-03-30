import type { Meta, StoryObj } from '@storybook/react'
import { Configuration } from './configuration'

const meta = {
  title: 'Configuration',
  component: Configuration,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Configuration>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
