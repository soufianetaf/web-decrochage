// lib/data/figures.ts — galerie des figures clés du mémoire (exports réels).
export interface Figure {
  src: string
  caption: string
}

export const FIGURES: Figure[] = [
  { src: '/figures/fig3_1_variable_cible.png', caption: 'Distribution OULAD : 52,8 % de décrochage' },
  { src: '/figures/fig3_2_clics.png', caption: 'Clics VLE par semaine : succès vs décrochage' },
  { src: '/figures/fig4_2_pca_clusters.jpeg', caption: 'PCA des 3 algorithmes de clustering' },
  { src: '/figures/fig_f1_par_modele.png', caption: 'F1-score comparé des configurations' },
  { src: '/figures/fig_evolution_f1.png', caption: 'Évolution du F1 par horizon (S3 à S20)' },
  { src: '/figures/xai_shap_summary_beeswarm.png', caption: 'SHAP Summary Plot — Top features' },
  { src: '/figures/fig_convergence_semantique.png', caption: 'Convergence sémantique : 42,9 % vs 94,1 %' },
  { src: '/figures/fig_benchmark_databricks.png', caption: 'Benchmark : pandas vs Spark par phase' },
]
