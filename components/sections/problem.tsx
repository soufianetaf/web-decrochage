// components/sections/problem.tsx
// Trois statistiques clés avec compteurs animés au scroll.
'use client'

import { useRef } from 'react'
import { useInView } from 'framer-motion'
import CountUp from 'react-countup'
import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { STATS } from '@/lib/data/results'
import { useI18n } from '@/components/providers/language-provider'

export function ProblemSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="problem" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.problem.eyebrow}
          title={t.problem.title}
          subtitle={t.problem.subtitle}
        />

        <div ref={ref} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={i} index={i} as="article">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col p-8">
                  <div className="font-display text-5xl font-extrabold text-forest-500 dark:text-moss-500">
                    {inView ? (
                      <CountUp
                        end={stat.value}
                        decimals={stat.decimals}
                        duration={1.6}
                        prefix={'prefix' in stat ? stat.prefix : ''}
                        suffix={stat.suffix}
                        decimal=","
                      />
                    ) : (
                      <span>0{stat.suffix}</span>
                    )}
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-foreground/80">
                    {t.problem.stats[i]}
                  </p>
                  <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted">
                    {t.problem.source} : {stat.source}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
