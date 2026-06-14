// components/layout/footer.tsx — pied de page.
'use client'

import { GraduationCap } from 'lucide-react'
import { PROJECT_META } from '@/lib/data/results'
import { useI18n } from '@/components/providers/language-provider'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-border bg-forest-50/50 dark:bg-forest-900/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2 font-display font-semibold text-foreground">
            <span className="flex size-8 items-center justify-center rounded-lg bg-forest-500 text-white">
              <GraduationCap className="size-5" />
            </span>
            {t.footer.tagline}
          </div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {PROJECT_META.author} · {PROJECT_META.formation}{' '}
            {PROJECT_META.year}
          </p>
        </div>
      </div>
    </footer>
  )
}
