// components/shared/magnetic.tsx
// Effet « magnétique » : l'élément suit légèrement le curseur (GSAP quickTo), revient au repos.
'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'

interface MagneticProps {
  children: ReactNode
  /** Intensité du déplacement (px max ≈ strength * 40). */
  strength?: number
  className?: string
}

export function Magnetic({ children, strength = 0.4, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const xTo = useRef<((v: number) => void) | null>(null)
  const yTo = useRef<((v: number) => void) | null>(null)

  function ensure() {
    if (!ref.current) return
    if (!xTo.current) {
      xTo.current = gsap.quickTo(ref.current, 'x', { duration: 0.5, ease: 'elastic.out(1, 0.4)' })
      yTo.current = gsap.quickTo(ref.current, 'y', { duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    }
  }

  function onMove(e: React.MouseEvent) {
    ensure()
    const el = ref.current
    if (!el || !xTo.current || !yTo.current) return
    const r = el.getBoundingClientRect()
    const relX = e.clientX - (r.left + r.width / 2)
    const relY = e.clientY - (r.top + r.height / 2)
    xTo.current(relX * strength)
    yTo.current(relY * strength)
  }

  function onLeave() {
    xTo.current?.(0)
    yTo.current?.(0)
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {children}
    </span>
  )
}
