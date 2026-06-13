// lib/data/figures.ts — galerie de figures clés du mémoire.
// NOTE : remplacer les fichiers SVG de /public/figures par les vraies exports PNG du mémoire.
export interface Figure {
  src: string
  file: string
  caption: string
}

export const FIGURES: Figure[] = [
  { src: '/figures/fig_variable_cible.svg', file: 'fig_variable_cible.png', caption: 'Distribution OULAD : 52,8 % de décrochage' },
  { src: '/figures/fig_clics.svg', file: 'fig_clics.png', caption: 'Clics VLE par semaine : succès vs décrochage' },
  { src: '/figures/fig_pca_clusters.svg', file: 'fig_pca_clusters.png', caption: 'PCA des 3 algorithmes de clustering' },
  { src: '/figures/fig_f1_par_modele.svg', file: 'fig_f1_par_modele.png', caption: 'F1-score comparé des 8 configurations' },
  { src: '/figures/fig_evolution_f1.svg', file: 'fig_evolution_f1.png', caption: 'Évolution F1 par horizon (S3 à S20)' },
  { src: '/figures/fig_shap_summary.svg', file: 'fig_shap_summary.png', caption: 'SHAP Summary Plot — Top 20 features' },
  { src: '/figures/fig_convergence.svg', file: 'fig_convergence.png', caption: 'Convergence sémantique : 42,9 % vs 94,1 %' },
  { src: '/figures/fig_databricks.svg', file: 'fig_databricks.png', caption: 'Benchmark : pandas vs Spark par phase' },
]
