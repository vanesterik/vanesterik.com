import clsx from 'clsx'

import { card } from '../lib/card'
import { container } from '../lib/container'
import { text } from '../lib/text'

export const Component = () => (
  <div className={clsx(card(), container(), text({ intent: 'label' }))}>
    Container
  </div>
)
