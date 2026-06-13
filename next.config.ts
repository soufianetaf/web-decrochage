import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Évite l'inférence d'un mauvais workspace root (lockfile parent).
  turbopack: { root: __dirname },
  images: {
    // Les figures sont des SVG locaux (placeholders) ; à remplacer par des PNG/WebP.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
  },
}

export default nextConfig
