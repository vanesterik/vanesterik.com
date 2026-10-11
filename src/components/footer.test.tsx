import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Footer } from './footer'

describe('Footer', () => {
  it('should render as expected', () => {
    const { getByRole } = render(<Footer />)
    expect(getByRole('contentinfo')).toBeInTheDocument()
  })

  it('makes its first column as wide as the shared indent', () => {
    const { getByRole } = render(<Footer />)
    // The about page indents its lists by the same token, so they line up
    expect(getByRole('contentinfo')).toHaveClass(
      'grid-cols-[var(--spacing-indent)_auto]',
    )
  })
})
