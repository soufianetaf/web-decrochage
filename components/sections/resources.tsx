// components/sections/resources.tsx
// Cartes-CTA + citation (BibTeX/APA) + QR code. Bilingue.
'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import {
  FileDown,
  Code2,
  Video,
  Mail,
  Contact,
  Quote,
  Copy,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { useI18n } from '@/components/providers/language-provider'
import { PROJECT_META } from '@/lib/data/results'

const SITE_URL = 'https://decrochage-prediction.vercel.app'

const CARD_META: { icon: LucideIcon; accent: string; href: string; external?: boolean; variant: 'primary' | 'secondary'; secondAction?: { icon: LucideIcon; href: string; key: 'linkedin' } }[] = [
  { icon: FileDown, accent: 'bg-forest-500', href: '/memoire.pdf', variant: 'primary' },
  { icon: Code2, accent: 'bg-forest-600', href: 'https://github.com/soufiane/dropout-prediction', external: true, variant: 'secondary' },
  { icon: Video, accent: 'bg-moss-600', href: '#', variant: 'secondary' },
  { icon: Mail, accent: 'bg-aws', href: 'mailto:itssoufianetafahi@gmail.com', variant: 'primary', secondAction: { icon: Contact, href: 'https://linkedin.com', key: 'linkedin' } },
]

export function ResourcesSection() {
  const { t } = useI18n()

  return (
    <section id="resources" className="bg-forest-50/50 py-24 dark:bg-forest-900/30 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.resources.eyebrow}
          title={t.resources.title}
          subtitle={t.resources.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {t.resources.cards.map((card, i) => {
            const meta = CARD_META[i]
            const Icon = meta.icon
            return (
              <Reveal key={i} index={i % 2} as="article">
                <Card className="h-full">
                  <CardContent className="flex h-full flex-col p-7">
                    <span className={`flex size-12 items-center justify-center rounded-xl text-white ${meta.accent}`}>
                      <Icon className="size-6" />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{card.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {meta.secondAction && (
                        <Button variant="secondary" size="sm" asChild>
                          <a href={meta.secondAction.href} target="_blank" rel="noopener noreferrer">
                            <meta.secondAction.icon className="size-4" />
                            LinkedIn
                          </a>
                        </Button>
                      )}
                      <Button variant={meta.variant} size="sm" asChild>
                        <a
                          href={meta.href}
                          target={meta.external ? '_blank' : undefined}
                          rel={meta.external ? 'noopener noreferrer' : undefined}
                        >
                          {meta.secondAction && <Mail className="size-4" />}
                          {card.cta}
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>

        {/* Citation + QR */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal as="article">
            <CitationCard />
          </Reveal>
          <Reveal as="article" index={1}>
            <Card className="h-full">
              <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-7 text-center">
                <div className="rounded-xl bg-white p-3 shadow-sm">
                  <QRCodeSVG value={SITE_URL} size={132} fgColor="#1F4520" level="M" />
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{t.resources.qrTitle}</p>
                  <p className="mt-1 text-sm text-muted">{t.resources.qrDesc}</p>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function CitationCard() {
  const { t } = useI18n()
  const [copied, setCopied] = useState<string | null>(null)

  const bibtex = `@mastersthesis{tafahi2025dropout,
  title   = {${PROJECT_META.title}},
  author  = {${PROJECT_META.author}},
  year    = {2025},
  school  = {${PROJECT_META.university}},
  type    = {Mémoire de Master MISD},
  url     = {${SITE_URL}}
}`

  const apa = `${PROJECT_META.author} (2025). ${PROJECT_META.title} [Mémoire de Master, ${PROJECT_META.university}]. ${SITE_URL}`

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      /* clipboard indisponible */
    }
  }

  return (
    <Card className="h-full">
      <CardContent className="p-7">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-lg bg-forest-50 text-forest-500 dark:bg-forest-700/50 dark:text-moss-500">
            <Quote className="size-5" />
          </span>
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground">{t.resources.cite}</h3>
            <p className="text-sm text-muted">{t.resources.citeDesc}</p>
          </div>
        </div>

        <Tabs defaultValue="bibtex" className="mt-5">
          <TabsList>
            <TabsTrigger value="bibtex">BibTeX</TabsTrigger>
            <TabsTrigger value="apa">APA</TabsTrigger>
          </TabsList>

          {[
            { value: 'bibtex', text: bibtex },
            { value: 'apa', text: apa },
          ].map((c) => (
            <TabsContent key={c.value} value={c.value} className="mt-4">
              <div className="relative">
                <pre className="max-h-48 overflow-auto rounded-xl border border-border bg-forest-50/60 p-4 font-mono text-xs leading-relaxed text-foreground/90 dark:bg-forest-700/30">
                  {c.text}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute right-2 top-2"
                  onClick={() => copy(c.text, c.value)}
                >
                  {copied === c.value ? (
                    <>
                      <Check className="size-4" /> {t.resources.copied}
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" /> {t.resources.copy}
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
