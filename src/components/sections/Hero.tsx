"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import LiquidSphere from "@/components/ui/LiquidSphere";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth - 0.5) * 20;
    const y = (clientY / window.innerHeight - 0.5) * 20;
    
    gsap.to(".parallax-content", {
      x,
      y,
      duration: 1,
      ease: "power2.out",
    });
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-radial-gradient from-accent/10 to-transparent opacity-50" />
      <LiquidSphere />
      
      <div className="container relative z-10 px-6 text-center parallax-content">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase border border-accent/20 rounded-full bg-accent/5 text-accent backdrop-blur-md">
            Voyaging through code
          </span>
        </motion.div>

        <h1
          ref={titleRef}
          className="text-7xl md:text-9xl font-heading font-bold mb-6 text-gradient tracking-tighter"
        >
          Ahsan <span className="text-accent underline decoration-accent/20">Arshad</span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-foreground/40 max-w-2xl mx-auto mb-10 font-body uppercase tracking-[0.2em] leading-relaxed"
        >
          Full Stack Developer <span className="text-white/20 px-2">|</span> UI/UX Designer <span className="text-white/20 px-2">|</span> Cosmic Architect
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="px-10 py-4 rounded-full bg-accent text-background font-black text-xs uppercase tracking-widest hover:bg-accent/80 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
          >
            Explore My Work
          </a>
          <a
            href="#contact"
            className="px-10 py-4 rounded-full glass font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            Initiate Contact
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-foreground/20"
      >
        <span className="text-[10px] uppercase font-black tracking-[0.5em]">Descent into the void</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-accent/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
