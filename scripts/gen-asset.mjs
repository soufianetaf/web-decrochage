// scripts/gen-asset.mjs
// Génère une image via l'API Google Gemini (Nano Banana 2) et l'enregistre dans /public.
// Usage : node scripts/gen-asset.mjs <chemin-sortie.png> "<prompt>" [imageRef.png ...]
// Clé lue depuis .env.local : GEMINI_API_KEY=...   (optionnel : GEMINI_IMAGE_MODEL=...)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

// --- Charge .env.local sans dépendance ---
function loadEnv() {
  const p = resolve(process.cwd(), '.env.local')
  if (!existsSync(p)) return
  for (const line of readFileSync(p, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
}
loadEnv()

const KEY = process.env.GEMINI_API_KEY
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-3-pro-image-preview'
if (!KEY) {
  console.error('✗ GEMINI_API_KEY manquante. Ajoute-la dans .env.local')
  process.exit(1)
}

const [, , outPath, prompt, ...refs] = process.argv
if (!outPath || !prompt) {
  console.error('Usage : node scripts/gen-asset.mjs <sortie.png> "<prompt>" [ref.png ...]')
  process.exit(1)
}

function fileToInlineData(path) {
  const data = readFileSync(path)
  const ext = path.split('.').pop().toLowerCase()
  const mime = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : ext === 'webp' ? 'image/webp' : 'image/png'
  return { inlineData: { mimeType: mime, data: data.toString('base64') } }
}

const parts = [{ text: prompt }, ...refs.map(fileToInlineData)]
const body = {
  contents: [{ role: 'user', parts }],
  generationConfig: { responseModalities: ['IMAGE'] },
}

const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`

const res = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'x-goog-api-key': KEY },
  body: JSON.stringify(body),
})

if (!res.ok) {
  console.error(`✗ HTTP ${res.status} (modèle ${MODEL})`)
  console.error((await res.text()).slice(0, 800))
  process.exit(1)
}

const json = await res.json()
const partsOut = json?.candidates?.[0]?.content?.parts ?? []
const img = partsOut.find((p) => p.inlineData?.data)
if (!img) {
  console.error('✗ Aucune image renvoyée. Réponse :')
  console.error(JSON.stringify(json, null, 2).slice(0, 1000))
  process.exit(1)
}

const abs = resolve(process.cwd(), outPath)
mkdirSync(dirname(abs), { recursive: true })
writeFileSync(abs, Buffer.from(img.inlineData.data, 'base64'))
console.log(`✓ ${outPath} (${MODEL}, ${(img.inlineData.data.length * 0.75 / 1024).toFixed(0)} Ko)`)
