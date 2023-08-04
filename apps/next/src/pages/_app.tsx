import '@vanesterik/ui/index.css'

import layout from '@vanesterik/data/layout.json'
import { container, main, text } from '@vanesterik/ui'
import { AppProps } from 'next/app'
import {
  Footer,
  Header,
  LinkList,
  Navigation,
  Prompt,
  ThemeSelector,
} from '../components'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={container()}>
      <Header>
        <Navigation items={layout.menu} />
        <ThemeSelector options={layout.theme} />
      </Header>
      <main className={main()}>
        <Component {...pageProps} />
      </main>
      <Footer>
        <Prompt />
        <LinkList items={layout.contact} />
        <Prompt />
        <LinkList items={layout.social} />
        <div className={text({ intent: 'footnote' })}>
          &copy; {new Date().getFullYear().toString()}
        </div>
        <div className={text({ intent: 'footnote' })}>{layout.copyright}</div>
      </Footer>
    </div>
  )
}

export default App
