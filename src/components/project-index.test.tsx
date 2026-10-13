import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { getProjects } from '@/lib/projects'

import { ProjectIndex } from './project-index'

const projects = getProjects()

const row = (name: RegExp) => screen.getByRole('button', { name })

describe('ProjectIndex', () => {
  it('lists every project collapsed', () => {
    render(<ProjectIndex projects={projects} />)
    const rows = screen.getAllByRole('button')
    expect(rows).toHaveLength(projects.length)
    for (const button of rows) {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    }
  })

  it('names each row by its name, type, year and status, without the dot', () => {
    render(<ProjectIndex projects={projects} />)
    const lorem = row(/^lorem/)
    expect(lorem).toHaveAccessibleName(/^lorem\s*web\s*2026\s*live$/)
    expect(lorem).not.toHaveAccessibleName(/●/)
  })

  it('leaves the stack to the details', () => {
    render(<ProjectIndex projects={projects} />)
    expect(row(/^lorem/)).not.toHaveTextContent('next.js')
  })

  it('opens a row to its preview and details', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^lorem/))

    expect(row(/^lorem/)).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('img', { name: 'Screenshot of lorem' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'visit site' })).toBeInTheDocument()
  })

  it('keeps one row open at a time, and closes an open row on a click', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^lorem/))
    await user.click(row(/^ipsum/))
    expect(row(/^lorem/)).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('zsh — ipsum')).toBeInTheDocument()

    await user.click(row(/^ipsum/))
    expect(row(/^ipsum/)).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('zsh — ipsum')).toBeNull()
  })

  it('shows no preview for a project without one', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^adipiscing/))

    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.queryByText(/^zsh/)).toBeNull()
    expect(screen.getByText(/^Nemo enim/)).toBeInTheDocument()
  })
})
