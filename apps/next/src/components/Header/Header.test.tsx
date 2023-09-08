import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Header } from './Header'

describe('Header', () => {
  it('should render as expected', () => {
    const { getByRole } = render(<Header />)
    expect(getByRole('banner')).toBeInTheDocument()
  })
})
