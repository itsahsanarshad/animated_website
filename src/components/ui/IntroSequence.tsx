"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 4000); // 4 seconds intro

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden"
        >
          {/* Warp Lines Effect */}
          <div className="absolute inset-0 z-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 4],
                  x: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 2000],
                  y: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 2000],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
                className="absolute left-1/2 top-1/2 w-1 h-32 bg-accent/40 rounded-full"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, scale: 1, letterSpacing: "0.5em" }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white uppercase mb-4 tracking-[1em]">
               WELCOME TO MY <span className="text-accent underline underline-offset-8">UNIVERSE</span>
            </h1>
            <p className="text-white/40 font-body uppercase tracking-[0.3em] text-sm">
              Muhammad Ahsan Arshad Manzoor
            </p>
          </motion.div>

          {/* Flash Effect toward the end */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1, 0] }}
            transition={{ duration: 4, times: [0, 0.7, 0.9, 1] }}
            className="absolute inset-0 bg-white z-20 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
