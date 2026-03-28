"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "Serenity Vault",
    category: "Web Application",
    description:
      "A modern, production-ready web platform built with a focus on performance, scalability, and seamless UX. Features include a component-based frontend, VPS deployment with PM2, email integration via NodeMailer, and a custom local CAPTCHA system.",
    tech: ["Next.js", "NodeMailer", "SMTP", "PM2", "VPS"],
    link: "https://serenityvault.com",
    github: null,
    coordinate: "RA 14h 29m 43s",
    color: "#22c55e",
  },
  {
    title: "SecurProbe",
    category: "Penetration Testing",
    description:
      "A web-based security platform for penetration testing and vulnerability assessments. Built as sole Full Stack Developer — responsible for API development, server handling, and complete React/TypeScript frontend.",
    tech: ["React", "TypeScript", "REST API", "Full Stack"],
    link: null,
    github: null,
    coordinate: "DEC −62° 40′ 46″",
    color: "#7c3aed",
  },
  {
    title: "Alabama Mart",
    category: "E-Commerce",
    description:
      "Full e-commerce website with WooCommerce integration and online payment support for a hassle-free shopping experience.",
    tech: ["WordPress", "WooCommerce"],
    link: null,
    github: null,
    coordinate: "D = 1.34 pc",
    color: "#26d0ce",
  },
  {
    title: "Alabama Tech",
    category: "Company Website",
    description:
      "Official website for Alabama Technologies featuring a blogs page and Noptin newsletter integration. Designed and built with Elementor.",
    tech: ["WordPress", "Elementor", "Noptin"],
    link: null,
    github: null,
    coordinate: "M = 1.1 M☉",
    color: "#f59e0b",
  },
  {
    title: "Client Portfolio",
    category: "Portfolio Website",
    description:
      "A custom-designed portfolio website for a creative client, built with WordPress to highlight their unique skills and projects.",
    tech: ["WordPress"],
    link: null,
    github: null,
    coordinate: "L = 1.519 L☉",
    color: "#ff0080",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #7c3aed07, transparent 70%)", filter: "blur(80px)" }}
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
            Stellar Constellations · Data‑Sync
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gradient leading-tight tracking-tighter">
            Digital{" "}
            <span
              className="text-accent underline decoration-accent/20 decoration-wavy underline-offset-8"
              style={{ textShadow: "0 0 40px rgba(34,197,94,0.2)" }}
            >
              Galaxies
            </span>
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <GlassCard className="h-full flex flex-col cursor-pointer">
                <div className="p-8 flex flex-col h-full">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-8">
                    <div
                      className="w-12 h-12 rounded-2xl glass flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                      style={{ color: project.color, boxShadow: `0 0 16px ${project.color}20` }}
                    >
                      <Folder className="w-5 h-5" />
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black text-white/15 uppercase tracking-[0.3em] mb-0.5">Celestial Loc</p>
                      <p className="text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: project.color + "70" }}>
                        {project.coordinate}
                      </p>
                    </div>
                  </div>

                  {/* Category */}
                  <span
                    className="text-[9px] font-black uppercase tracking-[0.4em] mb-2 block"
                    style={{ color: project.color + "90" }}
                  >
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-5 tracking-tighter leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/35 text-sm leading-relaxed mb-8 flex-grow line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full glass text-[9px] font-black uppercase tracking-widest border border-white/5"
                        style={{ color: project.color + "80" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {(project.link || project.github) && (
                    <div className="flex justify-end gap-4 mt-6">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/20 hover:text-accent transition-colors duration-200 cursor-pointer"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-white/20 hover:text-accent transition-colors duration-200 cursor-pointer"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <a
            href="https://github.com/itsahsanarshad"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 border border-accent/20 glass text-[10px] font-black uppercase tracking-[0.4em] text-accent hover:bg-accent hover:text-background transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ boxShadow: "0 0 24px rgba(34,197,94,0.15)" }}
          >
            <Github className="w-4 h-4" />
            Explore GitHub Terminal
          </a>
        </motion.div>
      </div>
    </section>
  );
}
