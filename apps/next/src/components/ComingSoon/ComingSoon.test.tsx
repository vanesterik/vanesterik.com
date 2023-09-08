import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ComingSoon } from './ComingSoon'

describe('ComingSoon', () => {
  it('should render as expected', () => {
    const { getByRole } = render(<ComingSoon />)
    expect(getByRole('heading')).toBeInTheDocument()
  })
})
