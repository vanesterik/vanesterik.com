import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation('footer')

  return (
    <footer className="grid grid-cols-[3.5rem_auto] gap-8 pb-3 pt-24 z-10">
      <Prompt />
      <FooterMenu name="contact" />
      <Prompt />
      <FooterMenu name="social" />
      <div className="font-mono text-stone-300 text-xs dark:text-stone-700">
        <span className="font-sans">&copy;</span>{' '}
        {new Date().getFullYear().toString()}
      </div>
      <div className="font-mono text-stone-300 text-xs uppercase dark:text-stone-700">
        {t('copyright')}
      </div>
    </footer>
  )
}

const Prompt = () => (
  <div className="font-mono text-black text-xs dark:text-white">
    &gt;&gt;&gt;
  </div>
)

const FooterMenu = ({ name }: { name: string }) => {
  const { t } = useTranslation('footer')
  const menu = t(name, { returnObjects: true })

  if (typeof menu === 'string') return null

  return (
    <ul className="leading-4">
      {Object.values(menu).map(([url, name]) => (
        <li key={name}>
          <a
            className="font-mono text-black text-xs uppercase hover:text-red-500 dark:text-white dark:hover:text-red-500"
            href={url}
            target={/mailto:/.test(url) ? '_self' : '_blank'}
          >
            {name}
          </a>
        </li>
      ))}
    </ul>
  )
}
