import { Canvas, useFrame, useThree } from '@react-three/fiber'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import { Fragment, useRef } from 'react'
import { black, stone, white } from 'tailwindcss/colors'
import { MathUtils, PlaneGeometry } from 'three'

export type CoverProps = {
  theme?: 'dark' | 'light'
}

export const Cover = ({ theme }: CoverProps) => (
  <>
    <div className="absolute bottom-0 left-0 right-0 top-0">
      <Canvas linear>
        <Camera theme={theme} />
        <Plane />
      </Canvas>
    </div>
    <div className="relative z-10">
      <Tagline />
    </div>
  </>
)

export const Camera = ({ theme = 'light' }: CoverProps) => {
  useThree(({ camera }) => {
    camera.rotation.set(MathUtils.degToRad(60), 0, 0)
  })

  return (
    <>
      <fog attach="fog" args={[theme === 'dark' ? black : white, 0, 40]} />
      <ambientLight />
    </>
  )
}

export const Plane = () => {
  const width = 200
  const height = width
  const widthSegments = width / 5
  const heightSegments = widthSegments
  const angle = 6
  const intensity = 3
  const speed = 5
  const swell = 8

  const ref = useRef<PlaneGeometry>(null!)

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed
    const { position } = ref?.current?.attributes ?? {}

    for (let i = 0; i < position.count; i += 1) {
      position.setZ(i, intensity * Math.sin(i / angle + (time + i) / swell))
    }
    position.needsUpdate = true
  })

  return (
    <mesh>
      <planeGeometry
        args={[width, height, widthSegments, heightSegments]}
        ref={ref}
      />
      <meshStandardMaterial color={stone[400]} wireframe />
    </mesh>
  )
}

export const Tagline = () => {
  const { t } = useTranslation()
  const tagline = t('tagline', { returnObjects: true })

  if (typeof tagline === 'string') return null

  return (
    <h1 className="font-bold leading-none text-6xl text-sans sm:text-7xl md:text-8xl lg:text-[116px] lg:px-20">
      {Object.values(tagline).map((part, index, array) => (
        <Fragment key={part}>
          <span
            className={clsx(
              index === array.length - 1
                ? 'text-stone-700 dark:text-white'
                : 'text-stone-300 dark:text-stone-600',
            )}
          >
            {part}
          </span>
          <br />
        </Fragment>
      ))}
    </h1>
  )
}
