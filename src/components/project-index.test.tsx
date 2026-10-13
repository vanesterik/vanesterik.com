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

  it('names each row by its type, name and status, without the dot or marker', () => {
    render(<ProjectIndex projects={projects} />)
    const lorem = row(/^web\s*lorem/)
    expect(lorem).toHaveAccessibleName(/^web\s*lorem.*live$/)
    expect(lorem).not.toHaveAccessibleName(/[●+]/)
  })

  it('opens a row to its preview and details', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^web\s*lorem/))

    expect(row(/^web\s*lorem/)).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('img', { name: 'Screenshot of lorem' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'visit site' })).toBeInTheDocument()
  })

  it('keeps one row open at a time, and closes an open row on a click', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^web\s*lorem/))
    await user.click(row(/^cli\s*ipsum/))
    expect(row(/^web\s*lorem/)).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('zsh — ipsum')).toBeInTheDocument()

    await user.click(row(/^cli\s*ipsum/))
    expect(row(/^cli\s*ipsum/)).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('zsh — ipsum')).toBeNull()
  })

  it('shows no preview for a project without one', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^lib\s*adipiscing/))

    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.queryByText(/^zsh/)).toBeNull()
    expect(screen.getByText(/^Nemo enim/)).toBeInTheDocument()
  })

  it('hides the header row from screen readers', () => {
    const { container } = render(<ProjectIndex projects={projects} />)
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      'typenamestackyearstatus',
    )
  })
})
