import { GlobalProvider } from '@ladle/react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import common from '../../../sites/vanesterik/public/locales/en/common.json'
import '../global.css'

i18n.use(initReactI18next).init({
  defaultNS: 'common',
  lng: 'en',
  resources: {
    en: {
      common,
    },
  },
})

export const Provider: GlobalProvider = ({ children }) => {
  console.log(i18n)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
