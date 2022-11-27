import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { black, stone } from 'tailwindcss/colors'
import { MathUtils, PlaneGeometry } from 'three'

export const Cover = () => (
  <div className="absolute bottom-0 left-0 right-0 top-0">
    <Canvas linear>
      <Camera />
      <Plane />
    </Canvas>
  </div>
)

export const Camera = () => {
  useThree(({ camera }) => {
    camera.rotation.set(MathUtils.degToRad(60), 0, 0)
  })

  return (
    <>
      <fog attach="fog" args={[black, 0, 40]} />
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
