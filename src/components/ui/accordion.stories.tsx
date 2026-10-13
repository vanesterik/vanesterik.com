import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion'

// Typed without the component: Accordion's props are a union (single or
// multiple), which Storybook can't infer args from
const meta = {
  decorators: [
    (Story) => (
      <div className="w-96 font-mono">
        <Story />
      </div>
    ),
  ],
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible defaultValue="lorem">
      <AccordionItem value="lorem">
        <AccordionTrigger className="py-3">lorem</AccordionTrigger>
        <AccordionContent className="pb-3">
          Lorem ipsum dolor sit amet.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ipsum">
        <AccordionTrigger className="py-3">ipsum</AccordionTrigger>
        <AccordionContent className="pb-3">
          Ut enim ad minim veniam.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
}
