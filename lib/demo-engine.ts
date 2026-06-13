// lib/demo-engine.ts
// Moteur de scoring transparent (régression logistique jouet) pour la démo manuelle.
// Reproduit le sens des contributions SHAP du vrai modèle, calculé côté client en direct.
import type { Locale } from '@/lib/i18n/dictionary'

export interface SliderSpec {
  key: 'taux_soumission' | 'last_day' | 'clics_late' | 'score_Exam' | 'score_mean'
  /** Poids logistique. Négatif = diminue le risque, positif = l'augmente. */
  weight: number
  /** Valeur par défaut (0–100). */
  default: number
  /** true si la sémantique de la variable est inversée (valeur haute = mieux). */
  protective: boolean
}

export const SLIDERS: SliderSpec[] = [
  { key: 'taux_soumission', weight: -3.0, default: 35, protective: true },
  { key: 'last_day', weight: 2.6, default: 70, protective: false },
  { key: 'clics_late', weight: 1.3, default: 65, protective: false },
  { key: 'score_Exam', weight: -2.1, default: 40, protective: true },
  { key: 'score_mean', weight: -1.8, default: 42, protective: true },
]

const BIAS = 0.15

function sigmoid(z: number) {
  return 1 / (1 + Math.exp(-z))
}

export interface DemoResult {
  probability: number
  contributions: { key: SliderSpec['key']; value: number }[]
}

/** values: dict key → 0..100 */
export function scoreStudent(values: Record<string, number>): DemoResult {
  let z = BIAS
  const contributions = SLIDERS.map((s) => {
    const x = (values[s.key] ?? s.default) / 100 // 0..1
    const centered = (x - 0.5) * 2 // -1..1
    const c = s.weight * centered
    z += c
    return { key: s.key, value: c }
  })
  contributions.sort((a, b) => Math.abs(b.value) - Math.abs(a.value))
  return { probability: sigmoid(z), contributions }
}

export const DEFAULT_SLIDER_VALUES: Record<string, number> = Object.fromEntries(
  SLIDERS.map((s) => [s.key, s.default]),
)

interface ClusterInfo {
  cluster: string
  label: Record<Locale, string>
  action: Record<Locale, string>
}

/** Mappe une probabilité vers le niveau de risque actionnable (cohérent avec le clustering). */
export function clusterFromProbability(p: number): ClusterInfo {
  if (p < 0.2)
    return {
      cluster: 'C1',
      label: { fr: 'Engagés, scores élevés', en: 'Engaged, high scores' },
      action: { fr: 'Aucune intervention nécessaire', en: 'No intervention needed' },
    }
  if (p < 0.4)
    return {
      cluster: 'C10',
      label: { fr: 'Engagement modéré', en: 'Moderate engagement' },
      action: { fr: 'Email automatique', en: 'Automated email' },
    }
  if (p < 0.7)
    return {
      cluster: 'C11',
      label: { fr: 'Activité irrégulière', en: 'Irregular activity' },
      action: { fr: 'Notification au tuteur', en: 'Notify tutor' },
    }
  if (p < 0.95)
    return {
      cluster: 'C12',
      label: { fr: 'Désengagement progressif', en: 'Progressive disengagement' },
      action: { fr: 'Entretien individuel', en: 'One-on-one meeting' },
    }
  return {
    cluster: 'C2',
    label: { fr: 'Quasi-inactifs', en: 'Nearly inactive' },
    action: { fr: 'Intervention urgente', en: 'Urgent intervention' },
  }
}
