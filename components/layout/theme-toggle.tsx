// components/layout/theme-toggle.tsx — bascule clair / sombre (next-themes).
'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      // Libellé neutre avant montage pour éviter tout mismatch d'hydratation (next-themes).
      aria-label={!mounted ? 'Thème / Theme' : isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-5" />
        ) : (
          <Moon className="size-5" />
        )
      ) : (
        <span className="size-5" />
      )}
    </Button>
  )
}
