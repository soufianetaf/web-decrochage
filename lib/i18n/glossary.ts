// lib/i18n/glossary.ts — définitions du jargon ML (FR / EN) pour les tooltips.
import type { Locale } from '@/lib/i18n/dictionary'

export const GLOSSARY: Record<string, Record<Locale, string>> = {
  'F1-score': {
    fr: "Moyenne harmonique de la précision et du rappel. Mesure équilibrée de la qualité d'un classifieur, surtout utile quand les classes sont déséquilibrées.",
    en: 'Harmonic mean of precision and recall. A balanced measure of classifier quality, especially useful with imbalanced classes.',
  },
  SHAP: {
    fr: "SHapley Additive exPlanations : méthode qui attribue à chaque variable sa contribution exacte à une prédiction, fondée sur la théorie des jeux.",
    en: 'SHapley Additive exPlanations: a method assigning each feature its exact contribution to a prediction, grounded in game theory.',
  },
  LIME: {
    fr: "Local Interpretable Model-agnostic Explanations : explique une prédiction en approximant localement le modèle par un modèle simple et interprétable.",
    en: 'Local Interpretable Model-agnostic Explanations: explains a prediction by locally approximating the model with a simple, interpretable one.',
  },
  AUC: {
    fr: "Aire sous la courbe ROC. Probabilité que le modèle classe un cas positif au-dessus d'un cas négatif (1 = parfait, 0,5 = hasard).",
    en: 'Area Under the ROC Curve. Probability the model ranks a positive case above a negative one (1 = perfect, 0.5 = random).',
  },
  OULAD: {
    fr: "Open University Learning Analytics Dataset : jeu de données public de 32 593 étudiants et 10M+ interactions sur un environnement d'apprentissage en ligne (VLE).",
    en: 'Open University Learning Analytics Dataset: a public dataset of 32,593 students and 10M+ interactions on a virtual learning environment (VLE).',
  },
  Clustering: {
    fr: "Regroupement non supervisé d'individus similaires. Ici, il sert à profiler les étudiants en niveaux de risque.",
    en: 'Unsupervised grouping of similar individuals. Here it profiles students into risk levels.',
  },
  Speedup: {
    fr: "Facteur d'accélération entre l'exécution séquentielle (pandas) et l'exécution distribuée (PySpark sur cluster).",
    en: 'Acceleration factor between sequential execution (pandas) and distributed execution (PySpark on a cluster).',
  },
}

export const GLOSSARY_KEYS = Object.keys(GLOSSARY)
