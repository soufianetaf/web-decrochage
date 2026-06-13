// components/three/grad-scene.tsx
// Étudiant 3D réaliste (avatar Ready Player Me mi-corps) + toque de diplômé sur la tête.
// Pivote au scroll. Rendu client uniquement (importé en dynamic ssr:false dans le hero).
'use client'

import { Suspense, useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, ContactShadows, Environment, Lightformer } from '@react-three/drei'
import * as THREE from 'three'

const MODEL = '/models/student.glb'
useGLTF.preload(MODEL)

const INDIGO = '#3730a3'
const INDIGO_DARK = '#1e1b4b'
const GOLD = '#f5b942'
const SKY = '#0ea5e9'

/** Toque de diplômé (mortarboard) construite et fixée à l'os « Head ». */
function buildCap() {
  const cap = new THREE.Group()
  const boardMat = new THREE.MeshStandardMaterial({ color: INDIGO, roughness: 0.4, metalness: 0.3 })
  const baseMat = new THREE.MeshStandardMaterial({ color: INDIGO_DARK, roughness: 0.6, metalness: 0.15 })
  const goldMat = new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.25, metalness: 0.9 })

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.12, 0.07, 32), baseMat)
  base.position.y = 0.075
  cap.add(base)

  const board = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.022, 0.42), boardMat)
  board.position.y = 0.12
  cap.add(board)

  const button = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.018, 20), goldMat)
  button.position.y = 0.135
  cap.add(button)

  const cord = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.008, 0.008), goldMat)
  cord.position.set(0.1, 0.132, 0.1)
  cord.rotation.y = -Math.PI / 4
  cap.add(cord)

  const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.16, 10), goldMat)
  tassel.position.set(0.2, 0.05, 0.2)
  cap.add(tassel)
  const knot = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.02, 0.05, 12), goldMat)
  knot.position.set(0.2, -0.04, 0.2)
  cap.add(knot)

  return cap
}

function Student() {
  const root = useRef<THREE.Group>(null)
  const scroll = useRef(0)
  const { scene } = useGLTF(MODEL)

  // Clone pour éviter les conflits de cache si la scène est réutilisée.
  const model = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    // Centre + met à l'échelle l'avatar.
    const box = new THREE.Box3().setFromObject(model)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const scale = 2.7 / size.y
    model.scale.setScalar(scale)
    // Cadrage portrait : on place la tête vers le haut du cadre.
    model.position.set(-center.x * scale, -center.y * scale - 0.95, -center.z * scale)

    model.traverse((o) => {
      o.castShadow = true
      o.frustumCulled = false
    })

    // Fixe la toque à l'os de la tête.
    const head = model.getObjectByName('Head') || model.getObjectByName('mixamorigHead')
    if (head) {
      const cap = buildCap()
      cap.position.set(0, 0.12, 0.02)
      head.add(cap)
    }
  }, [model])

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const h = hero?.offsetHeight || window.innerHeight
      scroll.current = Math.min(1, Math.max(0, window.scrollY / h))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    if (!root.current) return
    const s = scroll.current
    // Léger va-et-vient + rotation accentuée au scroll
    const idle = Math.sin(state.clock.elapsedTime * 0.5) * 0.18
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, idle + s * Math.PI * 0.9, 0.08)
    root.current.position.y = -s * 0.5
  })

  return (
    <group ref={root}>
      <primitive object={model} />
    </group>
  )
}

function StudioEnv() {
  return (
    <Environment resolution={256}>
      <Lightformer intensity={2.2} position={[0, 3, 2]} scale={[6, 3, 1]} color="#ffffff" />
      <Lightformer intensity={1.4} position={[-3, 1, 2]} scale={[3, 3, 1]} color={SKY} />
      <Lightformer intensity={1.2} position={[3, 1, 2]} scale={[3, 3, 1]} color="#ffffff" />
      <Lightformer intensity={1} position={[0, -2, 1]} scale={[6, 2, 1]} color={INDIGO} />
    </Environment>
  )
}

export default function GradScene() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 3.4], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 4]} intensity={1.8} />
      <directionalLight position={[-4, 2, 2]} intensity={0.7} color={SKY} />
      <Suspense fallback={null}>
        <Student />
      </Suspense>
      <ContactShadows position={[0, -1.5, 0]} opacity={0.35} scale={8} blur={2.6} far={3} color={INDIGO_DARK} />
      <StudioEnv />
    </Canvas>
  )
}
