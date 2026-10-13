import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { getProjects } from '@/lib/projects'

import { ProjectIndex } from './project-index'

const meta = {
  component: ProjectIndex,
  args: { projects: getProjects() },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ProjectIndex>

export default meta

type Story = StoryObj<typeof meta>

// Open a row to see its preview; narrow the window to see the phone layout
export const Default: Story = {}

export const OnPhone: Story = {
  globals: {
    viewport: { value: 'mobile1', isRotated: false },
  },
}
