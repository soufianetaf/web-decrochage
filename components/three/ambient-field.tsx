// components/three/ambient-field.tsx
// Champ de points « données » ambiant pour le fond du hero (sombre cinématique).
// Dérive lente + parallaxe souris. Rendu client uniquement (dynamic ssr:false).
'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Field({ color, count = 1600 }: { color: string; count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 14
      a[i * 3 + 1] = (Math.random() - 0.5) * 9
      a[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return a
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.025
    ref.current.rotation.x += delta * 0.008
    const { x, y } = state.pointer
    state.camera.position.x += (x * 0.5 - state.camera.position.x) * 0.04
    state.camera.position.y += (y * 0.3 - state.camera.position.y) * 0.04
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color={color} size={0.03} sizeAttenuation depthWrite={false} opacity={0.85} />
    </Points>
  )
}

export default function AmbientField() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
      <Field color="#6366f1" count={1100} />
      <Field color="#22d3ee" count={500} />
    </Canvas>
  )
}
