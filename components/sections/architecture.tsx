// components/sections/architecture.tsx
// Stack technique + diagramme d'architecture cloud + liens.
'use client'

import { motion } from 'framer-motion'
import { Cloud, Database, Cpu, GitBranch, Activity, Code2, BarChart3, Box } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { useI18n } from '@/components/providers/language-provider'
import type { Dict } from '@/lib/i18n/dictionary'

const STACK_GROUPS = [
  { label: 'Langages', items: ['Python 3.10', 'SQL', 'Bash'] },
  { label: 'Data', items: ['pandas', 'PySpark', 'NumPy'] },
  { label: 'ML', items: ['scikit-learn', 'XGBoost', 'LightGBM'] },
  { label: 'XAI', items: ['SHAP', 'LIME'] },
  { label: 'Cloud', items: ['Databricks', 'AWS', 'Unity Catalog'] },
  { label: 'ML Ops', items: ['MLflow', 'Optuna'] },
  { label: 'Tooling', items: ['Jupyter', 'Git', 'GitHub Actions'] },
]

const DIAGRAM = [
  { icon: Database, label: 'Notebook Python', sub: 'Ingestion OULAD' },
  { icon: Box, label: 'Unity Catalog', sub: 'S3 + gouvernance' },
  { icon: Cpu, label: 'Spark Cluster', sub: 'Driver + 2 Executors · 4 cœurs' },
  { icon: Activity, label: 'MLflow Tracking', sub: 'Modèles & métriques' },
]

const LINKS = [
  { icon: Code2, label: 'Code source', value: 'github.com/soufiane/dropout-prediction', href: '#resources' },
  { icon: BarChart3, label: 'Notebooks publics', value: 'community.cloud.databricks.com', href: '#resources' },
  { icon: GitBranch, label: 'Modèles MLflow', value: 'Registre de modèles', href: '#resources' },
]

export function ArchitectureSection() {
  const { t } = useI18n()
  return (
    <section id="architecture" className="bg-forest-50/50 py-24 dark:bg-forest-900/30 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.architecture.eyebrow}
          title={t.architecture.title}
          subtitle={t.architecture.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-5">
          {/* Diagramme cloud */}
          <Reveal as="div" className="lg:col-span-2">
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2 text-sm font-medium text-aws">
                  <Cloud className="size-4" /> AWS Cloud · Databricks Workspace
                </div>
                <div className="space-y-3">
                  {DIAGRAM.map((d, i) => (
                    <div key={d.label}>
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-forest-50/60 p-3 dark:bg-forest-700/30"
                      >
                        <span className="flex size-9 items-center justify-center rounded-lg bg-forest-500 text-white">
                          <d.icon className="size-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{d.label}</p>
                          <p className="text-xs text-muted">{d.sub}</p>
                        </div>
                      </motion.div>
                      {i < DIAGRAM.length - 1 && (
                        <div className="ml-[1.85rem] h-3 w-px bg-forest-300 dark:bg-forest-600" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>

          {/* Stack technologique */}
          <Reveal as="div" index={1} className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-6">
                <p className="mb-5 font-display font-semibold text-foreground">
                  {t.architecture.stackTitle}
                </p>
                <div className="space-y-4">
                  {STACK_GROUPS.map((g) => (
                    <div key={g.label} className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">
                        {t.architecture.groups[g.label as keyof Dict['architecture']['groups']]}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {g.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground/80 transition-colors hover:border-forest-300 dark:hover:border-forest-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Liens techniques */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {LINKS.map((l, i) => (
            <Reveal key={l.label} index={i}>
              <a href={l.href} className="block">
                <Card className="h-full">
                  <CardContent className="flex items-center gap-3 p-5">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-forest-50 text-forest-500 dark:bg-forest-700/50 dark:text-moss-500">
                      <l.icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{l.label}</p>
                      <p className="truncate font-mono text-xs text-muted">{l.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
