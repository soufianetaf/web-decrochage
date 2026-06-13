// components/shared/animated-words.tsx
// Révèle un texte mot par mot (slide-up + fade + déflou), avec délai/stagger paramétrable.
'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedWordsProps {
  text: string
  className?: string
  /** Classe appliquée à chaque mot (ex. dégradé). */
  wordClassName?: string
  delay?: number
  stagger?: number
}

export function AnimatedWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.08,
}: AnimatedWordsProps) {
  const words = text.split(' ')
  return (
    <span className={cn('inline', className)}>
      {words.map((word, i) => (
        <span key={word + '-' + i}>
          <motion.span
            className={cn('inline-block', wordClassName)}
            initial={{ y: 28, opacity: 0, filter: 'blur(6px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  )
}
