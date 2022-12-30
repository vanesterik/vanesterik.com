import { useTranslation } from 'next-i18next'
import { Button } from '../Button'

export const Header = () => {
  return (
    <header className="pb-24 pt-3 z-10">
      <nav>
        <HeaderMenu />
      </nav>
    </header>
  )
}

const HeaderMenu = () => {
  const { t } = useTranslation()
  const menu = t('menu', { returnObjects: true })

  if (typeof menu === 'string') return null

  return (
    <ul className="flex flex-row gap-x-0.5">
      {Object.values(menu).map(([url, name]) => (
        <li key={name}>
          <Button
            href={url}
            label={name}
            variant={url === '/' ? 'ghost' : 'default'}
          />
        </li>
      ))}
    </ul>
  )
}
