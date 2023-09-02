import { ThemeState, useLadleContext } from '@ladle/react'
import { useEffect, useRef } from 'react'

import { game } from '../lib/game'

const GAME_CONTAINER_ID = 'game-container'

export const Component = () => {
  const {
    globalState: { theme },
  } = useLadleContext()

  useEffect(() => {
    const finalize = game(GAME_CONTAINER_ID, theme === ThemeState.Dark)

    return () => finalize()
  }, [theme])

  return <div className="relative h-full w-full" id={GAME_CONTAINER_ID} />
}
