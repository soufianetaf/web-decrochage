# CLAUDE.md

> Ce fichier est lu automatiquement par Claude Code et autres assistants IA pour comprendre le contexte du projet et générer du code aligné.

---

## 🎯 Mission

Créer un **site web vitrine moderne et interactif** pour présenter le mémoire de Master MISD 2024-2025 :

> **« Système intelligent et explicable de prévention du décrochage scolaire : une approche Big Data fondée sur Databricks et l'apprentissage automatique »**

**URL cible** : `decrochage-prediction.vercel.app`
**Public** : Jury académique + recruteurs tech + grand public éclairé
**Objectif** : Démonstration live pendant la soutenance + portail de valorisation permanent

---

# PARTIE 1 — LE CONTEXTE DU PROJET

## 🎓 Le problème : Le décrochage scolaire

Le décrochage scolaire dans l'enseignement supérieur est un fléau international. Sur le dataset OULAD (Open University, UK), **52,8 % des étudiants décrochent** avant la fin de leur cours. Au Maroc, le système MASSAR enregistre les notes mais n'exploite pas les comportements en ligne. Les conseillers pédagogiques manquent d'outils pour détecter les étudiants à risque **suffisamment tôt** pour intervenir.

## 💡 La solution proposée

Un **pipeline ML complet en 4 modules** qui transforme des traces brutes d'apprentissage en alertes pédagogiques explicables :

| Module | Rôle | Sortie |
|---|---|---|
| **1. Prétraitement** | Ingestion OULAD + ingénierie de 40 features sur 10M interactions VLE | Dataset propre |
| **2. Clustering** | K-Means + HDBSCAN + GMM avec sub-clustering en 2 temps | 5 niveaux de risque actionnables |
| **3. Classification** | 6 modèles individuels + Stacking + Blend XGB+LGBM | F1 = 96,04 % |
| **4. Explicabilité** | SHAP + LIME avec métrique sémantique originale | Convergence 94,1 % |

Le tout est **déployé sur Databricks AWS** avec un speedup mesuré de **×3,40**.

## 🏆 Les contributions méthodologiques

1. **Sub-clustering en deux temps** : 2 clusters initiaux → 5 niveaux de risque actionnables
2. **Prédiction précoce sans data leakage** : recalcul honnête des features à chaque horizon
3. **Convergence sémantique SHAP/LIME** : nouvelle métrique passant de 42,9% à 94,1%

---

# PARTIE 2 — CONTENU DÉTAILLÉ DU SITE (8 SECTIONS)

Site one-page avec scroll fluide, navbar sticky, 8 sections successives avec ancres (`#hero`, `#problem`, `#demo`, etc.).

---

## **SECTION 1 — HERO** `#hero`

### Objectif
Capter l'attention en 5 secondes. Donner envie de scroller.

### Contenu textuel

**Titre principal** (h1, très grand, font-display) :
> Système intelligent et explicable de prévention du décrochage scolaire

**Sous-titre** (h2, italique discret) :
> Une approche Big Data fondée sur Databricks et l'apprentissage automatique

**Tagline accroche** :
> Prédire le décrochage des étudiants avec 96 % de précision, dès la 8ème semaine du semestre. Le tout, expliqué de manière claire pour les équipes pédagogiques.

**Métadonnées auteur** (petit, en bas) :
> Soufiane [Nom] • Master MISD • 2024-2025 • Encadrant : [Prof. Nom]

### Éléments visuels
- Background : gradient subtil forest-50 → background, particules animées discrètes
- 2 CTAs :
  - **Primaire** : "Explorer le projet ↓"
  - **Secondaire** : "Télécharger le mémoire 📄"
- Indicateur de scroll en bas : flèche bounce

---

## **SECTION 2 — LE PROBLÈME EN CHIFFRES** `#problem`

### Objectif
Justifier l'importance du sujet en 30 secondes via 3 chiffres percutants.

### Contenu textuel

**Titre section** (h2) : *Le décrochage scolaire en chiffres*

**Sous-titre** : *Un phénomène massif aux conséquences pédagogiques, économiques et sociales.*

### Les 3 statistiques (CountUp animé au scroll)

#### Carte 1
```
52,8 %
des étudiants OULAD décrochent avant la fin du cours
Source : Kuzilek et al., 2017
```

#### Carte 2
```
2,3 M€
coût annuel pour une cohorte de 10 000 étudiants
Source : OCDE Education at a Glance, 2019
```

#### Carte 3
```
~30 %
des étudiants en enseignement supérieur sont à risque
Source : UNESCO, 2018
```

### Animation
- Chiffres défilent de 0 à valeur en 1,5s au scroll
- Slide-up + fade-in (stagger 0.2s)

---

## **SECTION 3 — DÉMO INTERACTIVE ⭐** `#demo`

### Objectif
**Le moment "wow"**. Le visiteur teste le modèle en live, voit une prédiction, comprend l'explication.

### Contenu textuel

**Titre** : *Testez le modèle en direct*

**Sous-titre** : *Sélectionnez un profil étudiant pour voir comment le système prédit le risque et explique sa décision.*

### Interface en 3 zones

#### Zone A — Sélecteur de profil (3 cards cliquables)
```
[ 🌱 Étudiant engagé ]  [ ⚖️ Cas ambigu ]  [ 🚨 Étudiant à risque ]
   Activité régulière      Engagement mixte    Inactif 3 semaines
   Notes solides           Notes moyennes      Notes faibles
```

#### Zone B — Prédiction du modèle (apparaît au clic)
```
Probabilité de décrochage
██████████████████░░░░░░░  87%

Niveau de risque : C12 — Désengagement progressif
Action recommandée : Entretien individuel
Horizon de fiabilité : Dès semaine 8
```

#### Zone C — Pourquoi cette prédiction ? (SHAP)
Bar chart horizontal Recharts avec top 5 features :
```
taux_soumission ████████████████░░░  -0.42
last_day         ████████████░░░░░░  +0.31
clics_late       ██████████░░░░░░░░  +0.28
score_Exam       ████████░░░░░░░░░░  -0.21
score_mean       ███████░░░░░░░░░░░  -0.18
```

Bouton "Voir l'explication complète →" ouvre un Dialog shadcn avec waterfall SHAP + comparaison LIME.

### Données par profil (TypeScript à hardcoder)

```typescript
export const DEMO_PROFILES = {
  engaged: {
    label: 'Étudiant engagé',
    probability: 0.08,
    cluster: 'C1',
    profile: 'Engagés, scores élevés',
    action: 'Aucune intervention nécessaire',
    topFeatures: [
      { name: 'taux_soumission', value: +0.51, impact: 'positive' },
      { name: 'last_day', value: -0.38, impact: 'positive' },
      { name: 'clics_late', value: -0.32, impact: 'positive' },
      { name: 'score_Exam', value: +0.29, impact: 'positive' },
      { name: 'score_mean', value: +0.24, impact: 'positive' },
    ],
  },
  ambiguous: {
    label: 'Cas ambigu',
    probability: 0.52,
    cluster: 'C11',
    profile: 'Activité irrégulière',
    action: 'Notification au tuteur',
    topFeatures: [
      { name: 'taux_soumission', value: -0.18, impact: 'negative' },
      { name: 'last_day', value: +0.15, impact: 'negative' },
      { name: 'clics_late', value: -0.12, impact: 'negative' },
      { name: 'score_Exam', value: +0.09, impact: 'positive' },
      { name: 'score_mean', value: -0.08, impact: 'negative' },
    ],
  },
  atRisk: {
    label: 'Étudiant à risque',
    probability: 0.94,
    cluster: 'C12',
    profile: 'Désengagement progressif',
    action: 'Entretien individuel urgent',
    topFeatures: [
      { name: 'taux_soumission', value: -0.42, impact: 'negative' },
      { name: 'last_day', value: +0.31, impact: 'negative' },
      { name: 'clics_late', value: +0.28, impact: 'negative' },
      { name: 'score_Exam', value: -0.21, impact: 'negative' },
      { name: 'score_mean', value: -0.18, impact: 'negative' },
    ],
  },
} as const
```

---

## **SECTION 4 — PIPELINE EN 4 MODULES** `#pipeline`

### Objectif
Expliquer l'architecture méthodologique de manière visuelle.

### Contenu textuel

**Titre** : *Un pipeline en 4 modules*

**Sous-titre** : *Du dataset brut OULAD à la prédiction explicable, en passant par le profilage et la validation cloud.*

### Les 4 modules (cards horizontales avec flèches animées)

#### Module 1 — Prétraitement
- **Icône** : Database (lucide-react)
- **Couleur** : moss-500
- **Description** : Ingestion des 7 fichiers OULAD (32 593 étudiants, 10M+ interactions VLE). Construction de 40 features : volume d'activité, régularité, scores, features croisées.
- **Métrique clé** : 40 features sur 10M lignes

#### Module 2 — Clustering
- **Icône** : Layers
- **Couleur** : forest-500
- **Description** : Comparaison K-Means / HDBSCAN / GMM. Sub-clustering en deux temps qui transforme une partition grossière en 5 niveaux de risque actionnables.
- **Métrique clé** : 5 niveaux de risque

#### Module 3 — Classification
- **Icône** : Brain
- **Couleur** : forest-600
- **Description** : 6 modèles individuels (SVM, XGBoost, LightGBM, RF, GB, MLP) + Stacking + Blend XGB+LGBM. Étude ablative sur 9 configurations (54 entraînements).
- **Métrique clé** : 96,04 % F1-score

#### Module 4 — Explicabilité (XAI)
- **Icône** : Eye
- **Couleur** : aws (orange)
- **Description** : SHAP et LIME sur 500 instances test. Métrique originale de convergence sémantique : passage de 42,9% (strict) à 94,1% (concepts pédagogiques).
- **Métrique clé** : 94,1 % convergence

### Cadre "Validation Cloud" (bas de section)
```
☁️ Validation distribuée sur Databricks AWS
Pipeline porté de pandas vers PySpark sur cluster 4 cœurs.
Speedup global mesuré : ×3,40 (efficacité parallèle 85 %).
```

---

## **SECTION 5 — DASHBOARD RÉSULTATS** `#results`

### Objectif
Présenter les **4 résultats marquants** sous forme de dashboard.

### Contenu textuel

**Titre** : *Résultats expérimentaux*

**Sous-titre** : *Sur les 6 critères de réussite fixés au départ, 5 sont atteints — dont 2 nettement dépassés.*

### Grid 2x2 de cartes métriques

#### Carte 1 — Performance globale
- **Métrique principale** : 96,04 % (F1-score)
- **Visualisation** : Speedometer SVG (jauge circulaire)
- **Métriques secondaires** : AUC 0,9886 / Précision 97,85% / Rappel 92,41%
- **Légende** : Meilleur modèle : Blend XGB+LGBM

#### Carte 2 — Prédiction précoce
- **Métrique principale** : Dès la semaine 8
- **Visualisation** : Line chart Recharts (F1 par semaine)
- **Données** : S3=77.32, S5=79.40, S8=82.24, S12=83.79, S16=86.70, S20=89.28
- **Légende** : Seuil F1 > 80 % franchi à S8

#### Carte 3 — Explicabilité
- **Métrique principale** : 94,1 % (convergence sémantique)
- **Visualisation** : Donut chart (94,1 % vs 5,9 %)
- **Comparaison** : vs convergence stricte 42,9 %
- **Légende** : SHAP et LIME identifient les mêmes concepts

#### Carte 4 — Speedup cloud
- **Métrique principale** : ×3,40
- **Visualisation** : Bar chart (pandas vs Spark par phase)
- **Détails** : 9,6 min → 2,8 min, efficacité 85 %
- **Légende** : Validation Databricks AWS, 4 cœurs

### Tabs en bas (vues détaillées)
- Tab 1 : **Classification** — étude ablative 9 expériences
- Tab 2 : **Clustering** — comparaison K-Means / HDBSCAN / GMM
- Tab 3 : **XAI** — SHAP Summary top 20
- Tab 4 : **Cloud** — benchmark Databricks par phase

---

## **SECTION 6 — ARCHITECTURE TECHNIQUE** `#architecture`

### Objectif
Montrer la maîtrise technique : stack utilisée, infrastructure cloud.

### Contenu textuel

**Titre** : *Stack technique & Architecture cloud*

**Sous-titre** : *Un pipeline développé en local avec Python, puis déployé sur Databricks AWS pour validation à l'échelle.*

### Bloc 1 — Diagramme architecture cloud
Schéma SVG illustrant :
```
┌─────────────────────────────────────────────┐
│  AWS Cloud                                   │
│  ┌────────────────────────────────────────┐  │
│  │  Databricks Workspace                   │  │
│  │  ┌──────────┐  ┌──────────────────┐    │  │
│  │  │ Notebook │→ │ Unity Catalog    │    │  │
│  │  │ Python   │  │ (S3 + governance)│    │  │
│  │  └────┬─────┘  └──────────────────┘    │  │
│  │       │                                  │  │
│  │  ┌────▼──────────────────────┐          │  │
│  │  │ Spark Cluster (4 cores)   │          │  │
│  │  │ Driver + 2 Executors      │          │  │
│  │  └────────────────────────────┘          │  │
│  │       │                                  │  │
│  │  ┌────▼──────────────────────┐          │  │
│  │  │ MLflow Tracking           │          │  │
│  │  └────────────────────────────┘          │  │
│  └────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Bloc 2 — Stack technologique (grille de logos)
```
Langages   : Python 3.10, SQL, Bash
Data       : pandas, PySpark, NumPy
ML         : scikit-learn, XGBoost, LightGBM
XAI        : SHAP, LIME
Cloud      : Databricks, AWS, Unity Catalog
ML Ops     : MLflow, Optuna
Tooling    : Jupyter, Git, GitHub Actions
```

Chaque techno = card avec logo SVG (simpleicons.org) + nom.

### Bloc 3 — Liens techniques
- 💻 **Code source** : github.com/[username]/dropout-prediction
- 📊 **Notebooks publics** : community.cloud.databricks.com
- 📦 **Modèles MLflow** : (lien si exposé)

---

## **SECTION 7 — VISUALISATIONS** `#visualizations`

### Objectif
Galerie des figures clés du mémoire.

### Contenu textuel

**Titre** : *Visualisations & Analyses*

**Sous-titre** : *Sélection des figures principales produites tout au long du projet. Cliquez pour zoomer.*

### Grid responsive (3 col desktop, 1 col mobile)

8 figures avec captions courtes :

1. `fig_variable_cible.png` — *Distribution OULAD : 52,8% décrochage*
2. `fig_clics.png` — *Clics VLE par semaine : succès vs décrochage*
3. `fig_pca_clusters.png` — *PCA des 3 algorithmes de clustering*
4. `fig_f1_par_modele.png` — *F1-score comparé des 8 configurations*
5. `fig_evolution_f1.png` — *Évolution F1 par horizon (S3 à S20)*
6. `fig_shap_summary.png` — *SHAP Summary Plot — Top 20 features*
7. `fig_convergence.png` — *Convergence sémantique : 42,9% vs 94,1%*
8. `fig_databricks.png` — *Benchmark : pandas vs Spark par phase*

### Lightbox au clic
Utiliser `yet-another-react-lightbox` pour zoom plein écran.

---

## **SECTION 8 — RESSOURCES & CONTACT** `#resources`

### Objectif
Convertir l'intérêt en action : télécharger, contacter, voir le code.

### Contenu textuel

**Titre** : *Pour aller plus loin*

**Sous-titre** : *Mémoire complet, code source, notebooks, vidéo et contact.*

### Grid 2x2 de cartes-CTA

#### Carte 1 — Mémoire PDF
- **Icône** : FileDown
- **Titre** : Mémoire complet
- **Description** : ~100 pages détaillant méthodologie, résultats et discussion
- **CTA** : Télécharger PDF

#### Carte 2 — GitHub
- **Icône** : Github
- **Titre** : Code source
- **Description** : Pipeline Python complet, scripts de reproduction
- **CTA** : Voir sur GitHub

#### Carte 3 — Vidéo soutenance
- **Icône** : Video
- **Titre** : Soutenance enregistrée
- **Description** : Présentation orale (disponible après soutenance)
- **CTA** : Regarder sur YouTube (embed)

#### Carte 4 — Contact
- **Icône** : Mail
- **Titre** : À propos de l'auteur
- **Description** : Étudiant Master MISD à l'Université [Nom]. Intéressé par l'IA appliquée à l'éducation et le Big Data.
- **CTAs** : LinkedIn / Email

### Footer
```
© 2025 Soufiane [Nom]
Liens : Mentions légales / Confidentialité
Site développé avec Next.js 14, déployé sur Vercel
```

---

# PARTIE 3 — STACK TECHNIQUE IMPÉRATIVE

**Jamais HTML/CSS pur. Toujours frameworks modernes.**

### Framework principal
- **Next.js 14+** avec App Router (React Server Components)
- **TypeScript** strict mode
- **Node.js 20 LTS**

### Styling
- **Tailwind CSS 4** (utility-first uniquement)
- **shadcn/ui** pour composants de base
- **CVA** pour variantes
- **tailwind-merge** + **clsx** via `cn()`

### Animations
- **Framer Motion** pour toutes animations
- **Lenis** pour smooth scroll
- **AOS** en alternative légère

### Visualisations
- **Recharts** pour graphiques simples
- **Apache ECharts** (via `echarts-for-react`) pour complexes
- **react-countup** pour chiffres animés

### Icons et assets
- **lucide-react** uniquement
- **next/image** TOUJOURS (jamais `<img>`)
- **next/font** pour Google Fonts

### Démo IA
- **ONNX Runtime Web** ou **TensorFlow.js** côté client
- **Hugging Face Spaces** + **FastAPI** alternatif si trop lourd

### Déploiement
- **Vercel** (auto-deploy sur push GitHub)
- **GitHub Actions** pour CI/CD

### Qualité
- **ESLint** + **Prettier**
- **Husky** + **lint-staged**

---

# PARTIE 4 — DESIGN SYSTEM

### Palette (Forest/Moss, cohérente avec le PFE)

```typescript
// tailwind.config.ts
colors: {
  forest: {
    50:  '#F2F7F2',
    100: '#E0EBE0',
    500: '#2C5F2D',  // Primaire
    600: '#1F4520',
    700: '#163316',
    900: '#0A1A0B',
  },
  moss: {
    50:  '#F7FAF0',
    100: '#EDF3DC',
    500: '#97BC62',  // Secondaire
    600: '#7A9D48',
  },
  aws:        '#FF9900',
  databricks: '#FF3621',
  background: '#FAFAFA',
  foreground: '#1A1A1A',
}
```

### Typographie

```typescript
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const display = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
```

### Composants visuels
- Cards : `border border-forest-100 rounded-2xl shadow-sm hover:shadow-lg`
- Boutons primaires : `bg-forest-500 hover:bg-forest-600 text-white`
- Boutons secondaires : `border-2 border-forest-500 text-forest-500 hover:bg-forest-50`
- Badges : `bg-moss-100 text-forest-700 rounded-full px-3 py-1`

### Mode sombre
- Toggle obligatoire (lucide-react Moon/Sun)
- Classes `dark:` partout
- Persistance via `next-themes`

---

# PARTIE 5 — DONNÉES DU PROJET

## Constantes TypeScript à utiliser

```typescript
// lib/data/results.ts

export const RESULTS = {
  classification: {
    f1: 96.04,
    auc: 0.9886,
    precision: 97.85,
    recall: 92.41,
    tp: 2559, tn: 3021, fp: 56, fn: 210,
    bestModel: 'Blend XGB+LGBM',
  },
  earlyPrediction: {
    week3: 77.32, week5: 79.40, week8: 82.24,
    week12: 83.79, week16: 86.70, week20: 89.28,
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
    { id: 'C1',  effectif: 5655, dropout: 9.3,  profile: 'Engagés',                  action: 'Aucune' },
    { id: 'C10', effectif: 8045, dropout: 27.1, profile: 'Engagement modéré',        action: 'Email automatique' },
    { id: 'C11', effectif: 7285, dropout: 47.0, profile: 'Activité irrégulière',     action: 'Notification tuteur' },
    { id: 'C12', effectif: 7363, dropout: 92.7, profile: 'Désengagement progressif', action: 'Entretien individuel' },
    { id: 'C2',  effectif: 4245, dropout: 99.8, profile: 'Quasi-inactifs',           action: 'Intervention urgente' },
  ],
  explainability: {
    strictConvergence: 42.9,
    semanticConvergence: 94.1,
    topFeatures: ['taux_soumission', 'last_day', 'clics_late', 'score_Exam', 'score_mean'],
  },
  cloud: {
    speedupGlobal: 3.40,
    parallelEfficiency: 85,
    pandasTimeMin: 9.6,
    sparkTimeMin: 2.8,
    speedupByPhase: {
      featureEng: 3.17, training: 5.50, earlyPred: 3.46, optuna: 0.99,
    },
  },
  criteriaSuccess: { achieved: 5, total: 6 },
} as const

export const PROJECT_META = {
  title: 'Système intelligent et explicable de prévention du décrochage scolaire',
  subtitle: 'Une approche Big Data fondée sur Databricks et l\'apprentissage automatique',
  author: 'Soufiane [Nom]',
  formation: 'Master MISD',
  year: '2024-2025',
  university: '[Nom Université]',
  supervisor: '[Prof. Nom]',
  dataset: 'OULAD',
  technologies: [
    'Python', 'PySpark', 'scikit-learn', 'XGBoost', 'LightGBM',
    'SHAP', 'LIME', 'Databricks', 'AWS', 'Unity Catalog', 'MLflow',
  ],
} as const
```

---

# PARTIE 6 — COMMANDES & DÉPLOIEMENT

## Setup initial

```bash
# Création du projet
npx create-next-app@latest dropout-prediction-website \
  --typescript --tailwind --app --turbopack \
  --import-alias "@/*"

cd dropout-prediction-website

# Dépendances essentielles
npm install framer-motion lucide-react recharts
npm install class-variance-authority clsx tailwind-merge
npm install next-themes lenis react-countup
npm install echarts echarts-for-react
npm install yet-another-react-lightbox

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card dialog tabs badge progress separator
```

## Développement

```bash
npm run dev      # localhost:3000
npm run build    # Build prod
npm run lint     # ESLint
```

## Déploiement Vercel

```bash
npm i -g vercel
vercel           # Premier deploy
vercel --prod    # Production
```

---

# PARTIE 7 — RÈGLES DE QUALITÉ

## ✅ Checklist obligatoire avant tout commit

- [ ] Composants en **TypeScript strict** (pas de `any`)
- [ ] Tailwind uniquement (pas de styles inline)
- [ ] Composants UI dérivés de **shadcn/ui** quand possible
- [ ] Animations via **Framer Motion** (pas de CSS keyframes manuels)
- [ ] Images via **next/image** avec `width`, `height`, `alt`
- [ ] Icons via **lucide-react** uniquement
- [ ] Responsive **mobile-first** (sm:, md:, lg:, xl:)
- [ ] Accessibilité : `aria-label`, semantic HTML (`<section>`, `<article>`, `<nav>`)
- [ ] Mode sombre testé sur toutes les sections
- [ ] Lighthouse score ≥ 90 sur tous les axes
- [ ] SEO : metadata complète dans `layout.tsx`

## 🎯 Tone of voice

**Style** : Sobre, professionnel, académique (pas startup tech)
**Précision** : Vraies métriques, pas d'arrondis exagérés
**Honnêteté** : Mentionner les limites (5/6 critères atteints, pas 6/6)
**Accessibilité** : Éviter le jargon ML pur, expliquer

✅ « Le pipeline atteint 96,04% de F1-score sur le jeu de test »
❌ « Notre IA révolutionnaire prédit le décrochage avec une précision exceptionnelle »

✅ « 5 critères de réussite sur 6 atteints »
❌ « Tous nos objectifs sont brillamment dépassés »

---

# PARTIE 8 — LIVRABLE ATTENDU PAR CLAUDE

Quand on demande à Claude de générer une partie du site, il doit produire :

1. **Code TypeScript prêt à coller** dans le projet Next.js
2. **Imports complets** en haut du fichier
3. **Composant exporté** correctement
4. **Classes Tailwind responsive** (mobile + desktop)
5. **Animations Framer Motion** sur éléments visibles
6. **Mode sombre** géré via `dark:` classes
7. **Un commentaire** en haut expliquant le composant

### Template standard

```tsx
// components/sections/example.tsx
// Description : Ce composant affiche...

'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export function ExampleSection() {
  return (
    <section
      id="example"
      className="py-24 bg-background dark:bg-background"
    >
      <div className="container mx-auto px-4">
        {/* Contenu */}
      </div>
    </section>
  )
}
```

---

# 📝 Notes finales

Ce site web a pour ambition de **valoriser le mémoire** au-delà du PDF traditionnel. Il sera :

1. **Présenté en live** pendant la soutenance (démo interactive)
2. **Accessible via QR code** sur la page de garde du rapport
3. **Visible publiquement** après la soutenance (CV, LinkedIn)
4. **Maintenu actif** pour servir de portfolio technique

Toute génération de code par Claude doit garder cette finalité en tête : **impressionner un jury académique tout en montrant une maîtrise technique full-stack moderne**.

---

*Dernière mise à jour : Juin 2026*
*Auteur du projet : Soufiane [Nom]*
*Master MISD - Promotion 2024-2025*
