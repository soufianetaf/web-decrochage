// components/layout/language-toggle.tsx — bascule FR / EN.
'use client'

import { useI18n } from '@/components/providers/language-provider'
import { cn } from '@/lib/utils'

export function LanguageToggle() {
  const { locale, setLocale } = useI18n()
  return (
    <div
      className="flex items-center rounded-full border border-border bg-card p-0.5 text-xs font-semibold"
      role="group"
      aria-label="Langue / Language"
    >
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            'rounded-full px-2.5 py-1 uppercase transition-colors cursor-pointer',
            locale === l
              ? 'bg-forest-500 text-white'
              : 'text-muted hover:text-foreground',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  )
}
