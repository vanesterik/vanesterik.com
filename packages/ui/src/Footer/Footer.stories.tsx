import { useLadleContext } from '@ladle/react'
import { Footer } from './Footer'

export const Base = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={globalState.theme}>
      <Footer />
    </div>
  )
}
