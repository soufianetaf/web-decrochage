// components/sections/demo.tsx
// Démo interactive : profils types OU ajustement manuel (moteur de scoring live) → prédiction + SHAP.
'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sprout, Scale, AlertTriangle, ArrowRight, RotateCcw, type LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/shared/section-heading'
import { GlossaryTerm } from '@/components/shared/glossary-term'
import { useI18n } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'
import { DEMO_PROFILES, DEMO_ORDER, type DemoProfile } from '@/lib/data/demo'
import {
  SLIDERS,
  DEFAULT_SLIDER_VALUES,
  scoreStudent,
  clusterFromProbability,
} from '@/lib/demo-engine'
import type { Locale } from '@/lib/i18n/dictionary'

const ICONS: Record<DemoProfile['icon'], LucideIcon> = {
  sprout: Sprout,
  scale: Scale,
  alert: AlertTriangle,
}

interface ViewModel {
  probability: number
  clusterCode: string
  clusterLabel: string
  action: string
  horizon: string
  features: { name: string; value: number }[]
}

export function DemoSection() {
  const { t } = useI18n()

  return (
    <section id="demo" className="bg-forest-50/50 py-24 dark:bg-forest-900/30 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.demo.eyebrow} title={t.demo.title} subtitle={t.demo.subtitle} />

        <Tabs defaultValue="profiles" className="mt-12">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="profiles">{t.demo.tabProfiles}</TabsTrigger>
              <TabsTrigger value="manual">{t.demo.tabManual}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profiles">
            <ProfilesMode />
          </TabsContent>
          <TabsContent value="manual">
            <ManualMode />
          </TabsContent>
        </Tabs>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted">{t.demo.note}</p>
      </div>
    </section>
  )
}

/* ----------------------------- Mode profils ----------------------------- */
function ProfilesMode() {
  const { t, locale } = useI18n()
  const [selected, setSelected] = useState<DemoProfile['key']>('atRisk')
  const profile = DEMO_PROFILES[selected]
  const cluster = clusterFromProbability(profile.probability)

  const vm: ViewModel = {
    probability: profile.probability,
    clusterCode: profile.cluster,
    clusterLabel: cluster.label[locale as Locale],
    action: cluster.action[locale as Locale],
    horizon: locale === 'fr' ? 'Dès la semaine 8' : 'From week 8',
    features: profile.topFeatures.map((f) => ({ name: f.name, value: f.value })),
  }

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {DEMO_ORDER.map((key) => {
          const p = DEMO_PROFILES[key]
          const Icon = ICONS[p.icon]
          const isActive = key === selected
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              aria-pressed={isActive}
              className={cn(
                'group rounded-2xl border-2 bg-card p-5 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 cursor-pointer',
                isActive
                  ? 'border-forest-500 shadow-lg dark:border-moss-500'
                  : 'border-border hover:border-forest-300 hover:shadow-md dark:hover:border-forest-600',
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'flex size-11 items-center justify-center rounded-xl transition-colors',
                    isActive
                      ? 'bg-forest-500 text-white'
                      : 'bg-forest-50 text-forest-500 dark:bg-forest-700/50 dark:text-moss-500',
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {t.demo.profiles[key]}
                  </p>
                  <p className="text-xs text-muted">{t.demo.profileHints[key]}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <PredictionAndShap vm={vm} animationKey={selected} />
    </div>
  )
}

/* --------------------------- Mode manuel (live) -------------------------- */
function ManualMode() {
  const { t, locale } = useI18n()
  const [values, setValues] = useState<Record<string, number>>({ ...DEFAULT_SLIDER_VALUES })

  const { probability, contributions } = useMemo(() => scoreStudent(values), [values])
  const cluster = clusterFromProbability(probability)

  const vm: ViewModel = {
    probability,
    clusterCode: cluster.cluster,
    clusterLabel: cluster.label[locale],
    action: cluster.action[locale],
    horizon: locale === 'fr' ? 'Dès la semaine 8' : 'From week 8',
    features: contributions.map((c) => ({ name: c.key, value: c.value })),
  }

  return (
    <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Sliders */}
      <Card>
        <CardContent className="p-8">
          <div className="mb-6 flex items-center justify-between">
            <p className="font-display font-semibold text-foreground">{t.demo.tabManual}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setValues({ ...DEFAULT_SLIDER_VALUES })}
            >
              <RotateCcw className="size-4" />
              {t.demo.reset}
            </Button>
          </div>
          <div className="space-y-6">
            {SLIDERS.map((s) => (
              <div key={s.key}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <label htmlFor={`slider-${s.key}`} className="text-foreground/80">
                    {t.demo.sliders[s.key]}
                  </label>
                  <span className="font-mono font-semibold text-forest-600 dark:text-moss-500">
                    {values[s.key]}
                    {s.key === 'last_day' ? '' : ' %'}
                  </span>
                </div>
                <Slider
                  id={`slider-${s.key}`}
                  min={0}
                  max={100}
                  step={1}
                  value={[values[s.key]]}
                  onValueChange={([v]) => setValues((prev) => ({ ...prev, [s.key]: v }))}
                  aria-label={t.demo.sliders[s.key]}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <PredictionCard vm={vm} live fill={false} />
        <ShapCard vm={vm} fill={false} />
      </div>
    </div>
  )
}

/* ----------------------- Sous-composants partagés ------------------------ */
function riskMeta(p: number, t: ReturnType<typeof useI18n>['t']) {
  if (p < 0.34) return { bar: 'bg-moss-500', text: 'text-moss-600', label: t.demo.riskLow, tone: 'low' as const }
  if (p < 0.67) return { bar: 'bg-aws', text: 'text-aws', label: t.demo.riskMed, tone: 'med' as const }
  return { bar: 'bg-databricks', text: 'text-databricks', label: t.demo.riskHigh, tone: 'high' as const }
}

function PredictionAndShap({ vm, animationKey }: { vm: ViewModel; animationKey: string }) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={`pred-${animationKey}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
        >
          <PredictionCard vm={vm} />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={`shap-${animationKey}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >
          <ShapCard vm={vm} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function PredictionCard({ vm, live = false, fill = true }: { vm: ViewModel; live?: boolean; fill?: boolean }) {
  const { t } = useI18n()
  const risk = riskMeta(vm.probability, t)
  const pct = Math.round(vm.probability * 100)
  return (
    <Card className={cn(fill && 'h-full')}>
      <CardContent className="p-8">
        <p className="text-sm font-medium text-muted">{t.demo.probability}</p>
        <div className="mt-2 flex items-end gap-3">
          <span className={cn('font-display text-5xl font-extrabold tabular-nums', risk.text)}>
            {pct}%
          </span>
          <Badge
            className={cn(
              'mb-2',
              risk.tone === 'high'
                ? 'bg-databricks/15 text-databricks'
                : risk.tone === 'med'
                  ? 'bg-aws/15 text-aws'
                  : 'bg-moss-100 text-moss-600',
            )}
          >
            {risk.label}
          </Badge>
        </div>

        <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-forest-100 dark:bg-forest-700/50">
          <motion.div
            className={cn('h-full rounded-full', risk.bar)}
            animate={{ width: `${pct}%` }}
            transition={{ duration: live ? 0.25 : 0.8, ease: 'easeOut' }}
          />
        </div>

        <Separator className="my-6" />

        <dl className="space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t.demo.riskLevel}</dt>
            <dd className="text-right font-medium text-foreground">
              {vm.clusterCode} — {vm.clusterLabel}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t.demo.action}</dt>
            <dd className="text-right font-medium text-foreground">{vm.action}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted">{t.demo.horizon}</dt>
            <dd className="text-right font-medium text-foreground">{vm.horizon}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

function ShapCard({ vm, fill = true }: { vm: ViewModel; fill?: boolean }) {
  const { t } = useI18n()
  const maxAbs = Math.max(...vm.features.map((f) => Math.abs(f.value)), 0.0001)
  return (
    <Card className={cn(fill && 'h-full')}>
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <p className="font-display font-semibold text-foreground">{t.demo.why}</p>
          <Badge variant="outline" className="text-xs">
            <GlossaryTerm term="SHAP" /> · top {vm.features.length}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-muted">{t.demo.whySub}</p>

        <ul className="mt-6 space-y-4">
          {vm.features.map((f, i) => {
            const widthPct = (Math.abs(f.value) / maxAbs) * 100
            const positive = f.value >= 0
            return (
              <li key={f.name}>
                <div className="mb-1 flex items-center justify-between font-mono text-xs">
                  <span className="text-foreground/80">{f.name}</span>
                  <span
                    className={cn('font-semibold tabular-nums', positive ? 'text-databricks' : 'text-moss-600')}
                  >
                    {positive ? '+' : ''}
                    {f.value.toFixed(2)}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-forest-100 dark:bg-forest-700/50">
                  <motion.div
                    className={cn('h-full rounded-full', positive ? 'bg-databricks' : 'bg-moss-500')}
                    animate={{ width: `${widthPct}%` }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease: 'easeOut' }}
                  />
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-6 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-databricks" /> {t.demo.increases}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-moss-500" /> {t.demo.decreases}
          </span>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="mt-5 px-0 text-forest-500 dark:text-moss-500">
              {t.demo.seeFull}
              <ArrowRight className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{t.demo.dialogTitle}</DialogTitle>
              <DialogDescription>{t.demo.dialogDesc}</DialogDescription>
            </DialogHeader>
            <ShapWaterfall vm={vm} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

function ShapWaterfall({ vm }: { vm: ViewModel }) {
  const { t } = useI18n()
  const base = 0.528
  const maxAbs = Math.max(...vm.features.map((f) => Math.abs(f.value)), 0.0001)
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg bg-forest-50 px-4 py-2 text-sm dark:bg-forest-700/40">
        <span className="text-muted">{t.demo.baseValue}</span>
        <span className="font-mono font-semibold text-foreground">{base.toFixed(3)}</span>
      </div>
      {vm.features.map((f) => {
        const positive = f.value >= 0
        const widthPct = (Math.abs(f.value) / maxAbs) * 100
        return (
          <div key={f.name} className="grid grid-cols-[1fr_2fr_auto] items-center gap-3">
            <span className="truncate font-mono text-xs text-foreground/80">{f.name}</span>
            <div className="relative h-5 rounded bg-forest-50 dark:bg-forest-700/40">
              <div
                className={cn(
                  'absolute top-0 h-full rounded',
                  positive ? 'bg-databricks left-1/2' : 'bg-moss-500 right-1/2',
                )}
                style={{ width: `${widthPct / 2}%` }}
              />
              <span className="absolute left-1/2 top-0 h-full w-px bg-border" />
            </div>
            <span
              className={cn(
                'w-12 text-right font-mono text-xs font-semibold tabular-nums',
                positive ? 'text-databricks' : 'text-moss-600',
              )}
            >
              {positive ? '+' : ''}
              {f.value.toFixed(2)}
            </span>
          </div>
        )
      })}
      <Separator className="my-2" />
      <div className="rounded-lg border border-moss-500/40 bg-moss-50 p-4 text-sm dark:bg-forest-700/30">
        <p className="font-medium text-foreground">{t.demo.convergence}</p>
        <p className="mt-1 text-muted">{t.demo.convergenceDesc}</p>
      </div>
    </div>
  )
}
