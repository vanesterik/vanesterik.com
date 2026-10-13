import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectStatus } from './project-status'

describe('ProjectStatus', () => {
  it.each([
    ['live', 'text-info'],
    ['wip', 'text-warning'],
    ['archived', 'text-muted-foreground'],
  ] as const)('labels %s, with a dot in its color', (status, color) => {
    const { container } = render(<ProjectStatus status={status} />)
    expect(container).toHaveTextContent(status)
    expect(screen.getByText('●')).toHaveClass(color)
    expect(screen.getByText('●')).toHaveAttribute('aria-hidden', 'true')
  })
})
