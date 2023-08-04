import { header, stack } from '@vanesterik/ui'
import { ReactNode } from 'react'

type HeaderProps = {
  children?: ReactNode
}

export const Header = ({ children }: HeaderProps) => (
  <header className={header()}>
    <div className={stack({ direction: 'row', justify: 'between' })}>
      {children}
    </div>
  </header>
)
