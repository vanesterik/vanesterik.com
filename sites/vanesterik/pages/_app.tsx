import { appWithTranslation } from 'next-i18next'
import { AppProps } from 'next/app'
import { Layout } from 'ui'
import 'ui/global.css'

type Props = AppProps

function App({ Component, pageProps }: Props) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default appWithTranslation(App)
