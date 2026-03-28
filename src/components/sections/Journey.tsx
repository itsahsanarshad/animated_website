"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";

const journey = [
  {
    type: "work",
    title: "Junior Software Developer",
    company: "DigiAppX",
    location: "Karachi, Pakistan",
    duration: "July 2025 – Present",
    description: [
      "Working on the frontend of a Next.js application",
      "Developed features as a React Native Developer",
      "Collaborated with designers on frontend UI implementation",
    ],
    icon: Briefcase,
  },
  {
    type: "education",
    title: "MS – Computer Science",
    company: "Bahria University",
    location: "Karachi, Pakistan",
    duration: "2025 – 2027 (Expected)",
    description: ["Advanced studies in Computer Science, focusing on research and specialized software development."],
    icon: GraduationCap,
  },
  {
    type: "work",
    title: "WordPress Developer Intern",
    company: "DigiAppX",
    location: "Karachi, Pakistan",
    duration: "May 2023 – July 2023",
    description: [
      "Built a real estate website using WordPress",
      "Integrated ACF plugins and refactored legacy code",
      "Implemented logic to fetch and display property data from XML",
    ],
    icon: Briefcase,
  },
  {
    type: "education",
    title: "BS – Computer Science",
    company: "Bahria University",
    location: "Karachi, Pakistan",
    duration: "2020 – 2024",
    description: ["Foundational degree in Computer Science with a focus on core programming and engineering principles."],
    icon: GraduationCap,
  },
];

export default function Journey() {
  return (
    <section id="journey" className="py-32 relative overflow-hidden">
      <div className="container px-6 mx-auto relative z-10 font-body">
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-accent/60 mb-4">
            Mission Timeline
          </h2>
          <h3 className="text-5xl md:text-7xl font-heading font-bold text-gradient">
            Galactic Path
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Path Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent/0 via-accent/20 to-accent/0 -translate-x-1/2 hidden md:block" />

          <div className="space-y-20">
            {journey.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex flex-col ${
                  idx % 1 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-10 md:gap-0`}
                style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}
              >
                {/* Orbital Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20 hidden md:block">
                  <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" />
                </div>

                <div className="w-full md:w-[45%]">
                  <GlassCard className={`p-8 border-accent/10 hover:border-accent/30 transition-all duration-500`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 glass rounded-xl text-accent">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">
                          {item.duration}
                        </span>
                        <h4 className="text-xl font-heading font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-foreground/40 text-xs font-bold uppercase tracking-widest">
                      <MapPin className="w-3 h-3" />
                      {item.company} • {item.location}
                    </div>

                    <ul className="space-y-2 mb-4">
                      {item.description.map((desc, i) => (
                        <li key={i} className="text-xs text-foreground/40 flex gap-2">
                           <span className="w-1 h-1 bg-accent/20 rounded-full mt-1.5 shrink-0" />
                           {desc}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
