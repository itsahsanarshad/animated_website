"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import {
  Database, Layout, Cloud, Settings, Brain,
} from "lucide-react";

const skillCategories = [
  {
    title: "Backend Development",
    icon: Database,
    color: "#22c55e",
    sector: "Sector 01 · Logic",
    skills: ["C", "C#", "C++", "Python", "REST API", "Flask"],
  },
  {
    title: "Frontend Development",
    icon: Layout,
    color: "#26d0ce",
    sector: "Sector 02 · Interface",
    skills: ["React", "Next.js", "React Native", "WordPress"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    color: "#7c3aed",
    sector: "Sector 03 · Cloud",
    skills: ["AWS", "Azure", "VPS Deployment", "PM2"],
  },
  {
    title: "Tools & Platforms",
    icon: Settings,
    color: "#f59e0b",
    sector: "Sector 04 · Systems",
    skills: ["NodeMailer", "SMTP", "WooCommerce", "ACF Plugin", "Elementor", "Noptin"],
  },
  {
    title: "Soft Skills",
    icon: Brain,
    color: "#ff0080",
    sector: "Sector 05 · Mindset",
    skills: ["Team Player", "Problem Solving", "Critical Thinking", "Fast Learner"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient nebula */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed08, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent/50 mb-4 px-5 py-2 border border-accent/10 rounded-full glass inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block animate-pulse" />
            Technical Arsenal · SHO‑Mapped
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gradient leading-tight tracking-tighter">
            System{" "}
            <span
              className="text-accent underline decoration-accent/20 decoration-wavy underline-offset-8"
              style={{ textShadow: "0 0 40px rgba(34,197,94,0.2)" }}
            >
              Capabilities
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col cursor-pointer">
                <div className="p-7 flex flex-col h-full">
                  {/* Icon + sector */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="w-14 h-14 rounded-2xl glass flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{ color: cat.color, boxShadow: `0 0 20px ${cat.color}20` }}
                    >
                      <cat.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 text-right leading-loose pt-1">
                      {cat.sector}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-lg font-heading font-black mb-6 text-white tracking-tight group-hover:text-accent transition-colors"
                    style={{ lineHeight: 1.2 }}
                  >
                    {cat.title}
                  </h3>

                  {/* Skills list */}
                  <ul className="space-y-3 mt-auto">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-3 text-white/40 text-[10px] font-black uppercase tracking-[0.25em]"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                          style={{ backgroundColor: cat.color }}
                        />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
