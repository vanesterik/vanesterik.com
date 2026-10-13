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
    url: 'https://lorem.example.com',
    image: '/projects/placeholder.svg',
    alt: 'Screenshot of lorem',
  },
} satisfies Meta<typeof BrowserFrame>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
