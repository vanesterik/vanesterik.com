import clsx from 'clsx'
import { Fragment, useState } from 'react'

type TagLineProps = {
  parts?: string[]
}

export const Tagline = ({ parts = [] }: TagLineProps) => {
  const [activePartIndex, setActivePartIndex] = useState(parts.length - 1)

  if (parts.length === 0) return null

  return (
    <h1 className="font-bold leading-none text-6xl text-sans sm:text-7xl md:text-8xl lg:text-[116px] lg:px-20">
      {parts.map((part, index) => (
        <Fragment key={part}>
          <span
            className={clsx(
              activePartIndex === index
                ? 'relative text-black z-20 dark:text-white'
                : 'relative text-primary-200 z-0 dark:text-primary-800',
            )}
            onMouseEnter={() => setActivePartIndex(index)}
          >
            {part}
          </span>
          <br />
        </Fragment>
      ))}
    </h1>
  )
}
