"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";
import InterstellarCore from "./InterstellarCore";

function Nebula({ progress = 0 }: { progress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uColor1: { value: new THREE.Color("#0f172a") },
      uColor2: { value: new THREE.Color("#22c55e") },
      uColor3: { value: new THREE.Color("#ac3af2") },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uProgress.value = progress;
      
      // Shift colors based on progress
      if (progress > 0.5) {
        material.uniforms.uColor2.value.lerp(new THREE.Color("#ac3af2"), 0.05);
      } else {
        material.uniforms.uColor2.value.lerp(new THREE.Color("#22c55e"), 0.05);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[30, 30, 1]}>
      <planeGeometry args={[1, 1]} />
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
          uniform vec3 uColor1;
          uniform vec3 uColor2;

          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main() {
            vec2 p = vUv * 2.0 - 1.0;
            float d = length(p);
            float alpha = smoothstep(1.2, 0.0, d) * 0.4;
            
            float n = noise(vUv + uTime * 0.02);
            vec3 color = mix(uColor1, uColor2, n * 0.5 + 0.5);
            
            // Pulse on progress
            float pulse = 0.5 + 0.5 * sin(uTime * 0.5 + uProgress * 2.0);
            
            gl_FragColor = vec4(color, alpha * pulse);
          }
        `}
      />
    </mesh>
  );
}

function StarField({ progress = 0 }: { progress?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(8000 * 3);
    for (let i = 0; i < 8000; i++) {
      p[i * 3] = (Math.random() - 0.5) * 60;
      p[i * 3 + 1] = (Math.random() - 0.5) * 60;
      p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.0002 + progress * 0.001;
      ref.current.rotation.x += 0.0001;
      
      const { mouse } = state;
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 2, 0.05);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 2, 0.05);
    }
  });

  return (
    <group>
      <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.04}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      <Stars radius={120} depth={60} count={6000} factor={6} saturation={0} fade speed={1 + progress * 2} />
    </group>
  );
}

export default function CosmosBackground({ progress = 0 }: { progress?: number }) {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#020617] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 + progress * 20 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <StarField progress={progress} />
        <Nebula progress={progress} />
        <InterstellarCore progress={progress} />
      </Canvas>
    </div>
  );
}
