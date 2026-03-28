"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import InterstellarCore from "./InterstellarCore";

// ──────────────────────────────────────────────
// PHASE-DRIVEN NEBULA BACKGROUND PLANE
// ──────────────────────────────────────────────
function NebulaCosmos({ progress = 0 }: { progress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      // Phase colours
      uVoid: { value: new THREE.Color("#000005") },
      uNebula: { value: new THREE.Color("#2d054a") },
      uNova: { value: new THREE.Color("#7c1a00") },
      uNovaGold: { value: new THREE.Color("#f59e0b") },
    }),
    []
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.uTime.value = clock.getElapsedTime();
    mat.uniforms.uProgress.value = progress;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -15]} scale={[40, 40, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uProgress;
          uniform vec3 uVoid;
          uniform vec3 uNebula;
          uniform vec3 uNova;
          uniform vec3 uNovaGold;

          // Hash noise
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));
            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          float fbm(vec2 p) {
            float v = 0.0;
            float a = 0.5;
            for (int i = 0; i < 5; i++) {
              v += a * noise(p);
              p = p * 2.1 + vec2(1.7, 9.2);
              a *= 0.5;
            }
            return v;
          }

          void main() {
            vec2 uv = vUv - 0.5;
            float dist = length(uv);
            float t = uTime * 0.05;

            // Phase split: 0-0.45 void, 0.45-0.75 nebula, 0.75-1.0 supernova
            float nebulaPhase = smoothstep(0.35, 0.65, uProgress);
            float novaPhase   = smoothstep(0.65, 0.90, uProgress);

            // FBM nebula clouds
            float n = fbm(uv * 3.0 + t);
            float n2 = fbm(uv * 2.0 - t * 0.7 + 1.5);
            float nebulaMask = smoothstep(0.4, 0.9, n) * smoothstep(1.2, 0.1, dist * 2.5);

            // Radial supernova explosion
            float radialBurst = smoothstep(0.9, 0.0, dist * (1.5 - novaPhase));
            float rayBurst = 0.0;
            if (novaPhase > 0.0) {
              float angle = atan(uv.y, uv.x);
              float rays = abs(sin(angle * 6.0 + t * 2.0)) * abs(sin(angle * 11.0 - t));
              rayBurst = rays * smoothstep(0.8, 0.1, dist) * novaPhase;
            }

            // Phase-blend colours
            vec3 col = uVoid;
            col = mix(col, uNebula * (n * 1.8 + 0.4), nebulaPhase * nebulaMask * 0.9);
            col = mix(col, uNova * (n2 * 1.4 + 0.6), novaPhase * 0.7);
            col += uNovaGold * (radialBurst * novaPhase * 0.5 + rayBurst * 0.6);

            // Radial vignette – always dark at edges
            float vignette = smoothstep(1.2, 0.2, dist);
            float alpha = (nebulaMask * nebulaPhase * 0.6 + novaPhase * radialBurst * 0.9 + rayBurst * novaPhase * 0.5) * vignette;

            gl_FragColor = vec4(col, clamp(alpha, 0.0, 0.95));
          }
        `}
      />
    </mesh>
  );
}

// ──────────────────────────────────────────────
// STAR FIELD – accelerates + brightens on progress
// ──────────────────────────────────────────────
function StarField({ progress = 0 }: { progress?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(10000 * 3);
    for (let i = 0; i < 10000; i++) {
      p[i * 3]     = (Math.random() - 0.5) * 80;
      p[i * 3 + 1] = (Math.random() - 0.5) * 80;
      p[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ mouse }) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.00015 + progress * 0.0008;
    ref.current.rotation.x += 0.00005 + progress * 0.0003;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 1.5, 0.04);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 1.5, 0.04);
  });

  // Star colour shifts from cool white → warm amber as nova approaches
  const starColor = progress > 0.7
    ? `hsl(${40 - (progress - 0.7) * 40}, 80%, 80%)`
    : "#ffffff";

  return (
    <group>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={starColor}
          size={0.035 + progress * 0.02}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Stars
        radius={140}
        depth={70}
        count={5000}
        factor={5}
        saturation={0}
        fade
        speed={1.2 + progress * 3}
      />
    </group>
  );
}

// ──────────────────────────────────────────────
// MAIN EXPORT
// ──────────────────────────────────────────────
export default function CosmosBackground({ progress = 0 }: { progress?: number }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: -1,
        // Background colour transitions: void → deep purple → amber/nova
        backgroundColor:
          progress > 0.7
            ? `hsl(${20 - (progress - 0.7) * 30}, ${(progress - 0.7) * 40}%, ${1 + (progress - 0.7) * 4}%)`
            : progress > 0.4
            ? `hsl(${270}, ${(progress - 0.4) * 10}%, ${0.5 + (progress - 0.4) * 1.5}%)`
            : "#000005",
        transition: "background-color 0.5s ease",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 + progress * 15 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3 + progress * 0.5} />
        <pointLight position={[0, 0, 4]} intensity={2 + progress * 6} color={progress > 0.6 ? "#f59e0b" : "#22c55e"} />
        <StarField progress={progress} />
        <NebulaCosmos progress={progress} />
        <InterstellarCore progress={progress} />
      </Canvas>
    </div>
  );
}
