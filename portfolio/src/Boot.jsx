import { useEffect, useRef, useState } from 'react'

const LINES = [
  'ADON_OS v1.0  —  (c) 2026 Adon S. Banker',
  'BIOS check ............ OK',
  'Loading kernel ........ OK',
  'Mounting C:\\Adon ...... OK',
  'Starting services:',
  '  > profile.sys ....... OK',
  '  > works.sys ......... OK',
  '  > contact.sys ....... OK',
  '  > resume.sys ........ OK',
  'Launching desktop ...',
]

export default function Boot({ onDone }) {
  const [shown, setShown] = useState(0) // how many lines printed
  const [progress, setProgress] = useState(0)
  const [closing, setClosing] = useState(false)
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    // Reduced motion: skip straight to the desktop.
    if (reduced.current) {
      onDone()
      return
    }

    let line = 0
    const lineTimer = setInterval(() => {
      line += 1
      setShown(line)
      if (line >= LINES.length) clearInterval(lineTimer)
    }, 180)

    const progTimer = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 14 + 6))
    }, 130)

    const finish = setTimeout(() => {
      setProgress(100)
      setClosing(true)
      setTimeout(onDone, 600) // allow fade-out
    }, 2300)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progTimer)
      clearTimeout(finish)
    }
  }, [onDone])

  if (reduced.current) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#0c0f0a] transition-opacity duration-500 ${
        closing ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* CRT scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0 1px, transparent 1px 3px)',
        }}
      />
      <div className="w-full max-w-lg px-6 font-mono text-[15px] leading-relaxed text-[#8fd14f]">
        {LINES.slice(0, shown).map((l, i) => (
          <div key={i} className="whitespace-pre">
            {l}
          </div>
        ))}
        <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-[#8fd14f]" />

        <div className="mt-6">
          <div className="mb-1 flex justify-between text-xs text-[#8fd14f]/70">
            <span>LOADING</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 w-full border border-[#8fd14f]/60">
            <div
              className="h-full bg-[#8fd14f] transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
