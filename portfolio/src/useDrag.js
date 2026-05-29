import { useEffect, useRef, useState } from 'react'

let zTop = 30 // shared stacking counter so the last-grabbed window comes forward

// Lets a window be nudged around by a drag handle (its title bar).
// Uses a translate offset so document layout/scroll is preserved — windows
// stay in flow, they just shift. The pointerdown listener is attached
// natively to the handle element (via the returned ref) and the move/up
// listeners go on `window`, so the pointer can roam anywhere mid-drag and
// nothing is lost to a React render race. Disabled on small screens.
export default function useDrag() {
  const handleRef = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [z, setZ] = useState(20)
  const [dragging, setDragging] = useState(false)
  const offsetRef = useRef(offset)
  offsetRef.current = offset

  useEffect(() => {
    const handle = handleRef.current
    if (!handle) return

    const down = (e) => {
      if (window.innerWidth < 768) return
      if (e.button !== 0) return
      if (e.target.closest('a, button')) return // don't hijack title-bar controls

      zTop += 1
      setZ(zTop)
      setDragging(true)

      const startX = e.clientX
      const startY = e.clientY
      const baseX = offsetRef.current.x
      const baseY = offsetRef.current.y

      const move = (ev) => {
        setOffset({ x: baseX + (ev.clientX - startX), y: baseY + (ev.clientY - startY) })
      }
      const up = () => {
        setDragging(false)
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
        window.removeEventListener('pointercancel', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
      window.addEventListener('pointercancel', up)
    }

    handle.addEventListener('pointerdown', down)
    return () => handle.removeEventListener('pointerdown', down)
  }, [])

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    zIndex: z,
    transition: dragging ? 'none' : 'transform .25s cubic-bezier(.16,1,.3,1)',
  }

  return { handleRef, style, dragging }
}
