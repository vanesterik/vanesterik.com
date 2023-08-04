import { menu, text } from '@vanesterik/ui'

type LinkListItem = {
  name: string
  url: string
}

type LinkListProps = {
  items: LinkListItem[]
}

export const LinkList = ({ items }: LinkListProps) => (
  <ul className={menu()}>
    {items.map(({ name, url }) => {
      const isMailLink = /mailto:/.test(url)

      return (
        <li key={name}>
          <a
            className={text({ intent: 'link' })}
            href={url}
            rel={isMailLink ? undefined : 'noopener noreferrer'}
            target={isMailLink ? '_self' : '_blank'}
          >
            {name}
          </a>
        </li>
      )
    })}
  </ul>
)
