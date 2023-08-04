// @ts-nocheck
import type { GlobalProvider } from '@ladle/react'

import '../index.css'
import './overrides.css'

export const Provider: GlobalProvider = ({
  children,
  globalState: { theme },
}) => <div className={theme}>{children}</div>
