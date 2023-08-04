import clsx from 'clsx'

import { card } from '../lib/card'
import { footer } from '../lib/footer'
import { text } from '../lib/text'

export const Component = () => (
  <footer className={clsx(card(), footer(), text({ intent: 'label' }))}>
    Footer
  </footer>
)
