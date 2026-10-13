import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ProjectStatus } from './project-status'

describe('ProjectStatus', () => {
  it.each([
    ['live', 'text-info'],
    ['wip', 'text-warning'],
    ['archived', 'text-muted-foreground'],
  ] as const)('shows %s as a dot in its color', (status, color) => {
    render(<ProjectStatus status={status} />)
    expect(screen.getByText('●')).toHaveClass(color)
    expect(screen.getByText('●')).toHaveAttribute('aria-hidden', 'true')
  })

  it('keeps the label for screen readers only', () => {
    render(<ProjectStatus status="wip" />)
    expect(screen.getByText('wip')).toHaveClass('sr-only')
  })

  it('shows the label in a tooltip when hovering the dot', async () => {
    const user = userEvent.setup()
    render(<ProjectStatus status="live" />)

    await user.hover(screen.getByText('●'))

    expect(await screen.findByRole('tooltip')).toHaveTextContent('live')
  })
})
