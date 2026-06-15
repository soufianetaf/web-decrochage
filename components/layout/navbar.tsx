// components/layout/navbar.tsx — navbar sticky avec ancres, scroll-spy, menu mobile épuré.
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, GraduationCap, Presentation } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/data/nav'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { LanguageToggle } from '@/components/layout/language-toggle'
import { useI18n } from '@/components/providers/language-provider'
import { usePresentation } from '@/components/presentation/presentation-mode'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { t } = useI18n()
  const presentation = usePresentation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('#hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy : met en évidence la section visible
  useEffect(() => {
    const ids = ['hero', ...NAV_LINKS.map((l) => l.href.slice(1))]
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[100] transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent',
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigation principale"
      >
        <a href="#hero" className="flex items-center gap-2 font-display font-semibold text-foreground">
          <span className="flex size-8 items-center justify-center rounded-lg bg-forest-500 text-white">
            <GraduationCap className="size-5" />
          </span>
          <span className="hidden sm:inline">{t.nav.brand}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  active === link.href
                    ? 'text-forest-500 dark:text-forest-400'
                    : 'text-muted hover:text-foreground',
                )}
              >
                {t.nav[link.key]}
              </a>
            </li>
          ))}
        </ul>

        {/* Contrôles desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t.presentation.enter}
            aria-pressed={presentation.active}
            title={`${t.presentation.enter} (P)`}
            onClick={presentation.toggle}
          >
            <Presentation className="size-5" />
          </Button>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        {/* Contrôles mobile : présentation + langue + thème + hamburger (tous visibles) */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t.presentation.enter}
            aria-pressed={presentation.active}
            title={t.presentation.enter}
            onClick={presentation.toggle}
            className="text-forest-500 dark:text-forest-400"
          >
            <Presentation className="size-5" />
          </Button>
          <LanguageToggle />
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-label={t.nav.openMenu}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                      active === link.href
                        ? 'bg-forest-50 text-forest-600 dark:bg-forest-700/40 dark:text-forest-400'
                        : 'text-muted hover:bg-forest-50 hover:text-foreground dark:hover:bg-forest-700/40',
                    )}
                  >
                    {t.nav[link.key]}
                  </a>
                </li>
              ))}
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
