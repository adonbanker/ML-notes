import { useState } from 'react'
import ShapeWavesGPU from './ShapeWavesGPU'
import ShapeWavesCanvas from './ShapeWavesCanvas'

/* ------------------------------------------------------------------ *
 * ShapeWaves wrapper
 * ------------------------------------------------------------------ *
 * Renders the WebGPU implementation (ShapeWavesGPU) where supported, and
 * gracefully falls back to the Canvas 2D implementation (ShapeWavesCanvas)
 * when WebGPU is missing or the GPU pipeline errors — so the animation
 * still shows on any device.
 * ------------------------------------------------------------------ */
export default function ShapeWaves(props) {
  // Synchronous feature-detect (client-only app, navigator is always present).
  const [hasGPU] = useState(
    () => typeof navigator !== 'undefined' && !!navigator.gpu,
  )
  const [gpuFailed, setGpuFailed] = useState(false)

  if (!hasGPU || gpuFailed) return <ShapeWavesCanvas {...props} />

  return (
    <ShapeWavesGPU
      {...props}
      onError={(err) => {
        setGpuFailed(true) // downgrade to canvas
        props.onError?.(err)
      }}
    />
  )
}
