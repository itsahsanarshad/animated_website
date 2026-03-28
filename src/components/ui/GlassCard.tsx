"use client";

import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function GlassCard({
  children,
  className,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("glass-card group relative overflow-hidden hud-border bg-white/[0.01]", className)}
    >
      {/* Dynamic Cosmic Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-nebula-purple/5 via-transparent to-nebula-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      <div className="absolute -inset-[100%] bg-linear-to-tr from-accent/0 via-accent/5 to-accent/0 group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-[2000ms] ease-in-out pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
