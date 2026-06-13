// components/shared/section-heading.tsx — en-tête de section (badge + titre + sous-titre).
'use client'

import { Reveal } from '@/components/shared/reveal'
import { Badge } from '@/components/ui/badge'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <Reveal>
          <Badge className="mb-4">{eyebrow}</Badge>
        </Reveal>
      )}
      <Reveal index={1}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
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
