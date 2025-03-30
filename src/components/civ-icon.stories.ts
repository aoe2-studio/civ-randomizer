import { CIVS } from '@/constants'
import type { Meta, StoryObj } from '@storybook/react'
import { CivIcon } from './civ-icon'

const meta = {
  title: 'CivIcon',
  component: CivIcon,
  parameters: {
    layout: 'centered',
  },
  args: {
    civ: 'romans',
  },
  argTypes: {
    civ: {
      options: CIVS,
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof CivIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Small: Story = {
  args: {
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
  },
}
