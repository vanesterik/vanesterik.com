import { footer } from '@vanesterik/ui'
import { ReactNode } from 'react'

type FooterProps = {
  children?: ReactNode
}

export const Footer = ({ children }: FooterProps) => (
  <footer className={footer()}>{children}</footer>
)
