"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface WarpEffectHandle {
  trigger: () => void;
}

const WarpEffect = forwardRef<WarpEffectHandle>((_, ref) => {
  const [active, setActive] = useState(false);

  useImperativeHandle(ref, () => ({
    trigger: () => {
      setActive(true);
      setTimeout(() => setActive(false), 800);
    },
  }));

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] pointer-events-none overflow-hidden"
        >
          {/* Warp Lines */}
          <div className="absolute inset-0 z-0">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  scale: 0,
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  scale: [0, 8],
                  x: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 3000],
                  y: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 3000],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeIn",
                }}
                className="absolute left-1/2 top-1/2 w-0.5 h-64 bg-accent/60 rounded-full"
                style={{
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.5, 1] }}
            className="absolute inset-0 bg-white"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

WarpEffect.displayName = "WarpEffect";
export default WarpEffect;
