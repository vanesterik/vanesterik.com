import { useLadleContext } from '@ladle/react'
import { Header } from './Header'

export const Base = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={globalState.theme}>
      <Header />
    </div>
  )
}
