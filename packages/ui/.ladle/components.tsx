// @ts-nocheck
import type { GlobalProvider } from '@ladle/react'
import { useEffect } from 'react'

import '../index.css'
import './overrides.css'

export const Provider: GlobalProvider = ({
  children,
  globalState: { theme },
}) => {
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return <>{children}</>
}
