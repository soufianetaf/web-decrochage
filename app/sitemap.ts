import type { MetadataRoute } from 'next'

const SITE = 'https://decrochage-prediction.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...['problem', 'demo', 'pipeline', 'results', 'architecture', 'visualizations', 'resources'].map(
      (id) => ({
        url: `${SITE}/#${id}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }),
    ),
  ]
}
