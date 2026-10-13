import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { getProjects } from '@/lib/projects'

import { TerminalFrame } from './terminal-frame'

const ipsum = getProjects().find(({ slug }) => slug === 'ipsum')

const meta = {
  component: TerminalFrame,
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
  args: {
    name: 'ipsum',
    lines: ipsum?.preview.terminal ?? [],
  },
} satisfies Meta<typeof TerminalFrame>

export default meta

type Story = StoryObj<typeof meta>

// Stays dark in the light theme too
export const Default: Story = {}
