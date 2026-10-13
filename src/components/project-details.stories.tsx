import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { getProjects } from '@/lib/projects'

import { ProjectDetails } from './project-details'

const [lorem] = getProjects()

const meta = {
  component: ProjectDetails,
  decorators: [
    (Story) => (
      <div className="w-[45vw] font-mono text-[15px] leading-[1.6]">
        <Story />
      </div>
    ),
  ],
  args: { project: lorem },
} satisfies Meta<typeof ProjectDetails>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutLinks: Story = {
  args: { project: { ...lorem, links: {} } },
}
