// components/sections/hero.tsx
// Hero éditorial piloté par la donnée : la courbe de fiabilité par semaine se trace
// et franchit le seuil 80 % à la S8 — la thèse du projet, en un seul visuel signature.
'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Magnetic } from '@/components/shared/magnetic'
import { useI18n } from '@/components/providers/language-provider'
import { EARLY_PREDICTION_SERIES, RESULTS, PROJECT_META } from '@/lib/data/results'

/* ----- Graphique signature : F1-score par semaine (SVG fait main, tracé animé) ----- */
function ReliabilityChart() {
  const { t } = useI18n()
  const reduce = useReducedMotion()

  const W = 540
  const H = 360
  const padL = 18
  const padR = 18
  const padT = 28
  const padB = 40
  const yMin = 70
  const yMax = 92
  const pw = W - padL - padR
  const ph = H - padT - padB

  const pts = EARLY_PREDICTION_SERIES.map((d, i) => ({
    week: d.week,
    f1: d.f1,
    x: padL + (i / (EARLY_PREDICTION_SERIES.length - 1)) * pw,
    y: padT + (1 - (d.f1 - yMin) / (yMax - yMin)) * ph,
  }))
  const yThreshold = padT + (1 - (80 - yMin) / (yMax - yMin)) * ph
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
  const area = `${line} L ${pts[pts.length - 1].x.toFixed(1)} ${padT + ph} L ${pts[0].x.toFixed(1)} ${padT + ph} Z`
  const crossing = pts[2] // S8 : première semaine ≥ 80 %

  return (
    <figure className="relative rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm sm:p-6">
      <figcaption className="mb-3 flex items-baseline justify-between gap-3">
        <span className="font-display text-sm font-semibold text-foreground">{t.hero.chartTitle}</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{t.hero.chartUnit}</span>
      </figcaption>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={t.hero.chartTitle}>
        <defs>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-forest-500)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--color-forest-500)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Seuil de fiabilité 80 % */}
        <line x1={padL} y1={yThreshold} x2={W - padR} y2={yThreshold} stroke="var(--color-aws)" strokeWidth="1.5" strokeDasharray="5 5" opacity="0.8" />
        <text x={padL} y={yThreshold - 8} className="fill-aws font-mono" fontSize="11">
          {t.hero.chartThreshold}
        </text>

        {/* Aire sous la courbe */}
        <motion.path
          d={area}
          fill="url(#area-grad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        />

        {/* Courbe (tracé animé) */}
        <motion.path
          d={line}
          fill="none"
          stroke="var(--color-forest-500)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 1.6, ease: 'easeInOut' }}
        />

        {/* Points + libellés de semaine */}
        {pts.map((p, i) => (
          <g key={p.week}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={i === 2 ? 6 : 3.5}
              className={i === 2 ? 'fill-aws' : 'fill-forest-500'}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.18, type: 'spring', stiffness: 300, damping: 18 }}
            />
            <text x={p.x} y={H - 16} textAnchor="middle" className="fill-muted font-mono" fontSize="11">
              {p.week}
            </text>
            <text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-foreground font-mono" fontSize="10" opacity={i === 2 ? 1 : 0.55}>
              {p.f1.toFixed(0)}
            </text>
          </g>
        ))}

        {/* Pulse unique au franchissement (S8) */}
        {!reduce && (
          <motion.circle
            cx={crossing.x}
            cy={crossing.y}
            r={6}
            fill="none"
            stroke="var(--color-aws)"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0], scale: [1, 3, 4] }}
            transition={{ delay: 1.1, duration: 1.4, ease: 'easeOut' }}
            style={{ transformOrigin: `${crossing.x}px ${crossing.y}px` }}
          />
        )}
      </svg>

      <p className="mt-2 flex items-center gap-2 font-mono text-xs text-aws">
        <span className="inline-block size-2 rounded-full bg-aws" />
        {t.hero.chartCrossing}
      </p>
    </figure>
  )
}

export function HeroSection() {
  const { t } = useI18n()

  const stats = [
    { v: `${RESULTS.classification.f1}%`, k: 'F1-score' },
    { v: `${RESULTS.explainability.semanticConvergence}%`, k: 'SHAP/LIME' },
    { v: `×${RESULTS.cloud.speedupGlobal}`, k: 'Spark' },
  ]

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden border-b border-border pt-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8">
        {/* Colonne texte */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-forest-500 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-forest-500" />
            </span>
            {t.hero.eyebrowStats}
          </motion.p>

          <h1 className="mt-6 font-display text-[2.1rem] font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.3rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.titleLine1}
            </motion.span>
            <motion.span
              className="relative mt-1 inline-block text-forest-500 dark:text-forest-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {t.hero.titleEmph}
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-full origin-left bg-forest-500/40 dark:bg-forest-400/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
              />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {t.hero.deck}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Magnetic>
              <Button size="lg" asChild>
                <a href="#demo">
                  {t.hero.ctaPrimary}
                  <ArrowDown className="size-4" />
                </a>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button size="lg" variant="secondary" asChild>
                <a href="#resources">
                  <FileDown className="size-4" />
                  {t.hero.ctaSecondary}
                </a>
              </Button>
            </Magnetic>
          </motion.div>

          {/* Ligne de résultats clés — données inline, mono, disciplinée (pas de chips) */}
          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6"
          >
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="font-display text-xl font-bold text-foreground sm:text-2xl">{s.v}</dt>
                <dd className="font-mono text-[11px] uppercase tracking-wider text-muted">{s.k}</dd>
              </div>
            ))}
            <div className="ml-auto self-end font-mono text-[11px] text-muted">
              {PROJECT_META.author} · {PROJECT_META.year}
            </div>
          </motion.dl>
        </div>

        {/* Colonne graphique signature */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <ReliabilityChart />
        </motion.div>
      </div>

      <motion.a
        href="#problem"
        aria-label={t.hero.scroll}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 text-muted"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  )
}
