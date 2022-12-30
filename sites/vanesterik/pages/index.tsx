import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Cover } from 'ui'

export default function Index() {
  return <Cover />
}

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en')),
    },
  }
}
