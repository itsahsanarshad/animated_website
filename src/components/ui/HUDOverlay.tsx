"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const sectors = [
  { name: "NEBULA CORRIDOR", range: [0, 0.2] },
  { name: "LEGACY ARCHIVE", range: [0.2, 0.4] },
  { name: "SYNAPTIC BRIDGE", range: [0.4, 0.6] },
  { name: "RECONNAISSANCE", range: [0.6, 0.8] },
  { name: "THE SINGULARITY", range: [0.8, 1.0] },
];

export default function HUDOverlay() {
  const { scrollYProgress } = useScroll();
  const [currentSector, setCurrentSector] = useState(sectors[0].name);

  // Stats
  const velocity = useTransform(scrollYProgress, [0, 1], [0, 299792]);
  const distortion = useTransform(scrollYProgress, [0, 1], [0.001, 1.0]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const sector = sectors.find(s => latest >= s.range[0] && latest < s.range[1]);
      if (sector) setCurrentSector(sector.name);
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] font-body text-[10px] uppercase tracking-[0.3em] text-accent/40 px-10 py-10">
      {/* Top Left: Sector Data */}
      <div className="absolute top-10 left-10 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-white/40">Sector: {currentSector}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-40 h-1 glass rounded-full overflow-hidden">
             <motion.div 
               style={{ scaleX: scrollYProgress }} 
               className="h-full bg-accent w-full origin-left"
             />
          </div>
          <span>Progress: {(scrollYProgress.get() * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Top Right: System Stats */}
      <div className="absolute top-10 right-10 text-right space-y-1">
        <div>Velocity: <motion.span>{velocity}</motion.span> km/s</div>
        <div>Distortion: <motion.span>{distortion}</motion.span> m/s²</div>
        <div className="text-accent/20">Frequency: 142.0 MHz</div>
      </div>

      {/* Bottom Center: Guidance */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-t from-accent/40 to-transparent" />
        <span className="text-accent/60">VOYAGE IN PROGRESS</span>
      </motion.div>

      {/* HUD Corners */}
      <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-accent/20 rounded-tl-3xl m-6" />
      <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-accent/20 rounded-tr-3xl m-6" />
      <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-accent/20 rounded-bl-3xl m-6" />
      <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-accent/20 rounded-br-3xl m-6" />
    </div>
  );
}
