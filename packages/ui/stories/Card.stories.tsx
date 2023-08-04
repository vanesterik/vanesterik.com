import clsx from 'clsx'
import { ReactNode } from 'react'

import { card } from '../lib/card'
import { text } from '../lib/text'

const Card = ({ children }: { children?: ReactNode }) => (
  <div className={clsx(card(), text({ intent: 'label' }))}>{children}</div>
)

export const Component = () => <Card>Card</Card>
