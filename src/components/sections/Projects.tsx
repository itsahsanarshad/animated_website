"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { ExternalLink, Github, Folder } from "lucide-react";

const projects = [
  {
    title: "Serenity Vault",
    description: "A modern, production-ready web platform focused on performance and scalability. Features VPS deployment with PM2, email integration, and custom CAPTCHA.",
    tech: ["Next.js", "NodeMailer", "SMTP", "PM2", "VPS"],
    link: "https://serenityvault.com",
    github: "#",
    category: "Web Application",
  },
  {
    title: "SecurProbe",
    description: "A web-based security platform for penetration testing and vulnerability assessments. Solely responsible for API, server, and React/TypeScript frontend.",
    tech: ["React", "TypeScript", "REST API", "Full Stack"],
    link: "#",
    github: "#",
    category: "Penetration Testing",
  },
  {
    title: "Alabama Mart",
    description: "Full e-commerce website with WooCommerce integration and online payment support for a hassle-free shopping experience.",
    tech: ["WordPress", "WooCommerce"],
    link: "#",
    github: "#",
    category: "E-Commerce",
  },
  {
    title: "Alabama Tech",
    description: "Official company website featuring a blog page and newsletter integration for tech services.",
    tech: ["WordPress", "Elementor", "Noptin"],
    link: "#",
    github: "#",
    category: "Company Website",
  },
  {
    title: "Portfolio Website",
    description: "A custom-designed portfolio showcase for a creative client, highlighting their unique skills and projects.",
    tech: ["WordPress"],
    link: "#",
    github: "#",
    category: "Client Portfolio",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="container px-6 mx-auto relative z-10 font-body">
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-accent/60 mb-4">
            Stellar Constellations
          </h2>
          <h3 className="text-5xl md:text-7xl font-heading font-bold text-gradient">
            Digital Galaxies
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="group h-full flex flex-col hover:border-accent/30 transition-all duration-700 bg-white/[0.01]">
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-full glass border-white/5 flex items-center justify-center text-accent/60 group-hover:text-accent transition-colors">
                      <Folder className="w-6 h-6" />
                    </div>
                    <div className="flex gap-4">
                      {project.github !== "#" && (
                        <a href={project.github} className="text-white/20 hover:text-accent transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.link !== "#" && (
                        <a href={project.link} className="text-white/20 hover:text-accent transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/60 mb-2 block">
                    {project.category}
                  </span>
                  <h4 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-accent transition-colors tracking-tight">
                    {project.title}
                  </h4>
                  <p className="text-foreground/40 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 group-hover:text-foreground/60 transition-colors">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5 mt-auto">
                    {project.tech.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 rounded-full glass text-[10px] font-black uppercase tracking-widest text-accent/60 border-accent/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Internal Glow */}
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
           <a 
            href="https://github.com/itsahsanarshad" 
            target="_blank"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/10 glass text-[10px] font-black uppercase tracking-[0.3em] hover:bg-accent/10 hover:border-accent/30 transition-all hover:scale-105"
          >
            Launch Github Terminal <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
