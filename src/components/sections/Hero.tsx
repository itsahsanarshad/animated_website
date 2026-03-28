"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Radio } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity   = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0, y: 80, scale: 0.92,
        duration: 2, ease: "expo.out", delay: 0.4,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    gsap.to(".hero-parallax", { x, y, duration: 1.4, ease: "power2.out" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: yParallax, opacity }}
        className="container relative z-10 px-6 text-center hero-parallax"
      >
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-2xl"
        >
          <Radio className="w-3 h-3 text-accent animate-pulse" />
          <span className="text-[10px] font-black tracking-[0.5em] uppercase text-accent/80">
            System Online · Interstellar Voyage
          </span>
        </motion.div>

        {/* Name */}
        <h1
          ref={titleRef}
          className="text-7xl md:text-[10rem] lg:text-[12rem] font-heading font-black mb-6 text-gradient leading-[0.85] tracking-tighter"
        >
          AHSAN
          <br />
          <span
            className="text-accent"
            style={{
              textShadow: "0 0 60px rgba(34,197,94,0.35), 0 0 120px rgba(34,197,94,0.15)",
            }}
          >
            ARSHAD
          </span>
        </h1>

        {/* Sub‑title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-sm md:text-base text-white/40 max-w-xl mx-auto mb-14 font-body uppercase tracking-[0.4em] leading-relaxed"
        >
          Full Stack Developer
          <span className="text-accent/20 px-3">·</span>
          UI/UX Designer
          <span className="text-accent/20 px-3">·</span>
          Cosmic Architect
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="group relative px-10 py-4 bg-accent text-background font-black text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ boxShadow: "0 0 40px rgba(34,197,94,0.35)" }}
          >
            <span className="relative z-10">Initiate Mission</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </a>
          <a
            href="#contact"
            className="px-10 py-4 border border-white/10 glass font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Establish Contact
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase font-black tracking-[0.7em] text-white/15">
          Descent into the void
        </span>
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-accent/25" />
        </motion.div>
      </motion.div>

      {/* Decorative orbit ring */}
      <div
        className="absolute pointer-events-none opacity-10 animate-horizon-spin"
        style={{
          width: "min(80vw, 600px)",
          height: "min(80vw, 600px)",
          border: "1px solid #22c55e",
          borderRadius: "50%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </section>
  );
}
