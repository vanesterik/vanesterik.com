import clsx from 'clsx'

import { card } from '../lib/card'
import { header } from '../lib/header'
import { text } from '../lib/text'

export const Component = () => (
  <header className={clsx(card(), header(), text({ intent: 'label' }))}>
    Header
  </header>
)
