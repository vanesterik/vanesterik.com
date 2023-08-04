import { Listbox } from '@headlessui/react'
import { button, dropdown, icon, IconVariant } from '@vanesterik/ui'
import { dropdownList, dropdownListItem } from '@vanesterik/ui/lib/dropdown'
import { useEffect, useRef, useState } from 'react'

type ThemeOption = {
  icon: string
  name: string
}

type ThemeSelectorProps = {
  options: ThemeOption[]
}

export const ThemeSelector = ({ options }: ThemeSelectorProps) => {
  const [theme, setTheme] = useTheme()

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

const updateTheme = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const useTheme = () => {
  const [theme, setTheme] = useState<string>()
  const initial = useRef(true)

  useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (theme === 'light' || theme === 'dark') {
      setTheme(theme)
    } else {
      setTheme('system')
    }
  }, [])

  useEffect(() => {
    if (theme === 'system') {
      localStorage.removeItem('theme')
    } else if (theme === 'light' || theme === 'dark') {
      localStorage.setItem('theme', theme)
    }
    if (initial.current) {
      // eslint-disable-next-line fp/no-mutation
      initial.current = false
    } else {
      updateTheme()
    }
  }, [theme])

  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

    matchMedia.addEventListener('change', updateTheme)

    const onStorage = () => {
      updateTheme()
      const theme = localStorage.getItem('theme')
      if (theme === 'light' || theme === 'dark') {
        setTheme(theme)
      } else {
        setTheme('system')
      }
    }
    window.addEventListener('storage', onStorage)

    return () => {
      matchMedia.removeEventListener('change', updateTheme)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return [theme, setTheme] as const
}
