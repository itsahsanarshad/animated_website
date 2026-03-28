"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import { Mail, Phone, Linkedin, Github, Send, MapPin } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    { icon: Mail, label: "Email Terminal", value: "mahammadahsan@gmail.com", href: "mailto:mahammadahsan@gmail.com" },
    { icon: Phone, label: "Voice Frequency", value: "+92-317-7766007", href: "tel:+923177766007" },
    { icon: Linkedin, label: "LinkedIn Orbit", value: "linkedin.com/in/itsahsanarshad", href: "https://linkedin.com/in/itsahsanarshad" },
    { icon: Github, label: "GitHub Terminal", value: "github.com/itsahsanarshad", href: "https://github.com/itsahsanarshad" },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10 font-body">
        <div className="flex flex-col items-center mb-24 text-center">
          <h2 className="text-sm font-black uppercase tracking-[0.5em] text-accent/60 mb-4">
            Signal Transmission
          </h2>
          <h3 className="text-5xl md:text-7xl font-heading font-bold text-gradient">
            Initiate Contact
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <GlassCard className="p-8 hover:border-accent/30 transition-all duration-500 bg-white/[0.02]">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{info.label}</p>
                      <a href={info.href} className="text-xl font-heading font-bold text-white hover:text-accent transition-colors">
                        {info.value}
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-10 border-accent/10 h-full">
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Identity</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/30 focus:bg-accent/5 transition-all placeholder:text-white/5"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Frequency</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/30 focus:bg-accent/5 transition-all placeholder:text-white/5"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-2">Transmission Data</label>
                  <textarea
                    placeholder="I'd like to talk about..."
                    rows={5}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-accent/30 focus:bg-accent/5 transition-all resize-none placeholder:text-white/5"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-accent text-background font-black uppercase tracking-[0.4em] text-xs hover:bg-accent/80 transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center justify-center gap-3"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </GlassCard>
          </motion.div>
        </div>

        <footer className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
            © 2026 AHSAN ARSHAD. EARTH SECTOR: KARACHI.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/itsahsanarshad" className="text-white/20 hover:text-accent transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/itsahsanarshad" className="text-white/20 hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
