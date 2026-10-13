import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Project } from '@/lib/projects'

import { ProjectDetails } from './project-details'

const project: Project = {
  slug: 'lorem',
  type: 'web',
  name: 'lorem',
  stack: ['next.js', 'mdx'],
  year: 2026,
  status: 'live',
  role: 'design + build',
  description: 'Lorem ipsum dolor sit amet.',
  preview: {},
  links: {
    primary: 'https://lorem.example.com',
    source: 'https://example.com/lorem',
    writeup: 'https://example.com/lorem/write-up',
  },
}

const linkNames = () =>
  screen.queryAllByRole('link').map((link) => link.textContent)

describe('ProjectDetails', () => {
  it('shows the description, stack, role and year', () => {
    render(<ProjectDetails project={project} />)
    expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeInTheDocument()
    expect(screen.getByText('next.js · mdx')).toBeInTheDocument()
    expect(screen.getByText('design + build')).toBeInTheDocument()
    expect(screen.getByText('2026')).toBeInTheDocument()
  })

  it.each([
    ['web', '→ visit site'],
    ['cli', '→ install'],
    ['lib', '→ npm'],
  ] as const)('labels the primary link of a %s project', (type, label) => {
    render(<ProjectDetails project={{ ...project, type }} />)
    expect(linkNames()).toEqual([label, '→ source', '→ write-up'])
  })

  it('opens the links in a new tab', () => {
    render(<ProjectDetails project={project} />)
    expect(screen.getByRole('link', { name: 'visit site' })).toHaveAttribute(
      'target',
      '_blank',
    )
  })

  it('leaves out links without a URL', () => {
    render(
      <ProjectDetails
        project={{ ...project, links: { source: 'https://example.com' } }}
      />,
    )
    expect(linkNames()).toEqual(['→ source'])
  })

  it('renders no link list without links', () => {
    render(<ProjectDetails project={{ ...project, links: {} }} />)
    expect(screen.queryByRole('list')).toBeNull()
    expect(within(document.body).queryAllByRole('link')).toHaveLength(0)
  })
})
