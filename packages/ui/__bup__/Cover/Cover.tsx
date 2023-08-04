import { useRef } from 'react'
import { useElementSize } from '@vanesterik/utils/hooks'
import { Canvas, Tagline } from './components'

export type CoverProps = {
  tagline?: string[]
  theme?: 'dark' | 'light'
}

export const Cover = ({ tagline, theme }: CoverProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { height, width } = useElementSize(ref)

  return (
    <>
      <div
        className="absolute bottom-0 left-0 right-0 top-0 z-10 pointer-events-none"
        ref={ref}
      >
        {isDimensionsSet({ height, width }) && (
          <Canvas height={height} width={width} theme={theme} />
        )}
      </div>
      <Tagline parts={tagline} />
    </>
  )
}

const isDimensionsSet = ({
  height,
  width,
}: {
  height: number
  width: number
}) => height > 0 && width > 0
