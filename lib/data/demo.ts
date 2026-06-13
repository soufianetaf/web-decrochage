// lib/data/demo.ts
// Profils étudiants hardcodés pour la démo interactive (prédiction + explication SHAP).

export type FeatureImpact = 'positive' | 'negative'

export interface DemoFeature {
  name: string
  value: number
  impact: FeatureImpact
}

export interface DemoProfile {
  key: 'engaged' | 'ambiguous' | 'atRisk'
  label: string
  hint: string
  icon: 'sprout' | 'scale' | 'alert'
  probability: number
  cluster: string
  clusterLabel: string
  profile: string
  action: string
  horizon: string
  topFeatures: DemoFeature[]
}

export const DEMO_PROFILES: Record<DemoProfile['key'], DemoProfile> = {
  engaged: {
    key: 'engaged',
    label: 'Étudiant engagé',
    hint: 'Activité régulière • Notes solides',
    icon: 'sprout',
    probability: 0.08,
    cluster: 'C1',
    clusterLabel: 'Engagés, scores élevés',
    profile: 'Engagés, scores élevés',
    action: 'Aucune intervention nécessaire',
    horizon: 'Dès semaine 8',
    topFeatures: [
      { name: 'taux_soumission', value: 0.51, impact: 'positive' },
      { name: 'last_day', value: -0.38, impact: 'positive' },
      { name: 'clics_late', value: -0.32, impact: 'positive' },
      { name: 'score_Exam', value: 0.29, impact: 'positive' },
      { name: 'score_mean', value: 0.24, impact: 'positive' },
    ],
  },
  ambiguous: {
    key: 'ambiguous',
    label: 'Cas ambigu',
    hint: 'Engagement mixte • Notes moyennes',
    icon: 'scale',
    probability: 0.52,
    cluster: 'C11',
    clusterLabel: 'Activité irrégulière',
    profile: 'Activité irrégulière',
    action: 'Notification au tuteur',
    horizon: 'Dès semaine 8',
    topFeatures: [
      { name: 'taux_soumission', value: -0.18, impact: 'negative' },
      { name: 'last_day', value: 0.15, impact: 'negative' },
      { name: 'clics_late', value: -0.12, impact: 'negative' },
      { name: 'score_Exam', value: 0.09, impact: 'positive' },
      { name: 'score_mean', value: -0.08, impact: 'negative' },
    ],
  },
  atRisk: {
    key: 'atRisk',
    label: 'Étudiant à risque',
    hint: 'Inactif 3 semaines • Notes faibles',
    icon: 'alert',
    probability: 0.94,
    cluster: 'C12',
    clusterLabel: 'Désengagement progressif',
    profile: 'Désengagement progressif',
    action: 'Entretien individuel urgent',
    horizon: 'Dès semaine 8',
    topFeatures: [
      { name: 'taux_soumission', value: -0.42, impact: 'negative' },
      { name: 'last_day', value: 0.31, impact: 'negative' },
      { name: 'clics_late', value: 0.28, impact: 'negative' },
      { name: 'score_Exam', value: -0.21, impact: 'negative' },
      { name: 'score_mean', value: -0.18, impact: 'negative' },
    ],
  },
}

export const DEMO_ORDER: DemoProfile['key'][] = ['engaged', 'ambiguous', 'atRisk']
