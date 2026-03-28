"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Mail, Phone, Linkedin, Github, Send, MapPin } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email Channel",
    value: "mahammadahsan@gmail.com",
    href: "mailto:mahammadahsan@gmail.com",
    color: "#22c55e",
  },
  {
    icon: Phone,
    label: "Voice Comm",
    value: "+92-317-7766007",
    href: "tel:+923177766007",
    color: "#26d0ce",
  },
  {
    icon: Linkedin,
    label: "LinkedIn Signal",
    value: "linkedin.com/in/itsahsanarshad",
    href: "https://linkedin.com/in/itsahsanarshad",
    color: "#7c3aed",
  },
  {
    icon: Github,
    label: "GitHub Terminal",
    value: "github.com/itsahsanarshad",
    href: "https://github.com/itsahsanarshad",
    color: "#f59e0b",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 relative overflow-hidden">
      {/* Supernova ambient – nova phase decor */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #f59e0b05, transparent 70%)", filter: "blur(120px)" }}
      />
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff008006, transparent 70%)", filter: "blur(100px)" }}
      />

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
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
            Signal Transmission · CH‑42
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-gradient leading-tight tracking-tighter">
            Establish{" "}
            <span
              className="text-accent underline decoration-accent/20 decoration-wavy underline-offset-8"
              style={{ textShadow: "0 0 40px rgba(34,197,94,0.2)" }}
            >
              Connection
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact info cards */}
          <div className="space-y-5">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={info.href.startsWith("http") ? "noreferrer" : undefined}
                  className="block cursor-pointer"
                >
                  <GlassCard className="hover:translate-x-1 transition-transform duration-500">
                    <div className="p-6 flex items-center gap-5">
                      <div
                        className="w-14 h-14 rounded-2xl glass flex items-center justify-center flex-shrink-0"
                        style={{ color: info.color, boxShadow: `0 0 16px ${info.color}20` }}
                      >
                        <info.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 mb-1.5">
                          {info.label}
                        </p>
                        <p className="text-base font-heading font-black text-white hover:text-accent transition-colors truncate">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard>
              <form className="p-8 md:p-10 space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25 block">
                      Identity‑ID
                    </label>
                    <input
                      type="text"
                      placeholder="JOHN_DOE"
                      className="w-full bg-white/[0.03] border border-white/5 px-5 py-3.5 text-white focus:outline-none focus:border-accent/40 transition-colors duration-200 placeholder:text-white/10 font-black uppercase text-xs"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25 block">
                      Frequency‑Addr
                    </label>
                    <input
                      type="email"
                      placeholder="USER@DOMAIN.COM"
                      className="w-full bg-white/[0.03] border border-white/5 px-5 py-3.5 text-white focus:outline-none focus:border-accent/40 transition-colors duration-200 placeholder:text-white/10 font-black uppercase text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25 block">
                    Packet Data
                  </label>
                  <textarea
                    placeholder="INITIATING ENCRYPTED MESSAGE…"
                    rows={6}
                    className="w-full bg-white/[0.03] border border-white/5 px-5 py-3.5 text-white focus:outline-none focus:border-accent/40 transition-colors duration-200 resize-none placeholder:text-white/10 font-black uppercase text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-accent text-background font-black uppercase tracking-[0.4em] text-[10px] hover:bg-accent/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
                  style={{ boxShadow: "0 0 30px rgba(34,197,94,0.25)" }}
                >
                  Broadcast Signal
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-32 pt-10 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-8 pb-10"
        >
          <div className="flex flex-col items-center md:items-start gap-1.5 text-center md:text-left">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">
              © 2026 Ahsan Arshad · Earth Sector: Karachi
            </p>
            <div className="flex items-center gap-2 text-[9px] font-black text-white/10 uppercase tracking-[0.4em]">
              <MapPin className="w-3 h-3" />
              24.8607° N · 67.0011° E
            </div>
          </div>

          <div className="flex items-center gap-8">
            <a
              href="https://github.com/itsahsanarshad"
              target="_blank"
              rel="noreferrer"
              className="text-white/20 hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/itsahsanarshad"
              target="_blank"
              rel="noreferrer"
              className="text-white/20 hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:mahammadahsan@gmail.com"
              className="text-white/20 hover:text-accent transition-colors duration-200 cursor-pointer"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
