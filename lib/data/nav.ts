// lib/data/nav.ts — liens d'ancrage de la navigation (libellé via i18n).
import type { Dict } from '@/lib/i18n/dictionary'

export const NAV_LINKS = [
  { href: '#problem', key: 'problem' },
  { href: '#demo', key: 'demo' },
  { href: '#contributions', key: 'contributions' },
  { href: '#pipeline', key: 'pipeline' },
  { href: '#results', key: 'results' },
  { href: '#architecture', key: 'architecture' },
  { href: '#visualizations', key: 'visualizations' },
  { href: '#resources', key: 'resources' },
] as const satisfies ReadonlyArray<{ href: string; key: keyof Dict['nav'] }>
