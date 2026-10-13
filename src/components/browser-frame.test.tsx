import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { BrowserFrame } from './browser-frame'

describe('BrowserFrame', () => {
  it('shows the screenshot with its alt text', () => {
    render(
      <BrowserFrame
        url="https://lorem.example.com"
        image="/projects/placeholder.svg"
        alt="Screenshot of lorem"
      />,
    )
    const image = screen.getByRole('img', { name: 'Screenshot of lorem' })
    expect(image).toHaveAttribute('src', '/projects/placeholder.svg')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('shows the URL without its protocol', () => {
    render(
      <BrowserFrame
        url="https://lorem.example.com"
        image="/projects/placeholder.svg"
        alt="Screenshot of lorem"
      />,
    )
    expect(screen.getByText('lorem.example.com')).toBeInTheDocument()
  })
})
