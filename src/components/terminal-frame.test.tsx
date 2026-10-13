import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TerminalFrame } from './terminal-frame'

const lines = [
  { text: 'ipsum pack ./lorem', tone: 'command' },
  { text: 'scanning 12,480 files …', tone: 'info' },
  { text: 'skipped 316 dolor entries', tone: 'warn' },
  { text: 'wrote lorem.tar.zst', tone: 'success' },
] as const

describe('TerminalFrame', () => {
  it('names the session after the project', () => {
    render(<TerminalFrame name="ipsum" lines={[...lines]} />)
    expect(screen.getByText('zsh — ipsum')).toBeInTheDocument()
  })

  it('prefixes commands and colors each line by its tone', () => {
    render(<TerminalFrame name="ipsum" lines={[...lines]} />)
    expect(screen.getByText('$ ipsum pack ./lorem')).toHaveClass(
      'text-foreground',
    )
    expect(screen.getByText('scanning 12,480 files …')).toHaveClass(
      'text-muted-foreground',
    )
    expect(screen.getByText('skipped 316 dolor entries')).toHaveClass(
      'text-warning',
    )
    expect(screen.getByText('wrote lorem.tar.zst')).toHaveClass('text-success')
  })

  it('stays dark in either theme and ends on a prompt', () => {
    const { container } = render(
      <TerminalFrame name="ipsum" lines={[...lines]} />,
    )
    expect(container.firstChild).toHaveClass('dark')
    expect(container.querySelector('pre')?.lastChild).toHaveTextContent(/^\$/)
  })

  it('shows a screenshot of a terminal app instead of lines', () => {
    const { container } = render(
      <TerminalFrame
        name="froopyland"
        image="/projects/froopyland.png"
        alt="Screenshot of froopyland"
      />,
    )
    expect(screen.getByText('zsh — froopyland')).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Screenshot of froopyland' }),
    ).toHaveAttribute('src', '/projects/froopyland.png')
    expect(container.querySelector('pre')).toBeNull()
  })
})
