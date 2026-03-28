"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { 
  Database, 
  Layout, 
  Cloud, 
  Settings, 
  Terminal,
  Server
} from "lucide-react";

const skillCategories = [
  {
    title: "Engine Core",
    icon: Database,
    skills: ["C", "C#", "C++", "Python", "REST API", "Flask"],
    color: "accent"
  },
  {
    title: "Visual Horizon",
    icon: Layout,
    skills: ["React", "Next.js", "React Native", "WordPress"],
    color: "blue-400"
  },
  {
    title: "Cloud Nebula",
    icon: Cloud,
    skills: ["AWS", "Azure", "VPS Deployment"],
    color: "purple-400"
  },
  {
    title: "Command Tools",
    icon: Settings,
    skills: ["PM2", "NodeMailer", "SMTP", "ACF", "Elementor"],
    color: "orange-400"
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="container px-6 mx-auto relative z-10 font-body">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-accent/60 mb-4">
            Technical Arsenal
          </h2>
          <h3 className="text-5xl md:text-7xl font-heading font-bold text-gradient">
            Powering the Void
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlassCard className="h-full group hover:bg-accent/5 hover:border-accent/30 transition-all duration-500 overflow-hidden">
                <div className="relative p-8">
                  <div className={`w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  
                  <h4 className="text-xl font-heading font-bold mb-4 text-white group-hover:text-accent transition-colors tracking-tight">
                    {category.title}
                  </h4>
                  
                  <ul className="space-y-3">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-3 text-white/40 text-xs font-black uppercase tracking-[0.2em]">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/20" />
                        {skill}
                      </li>
                    ))}
                  </ul>

                  {/* Decorative orbital line */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
