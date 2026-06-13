// components/presentation/presentation-mode.tsx
// Mode soutenance : navigation section par section au clavier (← / →, Échap),
// barre de contrôle flottante avec compteur. Activable depuis la navbar ou la touche « P ».
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useI18n } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

const SECTION_IDS = [
  'hero',
  'problem',
  'demo',
  'contributions',
  'pipeline',
  'results',
  'architecture',
  'visualizations',
  'resources',
] as const

type SectionId = (typeof SECTION_IDS)[number]

interface PresentationContextValue {
  active: boolean
  toggle: () => void
}

const PresentationContext = createContext<PresentationContextValue | null>(null)

export function usePresentation() {
  const ctx = useContext(PresentationContext)
  if (!ctx) throw new Error('usePresentation must be used within PresentationProvider')
  return ctx
}

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false)
  const toggle = useCallback(() => setActive((a) => !a), [])
  const value = useMemo(() => ({ active, toggle }), [active, toggle])

  // Raccourci global « P » (hors champs de saisie) pour basculer le mode.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return
      if ((e.key === 'p' || e.key === 'P') && !e.metaKey && !e.ctrlKey && !e.altKey) toggle()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [toggle])
  return (
    <PresentationContext.Provider value={value}>
      {children}
      <PresentationBar />
    </PresentationContext.Provider>
  )
}

function scrollToSection(id: SectionId) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function PresentationBar() {
  const { active, toggle } = usePresentation()
  const { t } = useI18n()
  const [index, setIndex] = useState(0)

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((i) => {
        const next = Math.min(SECTION_IDS.length - 1, Math.max(0, i + dir))
        scrollToSection(SECTION_IDS[next])
        return next
      })
    },
    [],
  )

  // Raccourcis clavier : ← / → naviguent, Échap quitte (uniquement en mode actif).
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'Escape') {
        toggle()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, go, toggle])

  // À l'activation : repart de la section visible la plus proche.
  useEffect(() => {
    if (!active) return
    const fromTop = window.scrollY + window.innerHeight / 3
    let current = 0
    SECTION_IDS.forEach((id, i) => {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= fromTop) current = i
    })
    setIndex(current)
  }, [active])

  const labels = t.presentation.sections

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="fixed bottom-5 left-1/2 z-[300] -translate-x-1/2"
          role="toolbar"
          aria-label={t.presentation.enter}
        >
          <div className="flex items-center gap-1 rounded-full border border-border bg-card/90 py-1.5 pl-1.5 pr-3 shadow-xl shadow-forest-500/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => go(-1)}
              disabled={index === 0}
              aria-label="Précédent"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-forest-50 text-forest-600 transition-colors hover:bg-forest-100 disabled:cursor-default disabled:opacity-40 dark:bg-forest-700/50 dark:text-moss-400 dark:hover:bg-forest-700"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              disabled={index === SECTION_IDS.length - 1}
              aria-label="Suivant"
              className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-forest-500 text-white transition-colors hover:bg-forest-600 disabled:cursor-default disabled:opacity-40"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="ml-2 min-w-28 text-center sm:min-w-36">
              <p className="font-display text-sm font-semibold leading-tight text-foreground">
                {labels[SECTION_IDS[index]]}
              </p>
              <p className="text-[10px] font-medium tabular-nums text-muted">
                {index + 1} / {SECTION_IDS.length}
              </p>
            </div>

            {/* Points de progression */}
            <div className="ml-2 hidden items-center gap-1 sm:flex" aria-hidden>
              {SECTION_IDS.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setIndex(i)
                    scrollToSection(id)
                  }}
                  className={cn(
                    'size-1.5 cursor-pointer rounded-full transition-all',
                    i === index ? 'w-4 bg-forest-500 dark:bg-moss-400' : 'bg-border hover:bg-muted',
                  )}
                />
              ))}
            </div>

            <span className="ml-2 hidden text-[10px] text-muted lg:block">{t.presentation.hint}</span>

            <button
              type="button"
              onClick={toggle}
              aria-label={t.presentation.exit}
              className="ml-1 flex size-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:bg-forest-50 hover:text-foreground dark:hover:bg-forest-700/50"
            >
              <X className="size-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
