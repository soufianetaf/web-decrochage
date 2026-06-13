// components/three/data-sphere.tsx
// Nuage de points 3D (sphère de données) — métaphore des 32 593 étudiants OULAD.
// Rendu client uniquement (importé en dynamic ssr:false dans le hero).
'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function pointsInSphere(count: number, radius: number) {
  const arr = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random())
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
    arr[i * 3 + 2] = r * Math.cos(phi)
  }
  return arr
}

function Cloud({ color }: { color: string }) {
  const outer = useRef<THREE.Points>(null)
  const inner = useRef<THREE.Points>(null)
  const outerPos = useMemo(() => pointsInSphere(2200, 2.4), [])
  const innerPos = useMemo(() => pointsInSphere(900, 1.4), [])

  useFrame((state, delta) => {
    if (outer.current) {
      outer.current.rotation.y += delta * 0.07
      outer.current.rotation.x += delta * 0.02
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.05
    }
    // Parallaxe douce au mouvement de la souris
    const { x, y } = state.pointer
    state.camera.position.x += (x * 0.6 - state.camera.position.x) * 0.03
    state.camera.position.y += (y * 0.4 - state.camera.position.y) * 0.03
    state.camera.lookAt(0, 0, 0)
  })

  return (
    <group>
      <Points ref={outer} positions={outerPos} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.038}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
        />
      </Points>
      <Points ref={inner} positions={innerPos} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#34d399"
          size={0.05}
          sizeAttenuation
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  )
}

export default function DataSphere({ color = '#14b8a6' }: { color?: string }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Cloud color={color} />
    </Canvas>
  )
}
