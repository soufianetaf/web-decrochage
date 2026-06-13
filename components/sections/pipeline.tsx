// components/sections/pipeline.tsx
// Pipeline méthodologique en 4 modules + encart validation cloud.
'use client'

import { motion } from 'framer-motion'
import { Database, Layers, Brain, Eye, ArrowRight, Cloud, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { useI18n } from '@/components/providers/language-provider'

const META: { icon: LucideIcon; iconBg: string }[] = [
  { icon: Database, iconBg: 'bg-moss-500' },
  { icon: Layers, iconBg: 'bg-forest-500' },
  { icon: Brain, iconBg: 'bg-forest-600' },
  { icon: Eye, iconBg: 'bg-aws' },
]

export function PipelineSection() {
  const { t } = useI18n()
  const modules = t.pipeline.modules.map((m, i) => ({ ...m, ...META[i], n: i + 1 }))
  return (
    <section id="pipeline" className="bg-forest-50/50 py-24 dark:bg-forest-900/30 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.pipeline.eyebrow}
          title={t.pipeline.title}
          subtitle={t.pipeline.subtitle}
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-4">
          {modules.map((m, i) => (
            <Reveal key={m.n} index={i} as="article" className="relative">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex size-12 items-center justify-center rounded-xl text-white ${m.iconBg}`}
                    >
                      <m.icon className="size-6" />
                    </span>
                    <span className="font-display text-4xl font-extrabold text-forest-100 dark:text-forest-700">
                      {m.n}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{m.desc}</p>
                  <Badge className="mt-4 self-start">{m.metric}</Badge>
                </CardContent>
              </Card>
              {/* Flèche entre les modules (desktop) */}
              {i < modules.length - 1 && (
                <motion.span
                  aria-hidden
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-forest-300 dark:text-forest-600 lg:block"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight className="size-5" />
                </motion.span>
              )}
            </Reveal>
          ))}
        </div>

        {/* Encart validation cloud */}
        <Reveal index={1}>
          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-aws/30 bg-aws/5 p-6 sm:flex-row sm:items-center">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-aws text-white">
              <Cloud className="size-6" />
            </span>
            <div>
              <p className="font-display font-semibold text-foreground">{t.pipeline.cloudTitle}</p>
              <p className="mt-1 text-sm text-muted">
                {t.pipeline.cloudDescA}
                <strong className="font-semibold text-foreground">×3,40</strong>
                {t.pipeline.cloudDescB}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
