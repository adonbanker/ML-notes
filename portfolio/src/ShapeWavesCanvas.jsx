import { useEffect, useRef } from 'react'
import './ShapeWaves.css'

/* ------------------------------------------------------------------ *
 * ShapeWaves
 * ------------------------------------------------------------------ *
 * A canvas field of small shapes whose brightness/size is driven by a
 * flowing wave. Optional text is "burned in" by boosting the cells it
 * covers, so a word/glyph glows out of the field. Pointer proximity
 * creates a splash that paints cells toward `hoverColor`.
 *
 * Self-contained (no deps). Honors prefers-reduced-motion by drawing a
 * single static frame.
 * ------------------------------------------------------------------ */

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ]
}
const lerp = (a, b, t) => a + (b - a) * t
const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x)

export default function ShapeWavesCanvas({
  text = '',
  fontFamily = 'system-ui, sans-serif',
  fontWeight = 500,
  textSize = 0.6,
  shapes = 'mixed', // 'dots' | 'squares' | 'mixed'
  cellSize = 10,
  dotSize = 0.75,
  color = '#929292',
  hoverColor = '#ffffff',
  backgroundColor = '#120f17',
  speed = 1,
  scale = 1,
  contrast = 1,
  brightness = 0.4,
  flow = 0,
  direction = 0,
  fade = 0.25,
  interactive = true,
  splashRadius = 40,
  splashStrength = 0.4,
  glow = 0.35,
  intro = true,
  introDuration = 1.6,
  paused = false,
}) {
  const rootRef = useRef(null)
  const canvasRef = useRef(null)
  // Pointer is tracked in CSS px relative to the canvas; -1 means "away".
  const pointer = useRef({ x: -1e5, y: -1e5 })

  useEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!root || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const bg = hexToRgb(backgroundColor)
    const base = hexToRgb(color)
    const hover = hexToRgb(hoverColor)

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let cols = 0
    let rows = 0
    let textMask = null // Float32Array[cols*rows], 0..1 coverage per cell
    let raf = 0
    let startTs = 0

    // Build a downsampled coverage mask of `text` over the current grid.
    function buildTextMask() {
      textMask = null
      if (!text || !text.trim()) return
      const off = document.createElement('canvas')
      off.width = Math.max(1, cols)
      off.height = Math.max(1, rows)
      const octx = off.getContext('2d')
      octx.clearRect(0, 0, off.width, off.height)
      // Font size relative to the shorter grid dimension.
      const fontPx = Math.max(6, Math.floor(Math.min(cols, rows) * textSize))
      octx.fillStyle = '#fff'
      octx.textAlign = 'center'
      octx.textBaseline = 'middle'
      octx.font = `${fontWeight} ${fontPx}px ${fontFamily}`
      octx.fillText(text, cols / 2, rows / 2 + fontPx * 0.04)
      const data = octx.getImageData(0, 0, off.width, off.height).data
      const m = new Float32Array(cols * rows)
      for (let i = 0; i < cols * rows; i++) m[i] = data[i * 4 + 3] / 255
      textMask = m
    }

    function resize() {
      const rect = root.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.max(1, Math.ceil(w / cellSize))
      rows = Math.max(1, Math.ceil(h / cellSize))
      buildTextMask()
    }

    const dirX = Math.cos((direction * Math.PI) / 180)
    const dirY = Math.sin((direction * Math.PI) / 180)
    const maxR = (cellSize / 2) * dotSize

    function shapeFor(cx, cy) {
      if (shapes === 'squares') return 'square'
      if (shapes === 'dots') return 'dot'
      // 'mixed' — stable per-cell pick from a cheap hash.
      const hsh = (cx * 73856093) ^ (cy * 19349663)
      const k = Math.abs(hsh) % 7
      if (k < 4) return 'dot'
      if (k < 6) return 'square'
      return 'diamond'
    }

    function drawShape(kind, x, y, r, rot) {
      if (kind === 'dot') {
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      } else if (kind === 'square') {
        ctx.fillRect(x - r, y - r, r * 2, r * 2)
      } else {
        // diamond
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rot)
        ctx.beginPath()
        ctx.moveTo(0, -r)
        ctx.lineTo(r, 0)
        ctx.lineTo(0, r)
        ctx.lineTo(-r, 0)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
      }
    }

    function frame(ts) {
      if (!startTs) startTs = ts
      const elapsed = (ts - startTs) / 1000
      const t = reduced || paused ? 0 : elapsed * speed

      // Intro: global reveal ramp.
      const introK = intro && !reduced ? clamp01(elapsed / introDuration) : 1
      const introEase = introK * introK * (3 - 2 * introK) // smoothstep

      // Paint background opaque (canvas is alpha:false).
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, w, h)

      const px = pointer.current.x
      const py = pointer.current.y
      const flowOff = flow * t * 0.6

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const x = cx * cellSize + cellSize / 2
          const y = cy * cellSize + cellSize / 2
          // Normalized coords, projected onto the flow direction.
          const nx = (x / w) * 6 * scale
          const ny = (y / h) * 6 * scale
          const proj = nx * dirX + ny * dirY

          // Two-octave travelling wave.
          let v =
            0.5 +
            0.5 *
              (0.6 * Math.sin(nx + proj * 0.5 + t * 1.5 + flowOff) +
                0.4 * Math.sin(ny * 1.3 - proj * 0.4 + t * 1.1 + flowOff * 1.3))
          // Contrast around mid, then overall brightness gain.
          v = clamp01((v - 0.5) * contrast + 0.5) * brightness

          // Text boost.
          if (textMask) {
            const tv = textMask[cy * cols + cx]
            if (tv > 0.01) v = Math.max(v, 0.25 + tv * 0.75)
          }

          // Pointer splash.
          let splash = 0
          if (interactive && px > -1e4) {
            const dx = x - px
            const dy = y - py
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < splashRadius) {
              splash = (1 - d / splashRadius) * splashStrength * 2.2
              v = clamp01(v + splash)
            }
          }

          // Edge fade (vignette).
          if (fade > 0) {
            const fx = Math.min(x / w, 1 - x / w) / fade
            const fy = Math.min(y / h, 1 - y / h) / fade
            const edge = clamp01(Math.min(fx, fy))
            v *= edge
          }

          v *= introEase
          if (v < 0.04) continue

          // Color: bg→base by v, then toward hover by splash.
          const sp = clamp01(splash)
          const r = Math.round(lerp(lerp(bg[0], base[0], v), hover[0], sp))
          const g = Math.round(lerp(lerp(bg[1], base[1], v), hover[1], sp))
          const b = Math.round(lerp(lerp(bg[2], base[2], v), hover[2], sp))
          ctx.fillStyle = `rgb(${r},${g},${b})`

          // Glow on the brightest cells only (keeps it cheap).
          if (glow > 0 && v > 0.55) {
            ctx.shadowBlur = glow * 14 * v
            ctx.shadowColor = `rgb(${r},${g},${b})`
          } else {
            ctx.shadowBlur = 0
          }

          const radius = maxR * (0.25 + 0.75 * v)
          drawShape(shapeFor(cx, cy), x, y, radius, t + cx * 0.1)
        }
      }
      ctx.shadowBlur = 0

      root.setAttribute('data-ready', 'true')
      if (!reduced && !paused) raf = requestAnimationFrame(frame)
    }

    function onMove(e) {
      if (!interactive) return
      const rect = canvas.getBoundingClientRect()
      pointer.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onLeave() {
      pointer.current = { x: -1e5, y: -1e5 }
    }

    resize()
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced || paused) {
        startTs = 0
        requestAnimationFrame(frame)
      }
    })
    ro.observe(root)
    if (interactive) {
      window.addEventListener('pointermove', onMove, { passive: true })
      window.addEventListener('pointerout', onLeave, { passive: true })
    }

    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerout', onLeave)
    }
  }, [
    text, fontFamily, fontWeight, textSize, shapes, cellSize, dotSize,
    color, hoverColor, backgroundColor, speed, scale, contrast, brightness,
    flow, direction, fade, interactive, splashRadius, splashStrength, glow,
    intro, introDuration, paused,
  ])

  return (
    <div ref={rootRef} className="shape-waves" aria-hidden="true">
      <canvas ref={canvasRef} className="shape-waves__canvas" />
    </div>
  )
}
