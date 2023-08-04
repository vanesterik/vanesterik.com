import { RefObject, useEffect, useState } from 'react'

export const useElementSize = (ref: RefObject<Element>) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width)
      setHeight(entries[0].contentRect.height)
    })

    if (ref.current) resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [ref])
  return { width, height }
}
