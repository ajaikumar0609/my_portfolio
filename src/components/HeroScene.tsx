'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const PARTICLE_COUNT = 600
const LINE_COUNT = 150

function ParticleSystem({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4
      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }
    return { positions, velocities }
  }, [])

  // Build particles geometry imperatively
  const particleGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  // Build lines geometry imperatively
  const linesGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const linePositions = new Float32Array(LINE_COUNT * 6)
    for (let i = 0; i < LINE_COUNT; i++) {
      const ai = Math.floor(Math.random() * PARTICLE_COUNT)
      const bi = Math.floor(Math.random() * PARTICLE_COUNT)
      linePositions[i * 6] = positions[ai * 3]
      linePositions[i * 6 + 1] = positions[ai * 3 + 1]
      linePositions[i * 6 + 2] = positions[ai * 3 + 2]
      linePositions[i * 6 + 3] = positions[bi * 3]
      linePositions[i * 6 + 4] = positions[bi * 3 + 1]
      linePositions[i * 6 + 5] = positions[bi * 3 + 2]
    }
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    return geo
  }, [positions])

  useFrame(() => {
    if (!particleGeo) return
    const pos = particleGeo.attributes.position.array as Float32Array
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]
      if (pos[i * 3] > 7) pos[i * 3] = -7
      if (pos[i * 3] < -7) pos[i * 3] = 7
      if (pos[i * 3 + 1] > 4) pos[i * 3 + 1] = -4
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = 4
    }
    particleGeo.attributes.position.needsUpdate = true

    if (groupRef.current && mouseRef.current) {
      groupRef.current.rotation.y += (mouseRef.current.x * 0.3 - groupRef.current.rotation.y) * 0.05
      groupRef.current.rotation.x += (-mouseRef.current.y * 0.15 - groupRef.current.rotation.x) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef} geometry={particleGeo}>
        <pointsMaterial color="#F4F1EA" size={0.025} transparent opacity={0.35} sizeAttenuation />
      </points>

      <lineSegments geometry={linesGeo}>
        <lineBasicMaterial color="#B8FF3D" transparent opacity={0.05} />
      </lineSegments>

      {[
        { pos: [-1.5, 1.2, 0] as [number, number, number], label: 'YAMINI' },
        { pos: [1.5, 1.2, 0] as [number, number, number], label: 'KAVYA' },
        { pos: [0, -1.2, 0] as [number, number, number], label: 'UZHAVAN' },
      ].map((node) => (
        <group key={node.label} position={node.pos}>
          <mesh>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#B8FF3D" emissive="#B8FF3D" emissiveIntensity={0.4} />
          </mesh>
          <Html center>
            <div style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '9px',
              color: '#B8FF3D',
              letterSpacing: '0.2em',
              marginTop: '16px',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              pointerEvents: 'none',
            }}>
              {node.label}
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}

function PhotoMesh() {
  const hoverRef = useRef(0)
  const materialRef = useRef<THREE.ShaderMaterial | null>(null)

  const uniforms = useMemo(() => ({
    uTexture: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uHover: { value: 0 },
  }), [])

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform sampler2D uTexture;
    uniform float uTime;
    uniform float uHover;
    varying vec2 vUv;
    void main() {
      float aberration = uHover * 0.008;
      vec4 r = texture2D(uTexture, vUv + vec2(aberration, 0.0));
      vec4 g = texture2D(uTexture, vUv);
      vec4 b = texture2D(uTexture, vUv - vec2(aberration, 0.0));
      float scanline = sin(vUv.y * 200.0 + uTime * 2.0) * 0.03;
      gl_FragColor = vec4(r.r, g.g, b.b, g.a) - scanline;
    }
  `

  useEffect(() => {
    const loader = new THREE.TextureLoader()
    loader.load('/mypic.png', (tex) => {
      if (materialRef.current) {
        materialRef.current.uniforms.uTexture.value = tex
        materialRef.current.needsUpdate = true
      }
    })
  }, [])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime
      materialRef.current.uniforms.uHover.value +=
        (hoverRef.current - materialRef.current.uniforms.uHover.value) * 0.08
    }
  })

  return (
    <mesh
      position={[3.2, 0, 0]}
      onPointerEnter={() => { hoverRef.current = 1 }}
      onPointerLeave={() => { hoverRef.current = 0 }}
    >
      <planeGeometry args={[2.2, 3]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  )
}

export default function HeroScene({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number }> }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#B8FF3D" />
      <ParticleSystem mouseRef={mouseRef} />
      <PhotoMesh />
    </Canvas>
  )
}
