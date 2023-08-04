import { cva } from 'class-variance-authority'

export const header = cva(['pb-24', 'pt-3', 'z-10'])

/*
type ThemeListboxProps = {
  themes: string[][]
}

export const ThemeListbox = ({ themes }: ThemeListboxProps) => {
  const [activeTheme, setActiveTheme] = useState<string[]>()

  useEffect(() => {
    if (themes?.length) setActiveTheme(themes[0])
  }, [themes])

  if (!activeTheme) return null

  return (
    <Listbox value={activeTheme} onChange={setActiveTheme}>
      <div className="relative">
        <Listbox.Button
          className={clsx(
            'block',
            'h-8',
            'pt-[1px]',
            'px-2',
            'rounded',
            'bg-primary-200/80',
            'hover:bg-primary-200',
            'active:text-black',
            'active:bg-secondary-500',
            'dark:text-white',
            'dark:fill-white',
            'dark:bg-primary-800/80',
            'dark:hover:bg-primary-800',
            'dark:active:text-black',
            'dark:active:fill-black',
            'dark:active:bg-secondary-500',
          )}
        >
          <ThemeOption theme={activeTheme} />
        </Listbox.Button>
        <Listbox.Options
          className={clsx(
            'absolute',
            'mt-0.5',
            'overflow-hidden',
            'right-0',
            'rounded',
            'w-32',
            'focus:outline-none',
          )}
        >
          {themes.map((theme, index) => (
            <Listbox.Option
              className={clsx(
                'cursor-pointer',
                'px-2',
                'relative',
                'select-none',
                'text-black',
                'bg-primary-200/80',
                'hover:bg-primary-300',
                'active:text-black',
                'active:bg-secondary-500',
                'dark:text-white',
                'dark:fill-white',
                'dark:bg-primary-800/80',
                'dark:hover:bg-primary-800',
                'dark:active:text-black',
                'dark:active:fill-black',
                'dark:active:bg-secondary-500',
              )}
              key={index}
              value={theme}
            >
              <ThemeOption theme={theme} />
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}

type ThemeOptionProps = {
  theme: string[]
}

const ThemeOption = ({ theme: [name, icon] }: ThemeOptionProps) => (
  <>
    <Icon className={clsx('inline', '-mt-0.5')} name={icon as IconName} />
    <span
      className={clsx(
        'font-normal',
        'font-mono',
        'leading-8',
        'ml-0.5',
        'text-xs',
        'uppercase',
      )}
    >
      {name}
    </span>
  </>
)
*/
