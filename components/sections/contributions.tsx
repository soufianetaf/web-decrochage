// components/sections/contributions.tsx
// Les 3 contributions méthodologiques originales du mémoire, en cartes « avant → après ».
'use client'

import { motion } from 'framer-motion'
import { Layers, ShieldCheck, GitCompareArrows, MoveRight, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { useI18n } from '@/components/providers/language-provider'

const ICONS: LucideIcon[] = [Layers, ShieldCheck, GitCompareArrows]

export function ContributionsSection() {
  const { t } = useI18n()

  return (
    <section id="contributions" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.contributions.eyebrow}
          title={t.contributions.title}
          subtitle={t.contributions.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.contributions.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={item.tag} index={i} as="article">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-forest-500 text-white">
                        <Icon className="size-6" />
                      </span>
                      <Badge variant="outline">{item.tag}</Badge>
                    </div>

                    <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.desc}</p>

                    {/* Avant → Après */}
                    <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 rounded-xl border border-border bg-forest-50/60 p-4 dark:bg-forest-900/40">
                      <div className="text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {t.contributions.beforeWord}
                        </p>
                        <p className="mt-1 font-display text-base font-bold text-foreground/70 sm:text-lg">
                          {item.before}
                        </p>
                        <p className="text-[11px] text-muted">{item.beforeSub}</p>
                      </div>

                      <motion.span
                        aria-hidden
                        className="text-forest-500 dark:text-moss-400"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <MoveRight className="size-5" />
                      </motion.span>

                      <div className="text-center">
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                          {t.contributions.afterWord}
                        </p>
                        <p className="mt-1 font-display text-base font-bold text-forest-600 dark:text-moss-400 sm:text-lg">
                          {item.after}
                        </p>
                        <p className="text-[11px] text-muted">{item.afterSub}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
