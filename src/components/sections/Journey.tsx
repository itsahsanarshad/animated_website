"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";

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
    sector: "Orbit Area 01",
    color: "#22c55e",
  },
  {
    type: "education",
    title: "MS – Computer Science",
    company: "Bahria University",
    location: "Karachi, Pakistan",
    duration: "2025 – 2027 (Expected)",
    description: [
      "Advanced studies in Computer Science, focusing on research and specialized software development",
    ],
    icon: GraduationCap,
    sector: "Orbit Area 02",
    color: "#7c3aed",
  },
  {
    type: "work",
    title: "WordPress Developer Intern",
    company: "DigiAppX",
    location: "Karachi, Pakistan",
    duration: "May 2023 – July 2023",
    description: [
      "Built a real estate website using WordPress",
      "Integrated ACF (Advanced Custom Fields) plugins and refactored legacy code",
      "Added pagination and implemented logic to fetch and display property data from XML",
    ],
    icon: Briefcase,
    sector: "Orbit Area 03",
    color: "#26d0ce",
  },
  {
    type: "education",
    title: "BS – Computer Science",
    company: "Bahria University",
    location: "Karachi, Pakistan",
    duration: "2020 – 2024",
    description: [
      "Foundational degree in Computer Science with a focus on core programming and engineering principles",
    ],
    icon: GraduationCap,
    sector: "Orbit Area 04",
    color: "#f59e0b",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="py-28 md:py-36 relative overflow-hidden">
      {/* Ambient */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b06, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="container px-6 mx-auto max-w-5xl relative z-10">
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
            Mission Timeline · Stardate‑Sync
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gradient leading-tight tracking-tighter">
            Galactic{" "}
            <span
              className="text-accent underline decoration-accent/20 decoration-wavy underline-offset-8"
              style={{ textShadow: "0 0 40px rgba(34,197,94,0.2)" }}
            >
              Path
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line – hidden on mobile to avoid layout shift */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(34,197,94,0.2), rgba(124,58,237,0.2), rgba(245,158,11,0.2), transparent)" }}
          />

          <div className="space-y-24">
            {journey.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* ── Desktop layout ── */}
                  {/* Left side */}
                  <div className={`hidden md:flex w-[calc(50%-2rem)] ${isLeft ? "justify-end pr-8" : "justify-start pl-8 order-last"}`}>
                    {isLeft && (
                      <div className="w-full max-w-md">
                        <JourneyCard item={item} />
                      </div>
                    )}
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color, boxShadow: `0 0 20px ${item.color}60` }}
                    >
                      <div
                        className="absolute inset-0 rounded-full border animate-ping"
                        style={{ borderColor: item.color + "50" }}
                      />
                    </div>
                    <div className="text-[8px] font-black uppercase tracking-[0.3em] whitespace-nowrap" style={{ color: "#ffffff20" }}>
                      {item.sector}
                    </div>
                  </div>

                  {/* Right side */}
                  <div className={`hidden md:flex w-[calc(50%-2rem)] ${!isLeft ? "justify-end pr-8 order-first" : "justify-start pl-8"}`}>
                    {!isLeft && (
                      <div className="w-full max-w-md">
                        <JourneyCard item={item} />
                      </div>
                    )}
                  </div>

                  {/* ── Mobile layout ── */}
                  <div className="md:hidden w-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}60` }}
                      />
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#ffffff25" }}>
                        {item.sector}
                      </span>
                    </div>
                    <JourneyCard item={item} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({ item }: { item: typeof journey[0] }) {
  return (
    <GlassCard className="hover:border-opacity-40 transition-all duration-500">
      <div className="p-8">
        <div className="flex items-center gap-5 mb-6">
          <div
            className="w-14 h-14 glass rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ color: item.color, boxShadow: `0 0 16px ${item.color}20` }}
          >
            <item.icon className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <span
              className="text-[9px] font-black uppercase tracking-[0.4em] block mb-1"
              style={{ color: item.color + "80" }}
            >
              {item.duration}
            </span>
            <h3 className="text-xl font-heading font-black text-white tracking-tight leading-tight">
              {item.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5 text-white/30 text-[10px] font-black uppercase tracking-[0.25em]">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: item.color + "60" }} />
          <span className="truncate">{item.company} · {item.location}</span>
        </div>

        <ul className="space-y-2.5">
          {item.description.map((desc, i) => (
            <li key={i} className="flex gap-3 text-xs text-white/35 leading-relaxed">
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: item.color + "50" }}
              />
              {desc}
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  );
}
