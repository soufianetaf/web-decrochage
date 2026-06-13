// components/layout/reading-progress.tsx — barre de progression de lecture (en haut).
'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[200] h-1 origin-left bg-gradient-to-r from-forest-500 to-moss-500"
      aria-hidden
    />
  )
}
