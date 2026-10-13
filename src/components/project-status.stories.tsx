import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ProjectStatus } from './project-status'

const meta = {
  component: ProjectStatus,
  decorators: [
    (Story) => (
      <div className="font-mono">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProjectStatus>

export default meta

type Story = StoryObj<typeof meta>

export const Live: Story = { args: { status: 'live' } }

export const Wip: Story = { args: { status: 'wip' } }

export const Archived: Story = { args: { status: 'archived' } }
