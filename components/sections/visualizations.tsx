// components/sections/visualizations.tsx
// Galerie des figures clés avec lightbox (yet-another-react-lightbox).
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ZoomIn } from 'lucide-react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Card } from '@/components/ui/card'
import { Reveal } from '@/components/shared/reveal'
import { SectionHeading } from '@/components/shared/section-heading'
import { useI18n } from '@/components/providers/language-provider'
import { FIGURES } from '@/lib/data/figures'

export function VisualizationsSection() {
  const { t } = useI18n()
  const [index, setIndex] = useState(-1)
  const caption = (i: number) => t.viz.captions[i] ?? FIGURES[i].caption

  return (
    <section id="visualizations" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={t.viz.eyebrow} title={t.viz.title} subtitle={t.viz.subtitle} />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FIGURES.map((fig, i) => (
            <Reveal key={fig.src} index={i % 3}>
              <Card className="group overflow-hidden p-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="relative block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500"
                  aria-label={`${t.viz.zoom} : ${caption(i)}`}
                >
                  <div className="relative aspect-[8/5] overflow-hidden">
                    <Image
                      src={fig.src}
                      alt={caption(i)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-forest-900/0 opacity-0 transition-all duration-300 group-hover:bg-forest-900/30 group-hover:opacity-100">
                      <ZoomIn className="size-8 text-white" />
                    </span>
                  </div>
                  <p className="px-4 py-3 text-left text-sm font-medium text-foreground">
                    {caption(i)}
                  </p>
                </button>
              </Card>
            </Reveal>
          ))}
        </div>

        <Lightbox
          open={index >= 0}
          close={() => setIndex(-1)}
          index={Math.max(0, index)}
          slides={FIGURES.map((f, i) => ({ src: f.src, alt: caption(i), title: caption(i) }))}
        />
      </div>
    </section>
  )
}
