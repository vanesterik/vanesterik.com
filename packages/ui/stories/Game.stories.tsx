import { ThemeState, useLadleContext } from '@ladle/react'
import { useEffect, useRef } from 'react'

import { game } from '../lib/game'

export const Component = () => {
  const ref = useRef<HTMLDivElement>(null)
  const {
    globalState: { theme },
  } = useLadleContext()

  useEffect(() => {
    if (ref.current)
      game(ref.current, theme === ThemeState.Dark ? 'dark' : 'light')
  }, [theme])

  return <div className="h-full w-full" ref={ref} />
}
