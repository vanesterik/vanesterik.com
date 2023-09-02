import { Listbox } from '@headlessui/react'
import { button, dropdown, icon, IconVariant } from '@vanesterik/ui'
import { dropdownList, dropdownListItem } from '@vanesterik/ui/lib/dropdown'

import { useTheme } from '../ThemeProvider'

type ThemeOption = {
  icon: string
  name: string
}

type ThemeSelectorProps = {
  options: ThemeOption[]
}

export const ThemeSelector = ({ options }: ThemeSelectorProps) => {
  const { theme, setTheme } = useTheme()

  if (!theme) return null

  return (
    <Listbox value={theme} onChange={setTheme}>
      <div className={dropdown()}>
        <Listbox.Button className={button({ intent: 'secondary' })}>
          <span
            className={icon({
              name: 'sun',
              class: 'dark:hidden',
            })}
          />
          <span
            className={icon({
              name: 'moon',
              class: 'hidden dark:block',
            })}
          />
          {theme}
        </Listbox.Button>
        <Listbox.Options className={dropdownList({ side: 'right' })}>
          {options.map(({ icon: iconName, name }) => (
            <Listbox.Option
              className={dropdownListItem()}
              key={name}
              value={name}
            >
              <span className={icon({ name: iconName as IconVariant })} />
              {name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
