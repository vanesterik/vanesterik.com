import { useLadleContext } from '@ladle/react'
import clsx from 'clsx'
import { Cover, CoverProps } from './Cover'

export const Base = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={clsx(globalState.theme, 'h-full relative w-full')}>
      <Cover theme={globalState.theme as CoverProps['theme']} />
    </div>
  )
}
