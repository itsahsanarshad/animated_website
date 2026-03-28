"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINES = [
  "INITIALIZING SPACETIME MESH…",
  "CALIBRATING EVENT HORIZON…",
  "LOADING AHSAN ARSHAD UNIVERSE v2.0",
  "GRAVITATIONAL LOCK ACHIEVED",
  "LAUNCHING SEQUENCE…",
];

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lineIdx,   setLineIdx]   = useState(0);

  useEffect(() => {
    // Advance loading lines
    const lineTimer = setInterval(() => {
      setLineIdx((prev) => (prev < LINES.length - 1 ? prev + 1 : prev));
    }, 700);

    // Dismiss intro
    const dismiss = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4200);

    return () => {
      clearInterval(lineTimer);
      clearTimeout(dismiss);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#000005] flex items-center justify-center overflow-hidden"
        >
          {/* Radial warp lines shooting out */}
          <div className="absolute inset-0">
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: [0, 1, 0], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.08 + 0.5,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
                className="absolute left-1/2 top-1/2 w-px origin-top"
                style={{
                  height: "50vmax",
                  background:
                    i % 3 === 0
                      ? "linear-gradient(to bottom, #22c55e40, transparent)"
                      : i % 3 === 1
                      ? "linear-gradient(to bottom, #7c3aed30, transparent)"
                      : "linear-gradient(to bottom, #f59e0b20, transparent)",
                  transform: `rotate(${(360 / 24) * i}deg) translateX(-50%)`,
                }}
              />
            ))}
          </div>

          {/* Pulsing center orb */}
          <motion.div
            className="absolute w-40 h-40 rounded-full"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              background:
                "radial-gradient(circle, #22c55e30 0%, #7c3aed10 50%, transparent 70%)",
              boxShadow: "0 0 80px #22c55e20, 0 0 200px #7c3aed10",
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 text-center px-8"
          >
            <motion.h1
              initial={{ letterSpacing: "0.1em", opacity: 0 }}
              animate={{ letterSpacing: "0.6em", opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
              className="text-3xl md:text-5xl font-heading font-black text-white uppercase mb-3"
            >
              Welcome to My{" "}
              <span
                className="underline underline-offset-8"
                style={{ color: "#22c55e", textDecorationColor: "#22c55e40" }}
              >
                Universe
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-white font-body uppercase tracking-[0.4em] text-xs mb-10"
            >
              Muhammad Ahsan Arshad Manzoor
            </motion.p>

            {/* Loading lines */}
            <div className="space-y-2 text-left inline-block">
              {LINES.slice(0, lineIdx + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-[10px] font-body font-black uppercase tracking-[0.3em]"
                  style={{ color: i === lineIdx ? "#22c55e" : "#ffffff30" }}
                >
                  <span style={{ color: i === lineIdx ? "#22c55e" : "#ffffff20" }}>
                    {i === lineIdx ? "▶" : "✓"}
                  </span>
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* White flash at the end */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1, 0] }}
            transition={{ duration: 4.2, times: [0, 0.75, 0.82, 0.92, 1] }}
            className="absolute inset-0 bg-white pointer-events-none z-20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
