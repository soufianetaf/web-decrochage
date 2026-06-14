// app/opengraph-image.tsx — image de partage social générée dynamiquement.
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Système intelligent et explicable de prévention du décrochage scolaire'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, #0A1A0B 0%, #1F4520 55%, #2C5F2D 100%)',
          color: '#F2F7F2',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#97BC62',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🎓
          </div>
          <div style={{ fontSize: 26, color: '#818cf8', fontWeight: 700 }}>
            Master MISD · 2025-2026
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.1, letterSpacing: -1 }}>
            Prévention du décrochage scolaire
          </div>
          <div style={{ fontSize: 30, color: '#E0EBE0' }}>
            96 % de F1-score · dès la 8ᵉ semaine · explicable (SHAP / LIME)
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, fontSize: 24, color: '#97BC62' }}>
          <span>Databricks</span>
          <span>·</span>
          <span>PySpark</span>
          <span>·</span>
          <span>XGBoost</span>
          <span>·</span>
          <span>OULAD</span>
        </div>
      </div>
    ),
    size,
  )
}
