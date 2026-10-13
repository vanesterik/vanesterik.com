'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { isCurrentPath } from '@/components/nav-link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

type MobileMenuItem = {
  name: string
  url: string
}

type MobileMenuProps = {
  items?: MobileMenuItem[]
}

/**
 * The pages besides home, in a dropdown behind a menu button, for screens
 * too narrow to show them in a row. The layout hides it from md up, where
 * Navigation shows them instead. It marks the current page like NavLink.
 */
export const MobileMenu = ({ items }: MobileMenuProps) => {
  const pathname = usePathname()
  const pages = items?.filter(({ url }) => url !== '/') ?? []

  if (!pages.length) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" aria-label="menu">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {pages.map(({ name, url }) => (
          <DropdownMenuItem
            key={name}
            asChild
            className={
              isCurrentPath(pathname, url)
                ? 'bg-primary text-primary-foreground hover:bg-primary/80 focus:bg-primary/80'
                : undefined
            }
          >
            <Link
              href={url}
              aria-current={isCurrentPath(pathname, url) ? 'page' : undefined}
            >
              {name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
