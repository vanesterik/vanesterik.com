/* eslint-disable fp/no-mutation */
import { useCallback, useEffect, useRef } from 'react'
import { random, repeat } from '@vanesterik/utils/helpers'

const PARTICLE_RADIUS = 200

type CanvasProps = {
  height: number
  width: number
  theme?: 'light' | 'dark'
}

type Particle = {
  type: 'A' | 'B'
  vx: number
  vy: number
  x: number
  y: number
}

export const Canvas = ({ height, width, theme = 'light' }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const requestRef = useRef(0)
  const particlesRef = useRef([
    ...repeat<Particle>(1, () => ({
      type: 'A',
      vx: random(1, 5),
      vy: random(1, 5),
      x: random(0, width / 2),
      y: random(0, height),
    })),
    ...repeat<Particle>(1, () => ({
      type: 'B',
      vx: random(-1, -5),
      vy: random(-1, -5),
      x: random(width / 2, width),
      y: random(0, height),
    })),
  ])

  const updateParticles = useCallback((particle: Particle) => {
    particle.x += particle.vx
    particle.y += particle.vy
  }, [])

  const wallDetection = useCallback(
    (particle: Particle) => {
      if (particle.x + PARTICLE_RADIUS >= width) {
        particle.vx = -particle.vx
        particle.x = width - PARTICLE_RADIUS
      }
      if (particle.x - PARTICLE_RADIUS <= 0) {
        particle.vx = -particle.vx
        particle.x = PARTICLE_RADIUS
      }
      if (particle.y + PARTICLE_RADIUS >= height) {
        particle.vy = -particle.vy
        particle.y = height - PARTICLE_RADIUS
      }
      if (particle.y - PARTICLE_RADIUS <= 0) {
        particle.vy = -particle.vy
        particle.y = PARTICLE_RADIUS
      }
    },
    [height, width],
  )

  const collisionDetection = useCallback(
    (particleA: Particle, _: number, particles: Particle[]) => {
      particles.forEach((particleB) => {
        const distance = calculateDistance(
          particleA.x,
          particleA.y,
          particleB.x,
          particleB.y,
        )

        if (distance - PARTICLE_RADIUS * 2 < 0) {
          // particleB.type =
          // particleA.type !== particleB.type ? particleA.type : particleB.type

          const dx = particleB.x - particleA.x
          const dy = particleB.y - particleA.y
          const vx = particleA.vx - particleB.vx
          const vy = particleA.vy - particleB.vy

          if (dx * vx + dy * vy >= 0) {
            const angle = -Math.atan2(
              particleB.y - particleA.y,
              particleB.x - particleA.x,
            )

            const uA = calculateRotation(particleA.vx, particleA.vy, angle)
            const uB = calculateRotation(particleB.vx, particleB.vy, angle)

            const vA = {
              x: uB.x,
              y: uA.y,
            }
            const vB = {
              x: uA.x,
              y: uB.y,
            }
            const velocityA = calculateRotation(vA.x, vA.y, -angle)
            const velocityB = calculateRotation(vB.x, vB.y, -angle)

            particleA.vx = velocityA.x
            particleA.vy = velocityA.y

            particleB.vx = velocityB.x
            particleB.vy = velocityB.y
          }
        }
      })
    },
    [],
  )

  const clearCanvas = useCallback(() => {
    const context = canvasRef.current?.getContext('2d')

    if (!context) return

    context.clearRect(0, 0, width, height)
  }, [height, width])

  const drawParticles = useCallback(
    (particle: Particle) => {
      const context = canvasRef.current?.getContext('2d')

      if (!context) return

      context.save()
      context.beginPath()
      context.fillStyle = theme === 'light' ? '#d6d3d1' : '#44403c'
      context.lineWidth = 2
      context.strokeStyle = theme === 'light' ? '#d6d3d1' : '#44403c'
      context.arc(particle.x, particle.y, PARTICLE_RADIUS, 0, Math.PI * 2)
      if (particle.type === 'A') {
        context.fill()
      }
      if (particle.type === 'B') {
        context.stroke()
      }
      context.closePath()
      context.restore()
    },
    [theme],
  )

  const animate = useCallback(() => {
    if (!canvasRef.current) return

    const particles = particlesRef.current

    particles.forEach(updateParticles)
    particles.forEach(wallDetection)
    particles.forEach(collisionDetection)

    clearCanvas()

    particles.forEach(drawParticles)

    requestRef.current = requestAnimationFrame(animate)
  }, [
    clearCanvas,
    collisionDetection,
    drawParticles,
    updateParticles,
    wallDetection,
  ])

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
  }, [animate])

  return <canvas height={height} ref={canvasRef} width={width} />
}

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

const calculateRotation = (x: number, y: number, angle: number) => ({
  x: x * Math.cos(angle) - y * Math.sin(angle),
  y: x * Math.sin(angle) + y * Math.cos(angle),
})
