'use client'

import { cn } from 'cn'
import { Accordion as AccordionPrimitive } from 'radix-ui'
import type * as React from 'react'

function Accordion(
  props: React.ComponentProps<typeof AccordionPrimitive.Root>,
) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-accent border-b', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    // A div, not Radix's default h3: the rows aren't headings
    <AccordionPrimitive.Header asChild>
      <div>
        <AccordionPrimitive.Trigger
          data-slot="accordion-trigger"
          className={cn(
            'w-full cursor-pointer text-left outline-none focus-visible:outline-2 focus-visible:outline-info focus-visible:outline-solid focus-visible:-outline-offset-2',
            className,
          )}
          {...props}
        />
      </div>
    </AccordionPrimitive.Header>
  )
}

// Opens and closes without a transition
function AccordionContent(
  props: React.ComponentProps<typeof AccordionPrimitive.Content>,
) {
  return <AccordionPrimitive.Content data-slot="accordion-content" {...props} />
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
