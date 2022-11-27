import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Cover } from 'ui'

export default function Index() {
  return (
    <>
      <Cover />
      <h1 className="font-bold px-20 text-[96px] text-sans text-white relative z-10">
        Live to learn. Learn to code. Code to build. Build to live.
      </h1>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations('en', ['common', 'footer'])),
    },
  }
}
