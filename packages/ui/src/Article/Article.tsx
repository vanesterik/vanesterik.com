import clsx from 'clsx'
import { Children, ReactNode } from 'react'
import Markdown from 'react-markdown'

type Props = {
  content?: string
  meta?: string
}

export const Article = ({ content, meta }: Props) => {
  if (!content) return null

  return (
    <article>
      {meta && (
        <Container>
          <div className="font-mono font-normal mb-3 text-black text-xs uppercase dark:text-white">
            {meta}
          </div>
        </Container>
      )}
      <Markdown
        components={{
          code: Code,
          h1: Heading1,
          h2: Heading2,
          p: Paragraph,
        }}
      >
        {content}
      </Markdown>
    </article>
  )
}

const Container = ({
  children,
  isLarge,
}: {
  children?: ReactNode
  isLarge?: boolean
}) => (
  <div
    className={clsx(
      isLarge ? 'max-w-3xl' : 'max-w-2xl',
      'mx-auto',
      'px-6',
      'w-full',
    )}
  >
    {children}
  </div>
)

const Code = ({ children }: { children?: ReactNode }) => (
  <span className="font-mono font-normal text-black text-xs uppercase dark:text-white">
    {children}
  </span>
)

const Heading1 = ({ children }: { children?: ReactNode }) => (
  <Container>
    <h1 className="font-bold font-sans mb-10 mt-0 text-black text-3xl dark:text-white">
      {children}
    </h1>
  </Container>
)

const Heading2 = ({ children }: { children?: ReactNode }) => (
  <Container>
    <h1 className="font-bold font-sans mb-3 mt-0 text-black text-xl dark:text-white">
      {children}
    </h1>
  </Container>
)

const Paragraph = ({ children }: { children?: ReactNode }) => {
  const hasImage = checkChildrenForImages(children)

  return (
    <Container isLarge={hasImage}>
      <p className="font-normal font-sans mb-8 text-black text-lg dark:text-white">
        {children}
      </p>
    </Container>
  )
}

const checkChildrenForImages = (children?: ReactNode) =>
  !!Children.toArray(children).find(
    (child) =>
      typeof child === 'object' && 'type' in child && child.type === 'img',
  )
