import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import type { Project } from '@/lib/projects'

import { ProjectIndex } from './project-index'

const project = (overrides: Partial<Project>): Project => ({
  slug: 'lorem',
  type: 'web',
  name: 'lorem',
  stack: ['next.js', 'mdx'],
  year: 2026,
  status: 'live',
  role: 'author',
  description: 'Lorem ipsum.',
  preview: {},
  links: {},
  ...overrides,
})

// One project per kind of preview
const projects = [
  project({
    url: 'https://lorem.example.com',
    preview: { image: '/projects/lorem.jpg' },
    links: { primary: 'https://lorem.example.com' },
  }),
  project({
    slug: 'ipsum',
    type: 'cli',
    name: 'ipsum',
    preview: { terminal: [{ text: 'ipsum pack', tone: 'command' }] },
  }),
  project({
    slug: 'dolor',
    type: 'cli',
    name: 'dolor',
    preview: { image: '/projects/dolor.png', frame: 'terminal' },
  }),
  project({
    slug: 'sit',
    type: 'zsh',
    name: 'sit',
    description: 'Sit amet.',
  }),
]

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

  it('opens a row to its screenshot and details', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^lorem/))

    expect(row(/^lorem/)).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('img', { name: 'Screenshot of lorem' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'lorem.example.com' }),
    ).toBeInTheDocument()
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

  it('shows a terminal app screenshot in the terminal frame', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^dolor/))

    // Without the browser frame's address bar
    const image = screen.getByRole('img', { name: 'Screenshot of dolor' })
    expect(image.closest('figure')?.textContent).toBe('')
  })

  it('shows no preview for a project without one', async () => {
    const user = userEvent.setup()
    render(<ProjectIndex projects={projects} />)

    await user.click(row(/^sit/))

    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.queryByText(/^zsh —/)).toBeNull()
    expect(screen.getByText('Sit amet.')).toBeInTheDocument()
  })
})
