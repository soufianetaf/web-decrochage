// components/shared/reveal.tsx — révèle ses enfants au scroll (fade + slide-up), stagger optionnel.
'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96, filter: 'blur(8px)' },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      scale: { type: 'spring', stiffness: 130, damping: 18, delay: i * 0.1 },
    },
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
