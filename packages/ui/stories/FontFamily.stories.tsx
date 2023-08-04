import clsx from 'clsx'
import { PropsWithChildren } from 'react'

import { card } from '../lib/card'
import { text } from '../lib/text'

export const Set = () => (
  <div className="flex flex-col gap-0.5">
    <Card label="Heading">
      <span className="font-bold font-sans">Lausanne 700</span>
    </Card>
    <Card label="Body">
      <span className="font-normal font-sans">Lausanne 400</span>
    </Card>
    <Card label="Caption">
      <span className="font-normal font-mono">NB International Pro Mono</span>
    </Card>
  </div>
)

const Card = ({ children, label }: PropsWithChildren<{ label: string }>) => (
  <div className={card()}>
    <div className={clsx('mb-3', text({ intent: 'label' }))}>{label}</div>
    <div className={'text-3xl text-black dark:text-white'}>{children}</div>
  </div>
)
