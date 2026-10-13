import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

const meta = {
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>

export default meta

type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="secondary">hover me</Button>
      </TooltipTrigger>
      <TooltipContent>live</TooltipContent>
    </Tooltip>
  ),
}
