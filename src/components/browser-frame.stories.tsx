import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { BrowserFrame } from './browser-frame'

const meta = {
  component: BrowserFrame,
  decorators: [
    (Story) => (
      <div className="w-160 font-mono">
        <Story />
      </div>
    ),
  ],
  args: {
    url: 'https://www.sportsdirect.com/',
    image: '/projects/sportsdirect.jpg',
    alt: 'Screenshot of Sports Direct',
  },
} satisfies Meta<typeof BrowserFrame>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
