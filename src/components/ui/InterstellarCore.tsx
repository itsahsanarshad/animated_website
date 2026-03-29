"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { shaderMaterial, Float } from "@react-three/drei";
import { extend } from "@react-three/fiber";

// ─────────────────────────────────────────────
// ACCRETION DISK SHADER
// ─────────────────────────────────────────────
const AccretionDiskMaterial = shaderMaterial(
  {
    uTime: 0,
    uEvolution: 0,
  },
  // Vertex
  `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  // Fragment
  `
  uniform float uTime;
  uniform float uEvolution;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5); }
  float noise(vec2 p){
    vec2 i=floor(p); vec2 f=fract(p);
    f=f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }

  void main() {
    vec2 uv  = vUv - 0.5;
    float dist  = length(uv);
    float angle = atan(uv.y, uv.x);

    float swirl = angle + uTime * 2.5 + dist * 4.0;
    float ring  = smoothstep(0.08, 0.5, dist) * smoothstep(0.5, 0.08, dist);
    float n     = noise(vec2(dist * 12.0, swirl));
    float turb  = noise(vec2(dist * 6.0, swirl * 0.5 + uTime * 0.3)) * 0.4;

    // Phase colours: teal/green BH -> gold/amber nova
    float phase    = smoothstep(0.3, 0.8, uEvolution);
    vec3  colBH    = mix(vec3(0.05, 0.7, 0.45), vec3(0.45, 0.05, 0.85), uEvolution * 0.5); // teal→purple
    vec3  colNova  = mix(vec3(0.95, 0.60, 0.05), vec3(1.0, 0.2, 0.5), phase);              // gold→magenta
    vec3  finalCol = mix(colBH, colNova, phase);

    float brightness = 0.7 + n * 0.5 + turb;
    float intensity  = ring * brightness;
    // Nova outer flare
    intensity += uEvolution * smoothstep(0.35, 0.0, dist) * 2.5;

    float alpha = intensity * (1.0 - uEvolution * 0.4) * 1.4;
    gl_FragColor  = vec4(finalCol * brightness, clamp(alpha, 0.0, 1.0));
  }
  `
);

extend({ AccretionDiskMaterial });

// ─────────────────────────────────────────────
// PHOTON RING SHADER
// ─────────────────────────────────────────────
const PhotonRingMaterial = shaderMaterial(
  { uTime: 0, uEvolution: 0 },
  `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  `
  uniform float uTime;
  uniform float uEvolution;
  varying vec2 vUv;
  void main(){
    vec2 uv=vUv-0.5;
    float d=length(uv);
    float ring=smoothstep(0.48,0.50,d)*smoothstep(0.52,0.50,d);
    float angle=atan(uv.y,uv.x);
    float flicker=0.6+0.4*sin(angle*8.0+uTime*3.0);
    vec3 col=mix(vec3(0.95,0.75,0.05),vec3(1.0,0.4,0.8),uEvolution);
    gl_FragColor=vec4(col*flicker,ring*clamp(1.2-uEvolution*0.3,0.3,1.2));
  }
  `
);

extend({ PhotonRingMaterial });

// ─────────────────────────────────────────────
// SUPERNOVA SHOCKWAVE SHADER
// ─────────────────────────────────────────────
const ShockwaveMaterial = shaderMaterial(
  { uTime: 0, uEvolution: 0 },
  `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
  `
  uniform float uTime;
  uniform float uEvolution;
  varying vec2 vUv;
  void main(){
    float phase=smoothstep(0.72,1.0,uEvolution);
    vec2 uv=vUv-0.5;
    float d=length(uv);
    float t=uTime*0.8;
    float wave=smoothstep(0.45+phase*0.3-0.04,0.45+phase*0.3,d)*
               smoothstep(0.45+phase*0.3+0.04,0.45+phase*0.3,d);
    float angle=atan(uv.y,uv.x);
    float ray=abs(sin(angle*7.0+t))*0.5+0.5;
    vec3 col=mix(vec3(1.0,0.6,0.1),vec3(1.0,0.2,0.5),phase)*ray;
    gl_FragColor=vec4(col,wave*phase*0.9);
  }
  `
);

extend({ ShockwaveMaterial });

// ─────────────────────────────────────────────
// MAIN INTERSTELLAR CORE
// ─────────────────────────────────────────────
export default function InterstellarCore({ progress = 0 }: { progress: number }) {
  const diskRef    = useRef<any>(null);
  const photonRef  = useRef<any>(null);
  const shockRef   = useRef<any>(null);
  const coreRef    = useRef<THREE.Mesh>(null);
  const glowRef    = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (diskRef.current) {
      diskRef.current.uTime      = t;
      diskRef.current.uEvolution = progress;
    }
    if (photonRef.current) {
      photonRef.current.uTime      = t;
      photonRef.current.uEvolution = progress;
    }
    if (shockRef.current) {
      shockRef.current.uTime      = t;
      shockRef.current.uEvolution = progress;
    }
    if (coreRef.current) {
      const novaPhase = Math.max(0, (progress - 0.75) / 0.25);
      const s = 1 + novaPhase * 3.5;
      coreRef.current.scale.setScalar(s);
      (coreRef.current.material as THREE.MeshBasicMaterial).color.set(
        novaPhase > 0.5 ? "#fef3c7" : novaPhase > 0 ? "#f59e0b" : "#000000"
      );
    }
    if (glowRef.current) {
      const novaPhase = Math.max(0, (progress - 0.5) / 0.5);
      const gs = 4 + novaPhase * 10;
      glowRef.current.scale.set(gs, gs, 1);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + novaPhase * 0.4;
      (glowRef.current.material as THREE.MeshBasicMaterial).color.set(
        novaPhase > 0.5 ? "#f59e0b" : progress > 0.4 ? "#7c3aed" : "#059669"
      );
    }
  });

  return (
    <group>
      {/* Event Horizon – solid black sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Photon Ring */}
      <mesh rotation={[-Math.PI / 2.5, 0, 0]} scale={[5.5, 5.5, 5.5]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        {/* @ts-ignore */}
        <photonRingMaterial ref={photonRef} transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Accretion Disk */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh rotation={[-Math.PI / 2.8, 0, 0]}>
          <ringGeometry args={[1.2, 4.5, 160]} />
          {/* @ts-ignore */}
          <accretionDiskMaterial ref={diskRef} transparent side={THREE.DoubleSide} depthWrite={false} blending={THREE.AdditiveBlending} />
        </mesh>
      </Float>

      {/* Supernova Shockwave Ring */}
      <mesh scale={[12, 12, 1]}>
        <planeGeometry args={[1, 1, 1, 1]} />
        {/* @ts-ignore */}
        <shockwaveMaterial ref={shockRef} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Glow plane */}
      <mesh ref={glowRef}>
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial
          transparent
          opacity={0.15}
          color="#059669"
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}
