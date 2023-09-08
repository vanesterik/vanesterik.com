import { button, stack } from '@vanesterik/ui'
import Link from 'next/link'

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
      <ul className={stack({ direction: 'row' })}>
        {items.map(({ name, url }) => (
          <li key={name}>
            <Link
              className={button({
                intent: url === '/' ? 'ghost' : 'secondary',
              })}
              href={url}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
