// components/shared/reveal.tsx — révèle ses enfants au scroll (fade + slide-up), stagger optionnel.
'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface RevealProps {
  children: ReactNode
  index?: number
  className?: string
  as?: 'div' | 'li' | 'article' | 'section'
}

export function Reveal({ children, index = 0, className, as = 'div' }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      custom={index}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  )
}
