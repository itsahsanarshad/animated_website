"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const sectors = [
  { name: "NEBULA CORRIDOR",  range: [0, 0.17],  section: "Hero" },
  { name: "ORIGIN ARCHIVE",   range: [0.17, 0.35], section: "About" },
  { name: "SYNAPTIC BRIDGE",  range: [0.35, 0.52], section: "Skills" },
  { name: "STELLAR OBJECTS",  range: [0.52, 0.68], section: "Projects" },
  { name: "GALACTIC PATH",    range: [0.68, 0.84], section: "Journey" },
  { name: "THE SINGULARITY",  range: [0.84, 1.0],  section: "Contact" },
];

export default function HUDOverlay() {
  const { scrollYProgress } = useScroll();
  const smoothProgress      = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  const [currentSector, setCurrentSector] = useState(sectors[0].name);
  const [scrollPct, setScrollPct]         = useState(0);
  const [mousePos, setMousePos]           = useState({ x: 0, y: 0 });
  const [phase, setPhase]                 = useState<"blackhole" | "nebula" | "nova">("blackhole");

  const velocity    = useTransform(smoothProgress, [0, 1], [0, 299792]);
  const distortion  = useTransform(smoothProgress, [0, 1], [0.001, 1.0]);
  const velDisplay  = useTransform(velocity, (v) => Math.round(v).toLocaleString());
  const distDisplay = useTransform(distortion, (v) => v.toFixed(3));

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setScrollPct(Math.round(v * 100));
      const sec = sectors.find((s) => v >= s.range[0] && v < s.range[1]);
      if (sec) setCurrentSector(sec.name);
      if (v < 0.4)       setPhase("blackhole");
      else if (v < 0.72) setPhase("nebula");
      else               setPhase("nova");
    });
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const phaseColor =
    phase === "blackhole" ? "#22c55e" :
    phase === "nebula"    ? "#7c3aed" :
                            "#f59e0b";

  const phaseLabel =
    phase === "blackhole" ? "EVENT HORIZON" :
    phase === "nebula"    ? "NEBULA PHASE"  :
                            "SUPERNOVA";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[100] font-body text-[10px] uppercase tracking-[0.3em] px-6 py-6 md:px-10 md:py-10"
      style={{ color: phaseColor + "99" }}
    >
      {/* ── Top Left: Sector Data (below navbar) ── */}
      <div className="absolute top-24 left-6 md:left-10 space-y-2 max-w-[200px]">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: phaseColor }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span style={{ color: "#ffffff60" }}>Sector: {currentSector}</span>
        </div>

        {/* Scroll progress bar */}
        <div className="flex items-center gap-2">
          <div
            className="w-24 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <motion.div
              style={{
                scaleX: smoothProgress,
                backgroundColor: phaseColor,
                height: "100%",
                width: "100%",
                transformOrigin: "left",
              }}
            />
          </div>
          <span style={{ color: phaseColor + "99" }}>{scrollPct}%</span>
        </div>

        {/* Phase label */}
        <div
          className="text-[9px] font-black tracking-[0.4em]"
          style={{ color: phaseColor + "bb" }}
        >
          ◈ {phaseLabel}
        </div>
      </div>

      {/* ── Top Right: Telemetry (below navbar) ── */}
      <div className="absolute top-24 right-20 md:right-10 text-right space-y-1" style={{ color: phaseColor + "70" }}>
        <div>
          VEL: <motion.span style={{ color: phaseColor + "cc" }}>{velDisplay}</motion.span> km/s
        </div>
        <div>
          DIST: <motion.span style={{ color: phaseColor + "cc" }}>{distDisplay}</motion.span>
        </div>
        <div style={{ color: phaseColor + "40" }}>FREQ: 142.0 MHz</div>
      </div>

      {/* ── Right Side: Section Nav Dots ── */}
      <div className="absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        {sectors.map((sec) => {
          const active = currentSector === sec.name;
          return (
            <div key={sec.name} className="flex items-center gap-2 group">
              <span
                className="text-[8px] tracking-widest whitespace-nowrap hidden lg:block"
                style={{ color: active ? phaseColor : phaseColor + "40", transition: "color 0.3s" }}
              >
                {sec.section}
              </span>
              <motion.div
                className="rounded-full"
                animate={{
                  width:  active ? 20 : 6,
                  height: active ? 4  : 6,
                  backgroundColor: active ? phaseColor : phaseColor + "40",
                }}
                transition={{ duration: 0.4 }}
              />
            </div>
          );
        })}
      </div>

      {/* ── Bottom Center: Voyage Status ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: phaseColor + "60" }}
      >
        <div className="w-px h-8" style={{ background: `linear-gradient(to top, ${phaseColor}60, transparent)` }} />
        <span>VOYAGE IN PROGRESS</span>
      </motion.div>

      {/* ── Crosshair Reticle ── */}
      <div
        className="absolute hidden md:block"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          transition: "left 0.1s ease, top 0.1s ease",
        }}
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            border: `1px solid ${phaseColor}50`,
            boxShadow: `0 0 12px ${phaseColor}30`,
          }}
        />
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: phaseColor + "40", transform: "translateY(-50%)" }} />
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: phaseColor + "40", transform: "translateX(-50%)" }} />
      </div>

      {/* ── Corner HUD Brackets ── */}
      <div className="absolute top-0 left-0 w-16 h-16 border-t border-l m-4" style={{ borderColor: phaseColor + "25", borderRadius: "12px 0 0 0" }} />
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r m-4" style={{ borderColor: phaseColor + "25", borderRadius: "0 12px 0 0" }} />
      <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l m-4" style={{ borderColor: phaseColor + "25", borderRadius: "0 0 0 12px" }} />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r m-4" style={{ borderColor: phaseColor + "25", borderRadius: "0 0 12px 0" }} />

      {/* ── Scanline ── */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none animate-scanline"
        style={{ background: `linear-gradient(to right, transparent, ${phaseColor}20, transparent)` }}
      />
    </div>
  );
}
