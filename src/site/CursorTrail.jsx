import { useEffect, useRef } from 'react'

const MAX_PARTICLES = 52
const MAX_POINTS = 42
const TRAIL_LIFETIME = 820
const COLORS = ['#fff4cf', '#f3d989', '#e8c76b', '#d5eafa', '#b7dcf1', '#ffffff']

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d', { alpha: true })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchPointer = window.matchMedia('(pointer: coarse)')
    if (!canvas || !context || reduceMotion.matches || touchPointer.matches) return undefined

    let width = window.innerWidth
    let height = window.innerHeight
    let pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
    let frame = 0
    let previous = null
    let lastMoveAt = 0
    let lastFrameAt = 0
    let lastEnergy = 0
    const points = []
    const particles = []

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const addParticle = (x, y, directionX, directionY, energy, time) => {
      if (particles.length >= MAX_PARTICLES) particles.splice(0, particles.length - MAX_PARTICLES + 1)
      const speed = 22 + energy * 66
      const jitter = (Math.random() - 0.5) * 58
      particles.push({
        x, y,
        vx: -directionX * speed + jitter,
        vy: -directionY * speed + (Math.random() - 0.5) * 58,
        born: time,
        life: 570 + Math.random() * 300,
        size: 0.65 + Math.random() * 0.85 + energy * 0.45,
        phase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return
      const time = performance.now()
      const point = { x: event.clientX, y: event.clientY, time, energy: 0 }
      lastMoveAt = time

      if (previous) {
        const dx = point.x - previous.x
        const dy = point.y - previous.y
        const distance = Math.hypot(dx, dy)
        const elapsed = Math.max(7, time - previous.time)
        const energy = clamp(distance / elapsed / 1.05, 0, 1)
        point.energy = energy
        lastEnergy = energy

        if (distance > 1) {
          const count = Math.min(18, Math.max(1, Math.ceil(distance / 7)))
          const directionX = dx / distance
          const directionY = dy / distance
          for (let index = 1; index <= count; index += 1) {
            const ratio = index / count
            const x = previous.x + dx * ratio
            const y = previous.y + dy * ratio
            const timeAtPoint = previous.time + elapsed * ratio
            points.push({ x, y, time: timeAtPoint, energy })
            addParticle(x, y, directionX, directionY, energy, timeAtPoint)
          }
        }
      }

      points.push(point)
      if (points.length > MAX_POINTS) points.splice(0, points.length - MAX_POINTS)
      previous = point
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const drawStar = (x, y, alpha, energy) => {
      const radius = 2.1 + energy * 1.05
      context.save()
      context.globalAlpha = alpha
      context.shadowColor = '#ffe6a0'
      context.shadowBlur = 12 + energy * 8
      context.fillStyle = '#fff3cc'
      context.beginPath()
      context.moveTo(x, y - radius * 1.8)
      context.quadraticCurveTo(x + radius * 0.25, y - radius * 0.25, x + radius * 1.8, y)
      context.quadraticCurveTo(x + radius * 0.25, y + radius * 0.25, x, y + radius * 1.8)
      context.quadraticCurveTo(x - radius * 0.25, y + radius * 0.25, x - radius * 1.8, y)
      context.quadraticCurveTo(x - radius * 0.25, y - radius * 0.25, x, y - radius * 1.8)
      context.fill()
      context.restore()
    }

    function draw(now) {
      frame = 0
      const delta = Math.min(0.04, Math.max(0, (now - lastFrameAt) / 1000))
      lastFrameAt = now
      context.clearRect(0, 0, width, height)

      while (points.length && now - points[0].time > TRAIL_LIFETIME) points.shift()
      if (points.length > 1) {
        context.lineCap = 'round'
        context.lineJoin = 'round'
        for (let index = 1; index < points.length; index += 1) {
          const start = points[index - 1]
          const end = points[index]
          const age = Math.max(0, now - end.time)
          const fade = Math.max(0, 1 - age / TRAIL_LIFETIME)
          if (fade <= 0) continue
          const energy = (start.energy + end.energy) * 0.5
          context.save()
          context.globalAlpha = fade * (0.2 + energy * 0.29)
          context.strokeStyle = index % 4 === 0 ? '#d5eafa' : '#f1d98e'
          context.lineWidth = 1 + energy * 1.2
          context.shadowColor = index % 4 === 0 ? '#d5eafa' : '#f1d98e'
          context.shadowBlur = 5 + energy * 8
          context.beginPath()
          context.moveTo(start.x, start.y)
          context.quadraticCurveTo(start.x, start.y, end.x, end.y)
          context.stroke()
          context.restore()
        }
      }

      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index]
        const age = now - particle.born
        if (age >= particle.life) {
          particles.splice(index, 1)
          continue
        }
        const seconds = delta
        particle.x += particle.vx * seconds
        particle.y += particle.vy * seconds + Math.sin(age * 0.012 + particle.phase) * seconds * 3
        particle.vx *= 0.986
        particle.vy *= 0.986
        const fade = 1 - age / particle.life
        const size = particle.size * (0.32 + fade * 0.68)
        context.save()
        context.globalAlpha = fade * 0.76
        context.fillStyle = particle.color
        context.shadowColor = particle.color
        context.shadowBlur = 5 + size * 4
        context.beginPath()
        context.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        context.fill()
        context.restore()

        if (size > 0.8) {
          context.save()
          context.globalAlpha = fade * 0.3
          context.strokeStyle = particle.color
          context.lineWidth = 0.7
          context.shadowColor = particle.color
          context.shadowBlur = 5
          context.beginPath()
          context.moveTo(particle.x, particle.y)
          context.quadraticCurveTo(particle.x - particle.vx * 0.012, particle.y - 1.2, particle.x - particle.vx * 0.027, particle.y - particle.vy * 0.025)
          context.stroke()
          context.restore()
        }
      }

      const starFade = Math.max(0, 1 - (now - lastMoveAt) / 900)
      if (previous && starFade > 0) drawStar(previous.x, previous.y, starFade, lastEnergy)

      if (points.length || particles.length || starFade > 0) frame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) cancelAnimationFrame(frame)
      context.clearRect(0, 0, width, height)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}
