// components/shared/section-heading.tsx — en-tête de section éditorial (label mono + filet, titre serif).
'use client'

import { Reveal } from '@/components/shared/reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center' }: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <p
            className={cn(
              'flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-forest-500 dark:text-forest-400',
              centered && 'justify-center',
            )}
          >
            <span className="h-px w-6 bg-forest-500/50 dark:bg-forest-400/50" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal index={2}>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  )
}
