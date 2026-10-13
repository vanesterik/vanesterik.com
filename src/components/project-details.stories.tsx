import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { getProjects } from '@/lib/projects'

import { ProjectDetails } from './project-details'

// A project with every kind of link, whichever it is
const projects = getProjects()
const project =
  projects.find(({ links }) => links.primary && links.source) ?? projects[0]

const meta = {
  component: ProjectDetails,
  decorators: [
    (Story) => (
      <div className="w-[45vw] font-mono text-[15px] leading-[1.6]">
        <Story />
      </div>
    ),
  ],
  args: { project: project },
} satisfies Meta<typeof ProjectDetails>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutLinks: Story = {
  args: { project: { ...project, links: {} } },
}
