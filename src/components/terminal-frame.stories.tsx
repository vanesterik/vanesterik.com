import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { getProjects } from '@/lib/projects'

import { TerminalFrame } from './terminal-frame'

// The first project with a terminal session, whichever it is
const session = getProjects().find(({ preview }) => preview.terminal)

// Typed without the component: its props are a union (lines or a
// screenshot), which Storybook can't infer args from
const meta = {
  title: 'terminal-frame',
  decorators: [
    (Story) => (
      <div className="w-160">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Stays dark in the light theme too
export const Session: Story = {
  render: () => (
    <TerminalFrame
      name={session?.name ?? 'session'}
      lines={session?.preview.terminal ?? []}
    />
  ),
}
