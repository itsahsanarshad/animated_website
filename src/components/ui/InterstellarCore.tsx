"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial, Float, Stars } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// Custom Accretion Disk Shader
const AccretionDiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color("#22c55e"),
    uEvolution: 0, // 0 = Black Hole, 1 = Supernova
  },
  // Vertex Shader
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment Shader
  `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uEvolution;
  varying vec2 vUv;

  // Simple noise
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = length(uv);
    float angle = atan(uv.y, uv.x);

    // Rotating disk logic
    float swirl = angle + uTime * 2.0;
    float ring = smoothstep(0.1, 0.5, dist) * smoothstep(0.5, 0.1, dist);
    
    // Turbulent noise for the disk
    float n = noise(vec2(dist * 10.0, swirl));
    
    // Color evolution: Green (BH) -> Purple/Magenta (Supernova)
    vec3 colorA = uColor;
    vec3 colorB = vec3(0.67, 0.23, 0.95); // Purple
    vec3 colorC = vec3(1.0, 0.0, 0.5);   // Magenta
    
    vec3 finalColor = mix(colorA, mix(colorB, colorC, uEvolution), uEvolution);
    
    // Pulsing intensity based on evolution
    float intensity = ring * (0.8 + n * 0.4);
    intensity += uEvolution * smoothstep(0.1, 0.0, dist) * 2.0;

    gl_FragColor = vec4(finalColor, intensity * (1.0 - uEvolution * 0.5));
  }
  `
);

extend({ AccretionDiskMaterial });

export default function InterstellarCore({ progress = 0 }: { progress: number }) {
  const diskRef = useRef<any>();
  const coreRef = useRef<any>();

  useFrame((state) => {
    const { clock } = state;
    if (diskRef.current) {
      diskRef.current.uTime = clock.getElapsedTime();
      diskRef.current.uEvolution = progress;
    }
    if (coreRef.current) {
      // Scale core based on evolution (it grows for supernova)
      const s = 1 + progress * 2;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group>
      {/* Event Horizon / Core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={progress > 0.5 ? "#ffffff" : "#000000"} />
      </mesh>

      {/* Accretion Disk */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh rotation={[-Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[1.2, 4, 128]} />
          {/* @ts-ignore */}
          <accretionDiskMaterial ref={diskRef} transparent side={THREE.DoubleSide} />
        </mesh>
      </Float>

      {/* Gravitational Lensing / Glow */}
      <mesh scale={[progress > 0.5 ? 8 : 4, progress > 0.5 ? 8 : 4, 1]}>
        <planeGeometry />
        <meshBasicMaterial 
          transparent 
          opacity={0.3} 
          color={progress > 0.5 ? "#ac3af2" : "#22c55e"} 
          map={null}
        />
      </mesh>
    </group>
  );
}
