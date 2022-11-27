import { useLadleContext } from '@ladle/react'
import { Layout } from './Layout'

export const Base = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={globalState.theme}>
      <Layout />
    </div>
  )
}
