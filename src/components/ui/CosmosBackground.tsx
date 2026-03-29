"use client";

import {
  motion,
  useTransform,
  MotionValue,
  useMotionValue,
} from "framer-motion";
import { useState, useEffect } from "react";
import type Lenis from "lenis";

interface Props {
  progress: MotionValue<number>; // kept for API compatibility, but we also self-subscribe to Lenis
}

// ─────────────────────────────────────────────────────────────
//  Seeded pseudo-random: same output every call with same seed
// ─────────────────────────────────────────────────────────────
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// ─────────────────────────────────────────────────────────────
//  CSS Star Field – client-only to prevent hydration mismatch
// ─────────────────────────────────────────────────────────────
type StarDot = {
  id: number; x: number; y: number; r: number;
  opacity: number; dur: number; delay: number;
};

function StarField() {
  const [stars, setStars] = useState<StarDot[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 180 }, (_, i) => ({
        id: i,
        x: seededRand(i * 3) * 100,
        y: seededRand(i * 7 + 1) * 100,
        r: seededRand(i * 11 + 2) * 1.4 + 0.3,
        opacity: seededRand(i * 13 + 3) * 0.5 + 0.2,
        dur: seededRand(i * 17 + 4) * 4 + 2,
        delay: seededRand(i * 19 + 5) * 5,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r }}
          animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Supernova explosion rays – expand radially from center
// ─────────────────────────────────────────────────────────────
function ExplosionRays({ progress }: { progress: MotionValue<number> }) {
  // Rays are visible only during the explosion window (12%–35% scroll)
  const opacity = useTransform(progress, [0.10, 0.14, 0.28, 0.38], [0, 1, 0.9, 0]);
  const rayCount = 24;

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      {Array.from({ length: rayCount }).map((_, i) => {
        const angle = Math.round((i / rayCount) * 360);
        const length = Math.round(200 + seededRand(i * 31) * 250);
        const width  = Math.max(1, Math.round(1 + seededRand(i * 37) * 2.5));
        
        return (
          <motion.div
            key={i}
            className="absolute origin-left"
            style={{
              left: "50%",
              top: "50%",
              width: `${length}px`,
              height: `${width}px`,
              rotate: `${angle}deg`,
              translateY: `-${width / 2}px`,
              background: `linear-gradient(to right, #fff8e0, #fbbf2480, transparent)`,
              borderRadius: 4,
              scale: useTransform(progress, [0.15, 0.32], [0.1, 1]),
            }}
          />
        );
      })}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main CosmosBackground
// ─────────────────────────────────────────────────────────────
export default function CosmosBackground({ progress: _propProgress }: Props) {
  // ── Subscribe to Lenis for accurate smooth-scroll progress ──
  // Framer's useScroll() tracks native scroll, but Lenis intercepts it.
  // We subscribe directly to Lenis's scroll event for the correct progress.
  const lenisProgress = useMotionValue(0);

  useEffect(() => {
    function sync() {
      const lenis = (window as Window & { __lenis?: Lenis }).__lenis;
      if (!lenis) return;
      // Lenis exposes progress as lenis.progress (0–1)
      lenis.on("scroll", ({ progress }: { progress: number }) => {
        lenisProgress.set(progress);
      });
    }
    // Lenis might not be ready yet (it mounts inside SmoothScroll which renders after)
    const timer = setTimeout(sync, 300);
    return () => clearTimeout(timer);
  }, [lenisProgress]);

  // Use lenisProgress for all animations (falls back to 0 until Lenis is ready)
  const progress = lenisProgress;

  // ── SCROLL PHASES ──────────────────────────────────────────
  // 0–12%   : Pulsing bright star (visible through hero text)
  // 12–30%  : Star explodes (supernova burst + shockwaves)
  // 30–50%  : Black hole forms from collapse
  // 50–100% : Black hole evolves → accretion disk shifts amber

  // Background colour
  const bgColor = useTransform(
    progress,
    [0,    0.12,  0.20,  0.32,  0.52,  0.72,  1],
    ["#000005", "#000008", "#0a0005", "#050010", "#08001a", "#120008", "#180800"]
  );

  // ── STAR (phase 0–0.14) ─────────────────────────────────────
  // Large bright star — visible THROUGH the hero text as a bg glow
  const starOpacity = useTransform(progress, [0, 0.04, 0.11, 0.16], [1, 1, 1, 0]);
  const starScale   = useTransform(progress, [0, 0.07, 0.11, 0.16], [1, 1.2, 1.1, 0]);
  const starGlow    = useTransform(
    progress,
    [0, 0.06, 0.11],
    [
      "0 0 60px 30px #fbbf24cc, 0 0 150px 60px #fbbf2450, 0 0 300px 100px #fbbf2420",
      "0 0 100px 50px #fff8e0ee, 0 0 250px 100px #fbbf2470, 0 0 500px 200px #fbbf2430",
      "0 0 80px 40px #fbbf24cc, 0 0 200px 80px #fbbf2440",
    ]
  );

  // ── FLASH (peak of explosion, phase 0.12–0.22) ─────────────
  const flashOpacity = useTransform(progress, [0.11, 0.14, 0.19, 0.25], [0, 1, 0.7, 0]);

  // ── SHOCKWAVE RINGS ────────────────────────────────────────
  const ring1Opacity = useTransform(progress, [0.12, 0.16, 0.34], [0, 1, 0]);
  const ring1Scale   = useTransform(progress, [0.12, 0.34], [0.05, 4.5]);
  const ring2Opacity = useTransform(progress, [0.15, 0.19, 0.40], [0, 0.8, 0]);
  const ring2Scale   = useTransform(progress, [0.15, 0.40], [0.05, 5.5]);
  const ring3Opacity = useTransform(progress, [0.18, 0.23, 0.46], [0, 0.6, 0]);
  const ring3Scale   = useTransform(progress, [0.18, 0.46], [0.05, 7]);

  // ── BLACK HOLE (phase 0.26–1.0) ────────────────────────────
  const bhOpacity    = useTransform(progress, [0.24, 0.36, 0.90, 1], [0, 1, 1, 0.8]);
  const bhScale      = useTransform(progress, [0.24, 0.38, 1], [0.01, 1, 1.3]);

  // Horizon – the solid black pill
  const horizonGlow  = useTransform(
    progress,
    [0.32, 0.52, 0.72, 1],
    [
      "0 0 30px 12px #059669aa",
      "0 0 40px 15px #26d0ceaa",
      "0 0 50px 20px #7c3aedaa",
      "0 0 60px 25px #f59e0baa",
    ]
  );

  // Accretion disk colour
  const diskColor = useTransform(
    progress,
    [0.32, 0.52, 0.72, 1],
    ["#059669", "#26d0ce", "#7c3aed", "#f59e0b"]
  );
  const diskRotate  = useTransform(progress, [0.32, 1], [0, 720]);
  const diskOpacity = useTransform(progress, [0.28, 0.40, 0.92, 1], [0, 1, 0.85, 0.5]);
  const diskScale   = useTransform(progress, [0.32, 0.52, 1], [0.2, 1, 1.4]);

  // Photon ring
  const photonColor   = useTransform(diskColor, (c) => c);
  const photonOpacity = useTransform(progress, [0.30, 0.42, 0.92, 1], [0, 1, 1, 0.6]);
  const photonScale   = useTransform(progress, [0.32, 0.46, 1], [0.1, 1, 1.2]);

  // Outer gravitational lens glow
  const lensColor   = useTransform(
    progress,
    [0.32, 0.52, 0.72, 1],
    [
      "radial-gradient(circle, #05966940 0%, transparent 70%)",
      "radial-gradient(circle, #26d0ce30 0%, transparent 70%)",
      "radial-gradient(circle, #7c3aed30 0%, transparent 70%)",
      "radial-gradient(circle, #f59e0b30 0%, transparent 70%)",
    ]
  );
  const lensOpacity = useTransform(progress, [0.28, 0.42, 1], [0, 1, 0.9]);

  // Nebula cloud (purple haze, phase 0.42–0.80)
  const nebulaOp = useTransform(progress, [0.40, 0.52, 0.70, 0.85], [0, 0.5, 0.5, 0]);

  // ── SECOND SUPERNOVA (at scroll end) ───────────────────────
  const novaOpacity    = useTransform(progress, [0.75, 0.85, 1], [0, 0.9, 0.7]);
  const novaScale      = useTransform(progress, [0.75, 1], [0.5, 2.5]);
  const novaRingOp     = useTransform(progress, [0.78, 0.88, 1], [0, 0.8, 0]);
  const novaRingScale  = useTransform(progress, [0.78, 1], [0.2, 3.5]);
  const novaBloopOp    = useTransform(progress, [0.80, 0.88, 1], [0, 0.6, 0]);
  const novaBloopScale = useTransform(progress, [0.80, 1], [0.3, 5]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, backgroundColor: bgColor }}
    >
      {/* Starfield */}
      <StarField />

      {/* ── Center stage – true viewport center so star shows behind hero text ── */}
      <div className="absolute inset-0 flex items-center justify-center">

        {/* ── PHASE 1: Pulsing star – LARGE so it shows through hero text ── */}
        {/* Outer mega-glow (400px ambient) */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            opacity: starOpacity,
            scale: starScale,
            background: "radial-gradient(circle, #fbbf2430 0%, #fbbf2415 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        {/* Core star body */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 80,
            height: 80,
            opacity: starOpacity,
            scale: starScale,
            background: "radial-gradient(circle, #fff8e0 0%, #fbbf24 45%, #f59e0b 75%, transparent 100%)",
            boxShadow: starGlow,
          }}
        />
        {/* Star corona pulse rings */}
        <motion.div
          className="absolute rounded-full"
          style={{ width: 160, height: 160, opacity: starOpacity }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full rounded-full border border-yellow-300/50" />
        </motion.div>
        <motion.div
          className="absolute rounded-full"
          style={{ width: 260, height: 260, opacity: starOpacity }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="w-full h-full rounded-full border border-yellow-200/30" />
        </motion.div>

        {/* ── PHASE 2: Explosion flash ── */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: "200vmax",
            height: "200vmax",
            opacity: flashOpacity,
            background: "radial-gradient(circle, #fff8e0 0%, #fbbf2460 20%, transparent 55%)",
          }}
        />

        {/* Explosion rays */}
        <ExplosionRays progress={progress} />

        {/* Shockwave ring 1 */}
        <motion.div
          className="absolute rounded-full border-2 border-yellow-300/80 pointer-events-none"
          style={{
            width: 200,
            height: 200,
            opacity: ring1Opacity,
            scale: ring1Scale,
            boxShadow: "0 0 20px 6px #fbbf2460",
          }}
        />
        {/* Shockwave ring 2 */}
        <motion.div
          className="absolute rounded-full border border-amber-400/60 pointer-events-none"
          style={{
            width: 280,
            height: 280,
            opacity: ring2Opacity,
            scale: ring2Scale,
            boxShadow: "0 0 15px 4px #f59e0b40",
          }}
        />
        {/* Shockwave ring 3 */}
        <motion.div
          className="absolute rounded-full border border-orange-500/40 pointer-events-none"
          style={{
            width: 350,
            height: 350,
            opacity: ring3Opacity,
            scale: ring3Scale,
          }}
        />

        {/* ── PHASE 3+: Black hole ── */}
        <motion.div
          className="absolute"
          style={{ opacity: bhOpacity, scale: bhScale }}
        >
          {/* Outer lens glow */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 700,
              height: 700,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              opacity: lensOpacity,
              background: lensColor,
              filter: "blur(80px)",
            }}
          />

          {/* Nebula cloud */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 600,
              height: 350,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              opacity: nebulaOp,
              background: "radial-gradient(ellipse, #7c3aed30 0%, #4c1d9520 50%, transparent 75%)",
              filter: "blur(40px)",
            }}
          />

          {/* Accretion disk – outer ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 460,
              height: 460,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              opacity: diskOpacity,
              rotate: diskRotate,
              scale: diskScale,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: diskColor,
                WebkitMaskImage:
                  "conic-gradient(from 0deg, black 0%, transparent 22%, black 44%, transparent 66%, black 88%, transparent 100%)",
                maskImage:
                  "conic-gradient(from 0deg, black 0%, transparent 22%, black 44%, transparent 66%, black 88%, transparent 100%)",
                filter: "blur(10px)",
                opacity: 0.95,
              }}
            />
          </motion.div>

          {/* Accretion disk – inner counter-ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 310,
              height: 310,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              opacity: diskOpacity,
              rotate: useTransform(progress, [0.35, 1], [0, -540]),
              scale: diskScale,
            }}
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: diskColor,
                WebkitMaskImage:
                  "conic-gradient(from 90deg, black 0%, transparent 28%, black 55%, transparent 82%, black 100%)",
                maskImage:
                  "conic-gradient(from 90deg, black 0%, transparent 28%, black 55%, transparent 82%, black 100%)",
                filter: "blur(7px)",
                opacity: 0.75,
              }}
            />
          </motion.div>

          {/* Photon ring */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 210,
              height: 210,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              opacity: photonOpacity,
              scale: photonScale,
            }}
          >
            <motion.div
              className="absolute inset-[-2px] rounded-full"
              style={{
                border: "2px solid",
                borderColor: photonColor,
                boxShadow: useTransform(
                  photonColor,
                  (c) => `0 0 20px 6px ${c}99, 0 0 60px 20px ${c}40`
                ),
              }}
            />
          </motion.div>

          {/* Event horizon – solid black sphere */}
          <motion.div
            className="absolute rounded-full bg-black"
            style={{
              width: 160,
              height: 160,
              top: "50%",
              left: "50%",
              translate: "-50% -50%",
              boxShadow: horizonGlow,
            }}
          />
        </motion.div>

        {/* ── PHASE 4: End supernova bloom ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 300,
            height: 300,
            opacity: novaOpacity,
            scale: novaScale,
            background:
              "radial-gradient(circle, #fbbf24aa 0%, #f59e0b60 30%, #ea580c30 60%, transparent 80%)",
            filter: "blur(20px)",
          }}
        />
        {/* Supernova rays conic */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 1200,
            height: 1200,
            opacity: useTransform(progress, [0.78, 0.88, 1], [0, 0.5, 0.35]),
            scale: useTransform(progress, [0.78, 1], [0.2, 1.2]),
            background:
              "conic-gradient(from 0deg, transparent 0%, #f59e0b15 5%, transparent 10%, #fbbf2415 15%, transparent 20%, #f59e0b15 25%, transparent 30%, #fbbf2420 35%, transparent 40%, #f59e0b15 45%, transparent 50%, #f59e0b15 55%, transparent 60%, #fbbf2415 65%, transparent 70%, #f59e0b15 75%, transparent 80%, #fbbf2410 85%, transparent 90%, #f59e0b15 95%, transparent 100%)",
          }}
        />
        {/* Shockwave ring */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 500,
            height: 500,
            opacity: novaRingOp,
            scale: novaRingScale,
            border: "3px solid #f59e0b",
            boxShadow: "0 0 40px 15px #f59e0b70, inset 0 0 40px 15px #f59e0b40",
          }}
        />
        {/* Full blorp bloom */}
        <motion.div
          className="absolute pointer-events-none"
          style={{
            width: "100vw",
            height: "100vh",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            opacity: novaBloopOp,
            scale: novaBloopScale,
            background:
              "radial-gradient(ellipse at center, #f59e0b18 0%, #fbbf2410 30%, transparent 65%)",
          }}
        />
      </div>
    </motion.div>
  );
}
