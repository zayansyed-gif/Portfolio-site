import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './site/App.jsx'
import CursorTrail from './site/CursorTrail.jsx'
import './styles.css'

function Portfolio() {
  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')
    if (reduceMotion.matches || coarsePointer.matches) return undefined

    let frame = 0
    let lastFrameAt = 0
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let currentCursorX = window.innerWidth / 2
    let currentCursorY = window.innerHeight / 2
    let targetCursorX = currentCursorX
    let targetCursorY = currentCursorY

    const animatePointer = (time) => {
      const elapsed = lastFrameAt ? Math.min((time - lastFrameAt) / 1000, 0.05) : 1 / 60
      lastFrameAt = time
      const amount = 1 - Math.exp(-elapsed * 18)

      currentX += (targetX - currentX) * amount
      currentY += (targetY - currentY) * amount
      currentCursorX += (targetCursorX - currentCursorX) * amount
      currentCursorY += (targetCursorY - currentCursorY) * amount

      root.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`)
      root.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`)
      root.style.setProperty('--cursor-x', `${currentCursorX.toFixed(1)}px`)
      root.style.setProperty('--cursor-y', `${currentCursorY.toFixed(1)}px`)

      const stillMoving = Math.abs(targetX - currentX) > 0.02
        || Math.abs(targetY - currentY) > 0.02
        || Math.abs(targetCursorX - currentCursorX) > 0.1
        || Math.abs(targetCursorY - currentCursorY) > 0.1

      if (stillMoving) frame = requestAnimationFrame(animatePointer)
      else {
        lastFrameAt = 0
        frame = 0
      }
    }

    const onPointer = (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 10
      targetY = (event.clientY / window.innerHeight - 0.5) * 8
      targetCursorX = event.clientX
      targetCursorY = event.clientY
      if (!frame) frame = requestAnimationFrame(animatePointer)
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onPointer)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <><App /><CursorTrail /></>
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode><Portfolio /></React.StrictMode>,
)
