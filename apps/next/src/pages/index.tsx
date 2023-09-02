import { game } from '@vanesterik/ui'
import { useEffect, useRef } from 'react'

import { useTheme } from '../components'

export default function Index() {
  const { isDarkMode } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) game(ref.current, isDarkMode)
  }, [isDarkMode])

  return <div className="relative h-full w-full" ref={ref} />
}
