// components/sections/hero.tsx
// Hero narratif : l'étudiant (gauche) relié par un flux de données à l'IA/robot (droite).
// Typo XXL à dégradé animé, chips de stats flottantes, parallax, hologramme au survol du CTA.
// Mobile-first : texte d'abord, personnages côte à côte en dessous.
'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { ArrowDown, FileDown, GraduationCap, TrendingUp, Target, CalendarClock, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AnimatedWords } from '@/components/shared/animated-words'
import { PROJECT_META } from '@/lib/data/results'
import { useI18n } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

const EASE = [0.37, 0, 0.63, 1] as const

/* ----------------------------- Chip de stat flottante ----------------------------- */
interface StatChipProps {
  icon: React.ReactNode
  value: string
  label: string
  className?: string
  delay?: number
  floatDuration?: number
}

function StatChip({ icon, value, label, className, delay = 1.6, floatDuration = 4 }: StatChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 200, damping: 16 }}
      className={cn('absolute z-10', className)}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: floatDuration, repeat: Infinity, ease: EASE, delay }}
        className="flex items-center gap-2 rounded-xl border border-border bg-card/85 px-3 py-2 shadow-lg shadow-forest-500/10 backdrop-blur-md"
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-forest-50 text-forest-500 dark:bg-forest-700/60 dark:text-moss-400">
          {icon}
        </span>
        <span className="leading-tight">
          <span className="block font-display text-sm font-bold text-foreground">{value}</span>
          <span className="block text-[10px] font-medium uppercase tracking-wide text-muted">{label}</span>
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ----------------------------- Personnage flottant ----------------------------- */
interface CharacterProps {
  src: string
  alt: string
  parallax: MotionValue<number>
  floatDuration: number
  floatDelay: number
  floatAmp?: number
  sway?: number
  aspect?: string
  halo?: boolean
  priority?: boolean
  children?: React.ReactNode
}

function Character({
  src, alt, parallax, floatDuration, floatDelay, floatAmp = 16, sway = 0,
  aspect = 'aspect-[3/4]', halo = false, priority, children,
}: CharacterProps) {
  return (
    <motion.div style={{ y: parallax }} className="relative">
      {halo && (
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-1/2 mx-auto size-44 -translate-y-1/2 rounded-full bg-moss-400/30 blur-3xl dark:bg-moss-500/25 sm:size-56"
          animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: EASE }}
        />
      )}

      <motion.div
        animate={{ y: [0, -floatAmp, 0], rotate: sway ? [0, sway, 0, -sway, 0] : 0 }}
        transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: EASE }}
        whileHover={{ scale: 1.06, transition: { duration: 0.3 } }}
        className="group relative mx-auto w-full max-w-[200px] cursor-pointer sm:max-w-[260px] lg:max-w-[300px]"
      >
        <div className={cn('relative', aspect)}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 35vw, 300px"
            className="object-contain drop-shadow-2xl"
          />
          {children}
        </div>
      </motion.div>

      {/* Ombre au sol dynamique (opposition de phase avec le flottement) */}
      <motion.div
        aria-hidden
        className="mx-auto mt-1 h-3 w-3/5 rounded-[100%] bg-forest-900/25 blur-md dark:bg-black/50 sm:h-4"
        animate={{ scaleX: [1, 0.8, 1], opacity: [0.55, 0.3, 0.55] }}
        transition={{ duration: floatDuration, delay: floatDelay, repeat: Infinity, ease: EASE }}
      />
    </motion.div>
  )
}

/* ----------------------- Hologramme projeté par le robot ----------------------- */
function Hologram({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.7 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.8 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="pointer-events-none absolute -top-12 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: EASE }}
            className="relative flex items-center gap-2 rounded-xl border border-moss-400/50 bg-moss-50/80 px-3 py-2 shadow-lg shadow-moss-500/30 backdrop-blur-md dark:bg-moss-500/15"
          >
            <GraduationCap className="size-5 text-moss-600 dark:text-moss-400" />
            <div className="flex items-end gap-0.5" aria-hidden>
              {[5, 9, 7, 12, 14].map((h, i) => (
                <motion.span
                  key={i}
                  className="w-1 rounded-sm bg-forest-500 dark:bg-moss-400"
                  initial={{ height: 2 }}
                  animate={{ height: h }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.3 }}
                />
              ))}
            </div>
            <TrendingUp className="size-4 text-forest-500 dark:text-moss-400" />
            <div
              aria-hidden
              className="absolute -bottom-10 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-moss-400/70 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ------------------- Ligne de flux de données étudiant ↔ robot ------------------- */
function DataFlowLine() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1000 300"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-48 w-full -translate-y-1/2 lg:block"
    >
      <defs>
        <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-forest-400)" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="var(--color-moss-400)" stopOpacity="0.45" />
          <stop offset="1" stopColor="var(--color-moss-500)" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 120 180 C 320 60, 680 60, 880 150"
        fill="none"
        stroke="url(#flow-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="flow-line"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
      />
    </svg>
  )
}

/* ----------------------------------- Hero ----------------------------------- */
export function HeroSection() {
  const { t } = useI18n()
  const ref = useRef<HTMLElement>(null)
  const [holo, setHolo] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const yStudent = useTransform(scrollYProgress, [0, 1], [0, -70])
  const yRobot = useTransform(scrollYProgress, [0, 1], [0, -150])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-dvh overflow-hidden bg-gradient-to-b from-forest-50 via-background to-background pt-16 dark:from-forest-900/50 dark:via-background"
    >
      {/* Formes floues animées en fond */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <motion.div
          className="absolute -left-24 top-24 size-72 rounded-full bg-forest-300/30 blur-3xl dark:bg-forest-500/20 sm:size-80"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: EASE }}
        />
        <motion.div
          className="absolute right-0 top-1/3 size-80 rounded-full bg-moss-400/25 blur-3xl dark:bg-moss-600/20 sm:size-96"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: EASE }}
        />
        <div className="absolute bottom-0 left-1/3 size-72 rounded-full bg-forest-100/40 blur-3xl dark:bg-forest-700/20" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-7xl items-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="relative grid w-full grid-cols-2 items-center gap-x-3 gap-y-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.7fr)_minmax(0,0.95fr)] lg:gap-x-4">
          <DataFlowLine />

          {/* Étudiant — gauche (mobile : sous le texte, à gauche) */}
          <motion.div
            style={{ opacity: fade }}
            initial={{ opacity: 0, x: -60, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.2 }}
            className="relative order-2 lg:order-1 lg:-mr-6 lg:scale-110"
          >
            <StatChip
              icon={<CalendarClock className="size-4" />}
              value={t.hero.chipWeekValue}
              label={t.hero.chipWeekLabel}
              className="-top-2 left-0 sm:left-2"
              delay={1.8}
              floatDuration={4.4}
            />
            <Character
              src="/figures/etudiant.png"
              alt={t.hero.studentAlt}
              parallax={yStudent}
              floatDuration={3.8}
              floatDelay={0}
              floatAmp={18}
              sway={1.2}
              priority
            />
          </motion.div>

          {/* Texte — centre (mobile : en premier) */}
          <div className="order-1 col-span-2 text-center lg:order-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 14 }}
            >
              <Badge className="mb-4 sm:mb-5">{t.hero.badge}</Badge>
            </motion.div>

            <h1 className="font-display text-[2rem] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
              <AnimatedWords text={t.hero.titleA.trim()} delay={0.25} stagger={0.07} />{' '}
              <AnimatedWords
                text={t.hero.titleB}
                delay={0.25 + t.hero.titleA.trim().split(' ').length * 0.07}
                stagger={0.07}
                wordClassName="animate-gradient-x bg-gradient-to-r from-forest-500 via-moss-500 to-forest-400 bg-clip-text text-transparent"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mx-auto mt-4 max-w-xl text-sm italic text-muted sm:text-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="mx-auto mt-3 hidden max-w-xl text-sm leading-relaxed text-foreground/80 sm:block sm:text-base"
            >
              {t.hero.taglineA}
              <strong className="font-semibold text-forest-600 dark:text-moss-500">
                {t.hero.taglineStrong}
              </strong>
              {t.hero.taglineB}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 14, delay: 1.3 }}
              className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
            >
              <Button
                size="lg"
                className="shine w-full sm:w-auto"
                asChild
                onMouseEnter={() => setHolo(true)}
                onMouseLeave={() => setHolo(false)}
                onFocus={() => setHolo(true)}
                onBlur={() => setHolo(false)}
              >
                <a href="#problem">
                  {t.hero.ctaPrimary}
                  <ArrowDown className="size-4" />
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto" asChild>
                <a href="#resources">
                  <FileDown className="size-4" />
                  {t.hero.ctaSecondary}
                </a>
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="mt-6 text-xs text-muted sm:mt-7 sm:text-sm"
            >
              {PROJECT_META.author} · {PROJECT_META.formation} · {PROJECT_META.year}
            </motion.p>
          </div>

          {/* Robot IA — droite (mobile : sous le texte, à droite) */}
          <motion.div
            style={{ opacity: fade }}
            initial={{ opacity: 0, x: 60, rotate: 4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.4 }}
            className="relative order-3 lg:-ml-6 lg:scale-95"
          >
            <StatChip
              icon={<Target className="size-4" />}
              value={t.hero.chipF1Value}
              label={t.hero.chipF1Label}
              className="-top-2 right-0 sm:right-2"
              delay={2}
              floatDuration={5}
            />
            <StatChip
              icon={<Lightbulb className="size-4" />}
              value={t.hero.chipXaiValue}
              label={t.hero.chipXaiLabel}
              className="bottom-6 right-0 hidden sm:block lg:-right-4"
              delay={2.2}
              floatDuration={4.6}
            />
            <Character
              src="/figures/robot.png"
              alt={t.hero.robotAlt}
              parallax={yRobot}
              floatDuration={5.6}
              floatDelay={0.9}
              floatAmp={12}
              aspect="aspect-[4/3]"
              halo
            >
              <Hologram visible={holo} />
            </Character>
          </motion.div>
        </div>
      </div>

      {/* Indicateur de scroll */}
      <motion.a
        href="#problem"
        aria-label={t.hero.scroll}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-muted sm:bottom-6"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="size-6" />
      </motion.a>
    </section>
  )
}
