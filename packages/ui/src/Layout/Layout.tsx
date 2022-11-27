import { ReactNode } from 'react'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const Layout = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-col h-screen px-3">
    <Header />
    <main className="flex-auto">{children}</main>
    <Footer />
  </div>
)
