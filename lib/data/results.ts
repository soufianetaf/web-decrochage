// lib/data/results.ts
// Constantes de résultats expérimentaux du mémoire (source de vérité, vraies métriques).

export const RESULTS = {
  classification: {
    f1: 96.04,
    auc: 0.9886,
    precision: 97.85,
    recall: 92.41,
    tp: 2559,
    tn: 3021,
    fp: 56,
    fn: 210,
    bestModel: 'Blend XGB+LGBM',
  },
  earlyPrediction: {
    week3: 77.32,
    week5: 79.4,
    week8: 82.24,
    week12: 83.79,
    week16: 86.7,
    week20: 89.28,
    deltaW3W12: 6.42,
  },
  clustering: {
    levels: 5,
    silhouetteKMeans: 0.397,
    silhouetteGMM: 0.397,
    dbGMM: 0.522,
    chGMM: 9876,
  },
  riskLevels: [
    { id: 'C1', effectif: 5655, dropout: 9.3, profile: 'Engagés', action: 'Aucune' },
    { id: 'C10', effectif: 8045, dropout: 27.1, profile: 'Engagement modéré', action: 'Email automatique' },
    { id: 'C11', effectif: 7285, dropout: 47.0, profile: 'Activité irrégulière', action: 'Notification tuteur' },
    { id: 'C12', effectif: 7363, dropout: 92.7, profile: 'Désengagement progressif', action: 'Entretien individuel' },
    { id: 'C2', effectif: 4245, dropout: 99.8, profile: 'Quasi-inactifs', action: 'Intervention urgente' },
  ],
  explainability: {
    strictConvergence: 42.9,
    semanticConvergence: 94.1,
    topFeatures: ['taux_soumission', 'last_day', 'clics_late', 'score_Exam', 'score_mean'],
  },
  cloud: {
    speedupGlobal: 3.4,
    parallelEfficiency: 85,
    pandasTimeMin: 9.6,
    sparkTimeMin: 2.8,
    speedupByPhase: {
      featureEng: 3.17,
      training: 5.5,
      earlyPred: 3.46,
      optuna: 0.99,
    },
  },
  criteriaSuccess: { achieved: 5, total: 6 },
} as const

export const EARLY_PREDICTION_SERIES = [
  { week: 'S3', f1: RESULTS.earlyPrediction.week3 },
  { week: 'S5', f1: RESULTS.earlyPrediction.week5 },
  { week: 'S8', f1: RESULTS.earlyPrediction.week8 },
  { week: 'S12', f1: RESULTS.earlyPrediction.week12 },
  { week: 'S16', f1: RESULTS.earlyPrediction.week16 },
  { week: 'S20', f1: RESULTS.earlyPrediction.week20 },
] as const

export const CLOUD_PHASE_SERIES = [
  { phase: 'Feature Eng.', speedup: RESULTS.cloud.speedupByPhase.featureEng },
  { phase: 'Training', speedup: RESULTS.cloud.speedupByPhase.training },
  { phase: 'Early Pred.', speedup: RESULTS.cloud.speedupByPhase.earlyPred },
  { phase: 'Optuna', speedup: RESULTS.cloud.speedupByPhase.optuna },
] as const

export const PROJECT_META = {
  title: 'Système intelligent et explicable de prévention du décrochage scolaire',
  subtitle: "Une approche Big Data fondée sur Databricks et l'apprentissage automatique",
  author: 'Soufiane Tafahi',
  formation: 'Master MISD',
  year: '2024-2025',
  university: 'Université',
  supervisor: 'Prof.',
  dataset: 'OULAD',
  technologies: [
    'Python',
    'PySpark',
    'scikit-learn',
    'XGBoost',
    'LightGBM',
    'SHAP',
    'LIME',
    'Databricks',
    'AWS',
    'Unity Catalog',
    'MLflow',
  ],
} as const

export const STATS = [
  {
    value: 52.8,
    suffix: ' %',
    decimals: 1,
    label: 'des étudiants OULAD décrochent avant la fin du cours',
    source: 'Kuzilek et al., 2017',
  },
  {
    value: 2.3,
    prefix: '',
    suffix: ' M€',
    decimals: 1,
    label: 'coût annuel pour une cohorte de 10 000 étudiants',
    source: 'OCDE Education at a Glance, 2019',
  },
  {
    value: 30,
    prefix: '~',
    suffix: ' %',
    decimals: 0,
    label: 'des étudiants en enseignement supérieur sont à risque',
    source: 'UNESCO, 2018',
  },
] as const
