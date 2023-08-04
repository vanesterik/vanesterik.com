import clsx from 'clsx'
import { PropsWithChildren } from 'react'

import { card } from '../lib/card'
import { container } from '../lib/container'
import { footer } from '../lib/footer'
import { header } from '../lib/header'
import { main } from '../lib/main'
import { text } from '../lib/text'

export const Component = () => (
  <div className={container()}>
    <Card className={header()}>Header</Card>
    <Card className={main()}>Main</Card>
    <Card className={footer()}>Footer</Card>
  </div>
)

const Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div className={clsx(card(), text({ intent: 'label' }), className)}>
    {children}
  </div>
)
