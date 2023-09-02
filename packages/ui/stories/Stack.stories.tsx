import type { Story } from '@ladle/react'
import { VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

import { card } from '../lib/card'
import { stack } from '../lib/stack'
import { text } from '../lib/text'

export const Component: Story<VariantProps<typeof stack>> = (props) => (
  <div className={stack(props)}>
    {Array.from(Array(3).keys()).map((index) => (
      <div
        className={clsx(card(), text({ intent: 'label' }))}
        key={index}
      >{`Item ${index}`}</div>
    ))}
  </div>
)

Component.argTypes = {
  direction: {
    options: ['row', 'column'],
    control: { type: 'radio' },
    defaultValue: 'row',
  },
  justify: {
    options: ['start', 'end', 'between'],
    control: { type: 'select' },
    defaultValue: 'start',
  },
}
