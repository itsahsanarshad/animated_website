"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

const stats = [
  { value: "5+", label: "Years of\nExploration" },
  { value: "10+", label: "Projects\nShipped" },
  { value: "MS", label: "Computer\nScience" },
];

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36 relative overflow-hidden">
      {/* Nebula ambient glow */}
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7c3aed0f, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, #22c55e06, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container px-6 relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent/50 mb-4 px-5 py-2 border border-accent/10 rounded-full glass inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
            Mission Profile · v1.0.4
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gradient leading-tight tracking-tighter">
            The{" "}
            <span className="text-accent" style={{ textShadow: "0 0 40px rgba(34,197,94,0.25)" }}>
              Human
            </span>{" "}
            <br className="hidden sm:block" />
            Behind Code
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <GlassCard className="border-l-4 border-accent">
              <div className="p-8 md:p-10">
                <p className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 font-medium">
                  I&apos;m a{" "}
                  <span className="text-white font-black">Full Stack Developer</span> based in{" "}
                  <span
                    className="font-black underline decoration-accent/40 decoration-wavy underline-offset-8"
                    style={{ color: "#ffffff" }}
                  >
                    Karachi, Pakistan
                  </span>
                  , currently pursuing my{" "}
                  <span className="text-accent/90 font-black">MS in Computer Science</span> at Bahria University.
                </p>

                <div className="space-y-4 text-sm text-white/40 leading-relaxed font-medium">
                  <p>
                    I specialize in building modern, scalable web applications using{" "}
                    <span className="text-accent/70">Next.js and React</span>, with hands-on experience in backend
                    API development, cloud platforms, and WordPress.
                  </p>
                  <p>
                    Passionate about clean architecture, performance optimization, and delivering
                    real‑world software solutions that make an impact.
                  </p>
                </div>

                {/* Quick info row */}
                <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/25">
                  <div>
                    <div className="text-accent/50 mb-1">Location</div>
                    <div className="text-white/50">Karachi, Pakistan</div>
                  </div>
                  <div>
                    <div className="text-accent/50 mb-1">Status</div>
                    <div className="text-white/50 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
                      Available
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-5"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <GlassCard>
                  <div className="p-6 flex items-center gap-6">
                    <div
                      className="text-4xl md:text-5xl font-black font-heading tracking-tighter text-accent flex-shrink-0"
                      style={{ textShadow: "0 0 30px rgba(34,197,94,0.35)" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.35em] text-white/30 leading-loose whitespace-pre-line">
                      {stat.label}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Orbit decoration */}
            <div className="relative flex items-center justify-center h-32 mt-2">
              <div
                className="absolute w-28 h-28 rounded-full border border-accent/10 animate-horizon-spin"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute w-20 h-20 rounded-full border border-nebula-purple/10 animate-horizon-spin"
                style={{ animationDirection: "reverse", animationDuration: "15s" }}
              />
              <div className="w-3 h-3 rounded-full bg-accent/40 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
