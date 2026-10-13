import { describe, expect, it } from 'vitest'

import { getProjects } from './projects'

const project = (overrides: Record<string, unknown> = {}) => ({
  slug: 'lorem',
  type: 'web',
  name: 'lorem',
  stack: ['next.js'],
  year: 2026,
  status: 'live',
  role: 'author',
  description: 'Lorem ipsum.',
  preview: {},
  links: {},
  ...overrides,
})

describe('getProjects', () => {
  it('reads the projects in content/projects.json', () => {
    expect(getProjects().length).toBeGreaterThan(0)
  })

  it('orders newest first, keeping the file order within a year', () => {
    const projects = getProjects([
      project({ slug: 'a', year: 2021 }),
      project({ slug: 'b', year: 2026 }),
      project({ slug: 'c', year: 2021 }),
    ])
    expect(projects.map(({ slug }) => slug)).toEqual(['b', 'a', 'c'])
  })

  it('keeps the terminal lines and links', () => {
    const [result] = getProjects([
      project({
        type: 'cli',
        preview: { terminal: [{ text: 'ls', tone: 'command' }] },
        links: { source: 'https://example.com' },
      }),
    ])
    expect(result.preview.terminal).toEqual([{ text: 'ls', tone: 'command' }])
    expect(result.links).toEqual({ source: 'https://example.com' })
  })

  it.each([
    [
      'a missing field',
      { year: undefined },
      'lorem: "year" must be a whole number',
    ],
    [
      'an unknown type',
      { type: 'app' },
      'lorem: "type" must be one of web, cli, lib',
    ],
    [
      'an unknown status',
      { status: 'Live' },
      'lorem: "status" must be one of live, wip, archived',
    ],
    [
      'an unknown tone',
      { preview: { terminal: [{ text: 'ls', tone: 'warning' }] } },
      'lorem: "tone" must be one of command, info, warn, success',
    ],
  ])('fails, naming the project, on %s', (_, overrides, message) => {
    expect(() => getProjects([project(overrides)])).toThrow(message)
  })

  it('names a project by its position when its slug is missing', () => {
    expect(() =>
      getProjects([project(), project({ slug: undefined })]),
    ).toThrow('project 2: "slug" must be a non-empty string')
  })

  it('fails on a duplicate slug', () => {
    expect(() => getProjects([project(), project()])).toThrow(
      'lorem: the slug is used twice',
    )
  })
})
