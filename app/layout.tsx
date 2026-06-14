import type { Metadata } from 'next'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { LanguageProvider } from '@/components/providers/language-provider'
import { PresentationProvider } from '@/components/presentation/presentation-mode'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { ReadingProgress } from '@/components/layout/reading-progress'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { PROJECT_META } from '@/lib/data/results'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  axes: ['opsz'],
})
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://decrochage-prediction.vercel.app'),
  title: {
    default: `${PROJECT_META.title} | ${PROJECT_META.formation}`,
    template: '%s | Mémoire MISD',
  },
  description:
    "Système intelligent et explicable de prévention du décrochage scolaire : pipeline Big Data (Databricks, ML, SHAP/LIME) prédisant le décrochage avec 96 % de F1-score dès la 8e semaine.",
  keywords: [
    'décrochage scolaire',
    'machine learning',
    'Databricks',
    'OULAD',
    'SHAP',
    'LIME',
    'XGBoost',
    'explicabilité',
    'Big Data',
    'Master MISD',
  ],
  authors: [{ name: PROJECT_META.author }],
  openGraph: {
    title: PROJECT_META.title,
    description: PROJECT_META.subtitle,
    type: 'website',
    locale: 'fr_FR',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ScholarlyArticle',
  headline: PROJECT_META.title,
  description: PROJECT_META.subtitle,
  inLanguage: 'fr',
  datePublished: '2025',
  author: { '@type': 'Person', name: PROJECT_META.author },
  publisher: { '@type': 'CollegeOrUniversity', name: PROJECT_META.university },
  about: ['décrochage scolaire', 'machine learning', 'explicabilité', 'Big Data', 'Databricks'],
  keywords: PROJECT_META.technologies.join(', '),
  url: 'https://decrochage-prediction.vercel.app',
  isBasedOn: 'Open University Learning Analytics Dataset (OULAD)',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${inter.variable} ${display.variable} ${mono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-dvh">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <PresentationProvider>
            <TooltipProvider delayDuration={150}>
            <SmoothScroll />
            <ReadingProgress />
            <a
              href="#hero"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1100] focus:rounded-lg focus:bg-forest-500 focus:px-4 focus:py-2 focus:text-white"
            >
              Aller au contenu
            </a>
            <Navbar />
            <main>{children}</main>
            <Footer />
            </TooltipProvider>
            </PresentationProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
