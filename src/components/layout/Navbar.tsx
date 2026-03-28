"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { name: "About",    href: "#about"    },
  { name: "Skills",   href: "#skills"   },
  { name: "Projects", href: "#projects" },
  { name: "Journey",  href: "#journey"  },
  { name: "Contact",  href: "#contact"  },
];

export default function Navbar({ onNavClick }: { onNavClick?: () => void }) {
  const [isScrolled,      setIsScrolled]      = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLinkClick = () => {
    onNavClick?.();
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "pt-4 pb-4" : "pt-8"
      }`}
    >
      <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
        <div
          className={`glass rounded-2xl flex items-center justify-between px-5 sm:px-8 py-3.5 transition-all duration-500 ${
            isScrolled
              ? "bg-black/60 shadow-2xl shadow-black/50 backdrop-blur-3xl border-white/5"
              : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group cursor-pointer flex-shrink-0" onClick={handleLinkClick}>
            <div
              className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-black text-background text-sm group-hover:rotate-[360deg] transition-transform duration-700 cursor-pointer"
              style={{ boxShadow: "0 0 16px rgba(34,197,94,0.4)" }}
            >
              AA
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-base font-heading font-black text-white tracking-[0.1em] uppercase">
                Ahsan <span className="text-accent/60">Arshad</span>
              </span>
              <span className="text-[9px] font-bold text-accent/35 tracking-[0.4em] uppercase mt-0.5">
                Cosmic Terminal
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/35 hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <div className="w-px h-8 bg-white/5 mx-2" />
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/itsahsanarshad"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/20 hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/itsahsanarshad"
                target="_blank"
                rel="noreferrer"
                className="text-foreground/20 hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-10 h-10 glass rounded-xl flex items-center justify-center text-foreground/40 hover:text-accent transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mx-4 mt-2 md:hidden z-40"
          >
            <div className="glass rounded-2xl p-6 flex flex-col gap-5 border-white/8 bg-black/80 backdrop-blur-3xl shadow-2xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="text-xl font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-accent transition-colors duration-200 border-b border-white/5 pb-4 last:border-0 last:pb-0 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-center gap-8 pt-2">
                <a href="https://github.com/itsahsanarshad" target="_blank" rel="noreferrer" className="text-foreground/20 hover:text-accent transition-colors cursor-pointer">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/itsahsanarshad" target="_blank" rel="noreferrer" className="text-foreground/20 hover:text-accent transition-colors cursor-pointer">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="mailto:mahammadahsan@gmail.com" className="text-foreground/20 hover:text-accent transition-colors cursor-pointer">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
