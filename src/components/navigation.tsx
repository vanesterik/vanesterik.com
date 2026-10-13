import { NavLink } from '@/components/nav-link'

type NavigationItem = {
  name: string
  url: string
}

type NavigationProps = {
  items?: NavigationItem[]
}

export const Navigation = ({ items }: NavigationProps) => {
  if (!items?.length) return null

  return (
    <nav>
      <ul className="flex flex-row gap-x-0.5">
        {items.map(({ name, url }) => (
          // Below md, MobileMenu holds the pages besides home
          <li key={name} className={url === '/' ? undefined : 'max-md:hidden'}>
            <NavLink name={name} url={url} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
