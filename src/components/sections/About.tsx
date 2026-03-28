"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

export default function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Decorative Nebula element */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container px-6 relative z-10 mx-auto font-body">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-sm font-black uppercase tracking-[0.5em] text-accent/60 mb-4">
              Mission Profile
            </h2>
            <h3 className="text-5xl md:text-7xl font-heading font-bold text-gradient">
              Human Behind Code
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <GlassCard className="p-10 border-l-2 border-accent/20 bg-white/[0.02]">
                <p className="text-xl text-foreground/70 leading-relaxed mb-8">
                  I'm a Full Stack Developer based in <span className="text-white font-bold">Karachi, Pakistan</span>, currently charting the unknown at <span className="text-accent underline underline-offset-8">Bahria University</span>.
                </p>
                <p className="text-lg text-foreground/50 leading-relaxed font-light italic">
                  I specialize in building high-performance architectures using Next.js and React. My passion lies in bridging the gap between complex backend logic and immersive frontend storytelling.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-full animate-pulse" />
              <div className="relative w-72 h-72 glass rounded-[40px] flex items-center justify-center transform rotate-6 hover:rotate-0 transition-all duration-700 border-accent/10">
                <div className="text-center space-y-4 px-8">
                  <div className="text-4xl font-black text-accent">5+</div>
                  <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/40 leading-tight">
                    Years of exploration in the digital void
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-center gap-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-accent/20" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
