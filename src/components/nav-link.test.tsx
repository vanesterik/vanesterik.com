import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { isCurrentPath, NavLink } from './nav-link'

const pathname = vi.hoisted(() => ({ value: '/' }))

vi.mock('next/navigation', () => ({
  usePathname: () => pathname.value,
}))

beforeEach(() => {
  pathname.value = '/'
})

describe('isCurrentPath', () => {
  it('ignores a trailing slash on either side', () => {
    expect(isCurrentPath('/projects/', '/projects')).toBe(true)
    expect(isCurrentPath('/projects', '/projects/')).toBe(true)
  })

  it('matches home only on the home page', () => {
    expect(isCurrentPath('/', '/')).toBe(true)
    expect(isCurrentPath('/projects/', '/')).toBe(false)
  })

  it('matches nothing without a path', () => {
    expect(isCurrentPath(null, '/')).toBe(false)
  })
})

describe('NavLink', () => {
  it('marks the current page', () => {
    pathname.value = '/projects/'
    render(<NavLink name="projects" url="/projects" />)

    const link = screen.getByRole('link', { name: 'projects' })
    expect(link).toHaveAttribute('aria-current', 'page')
    expect(link).toHaveAttribute('data-variant', 'default')
  })

  it('leaves other pages unmarked, in their usual style', () => {
    pathname.value = '/projects/'
    render(
      <>
        <NavLink name="van_esterik" url="/" />
        <NavLink name="about" url="/about" />
      </>,
    )

    const home = screen.getByRole('link', { name: 'van_esterik' })
    expect(home).not.toHaveAttribute('aria-current')
    expect(home).toHaveAttribute('data-variant', 'ghost')
    expect(screen.getByRole('link', { name: 'about' })).toHaveAttribute(
      'data-variant',
      'secondary',
    )
  })
})
