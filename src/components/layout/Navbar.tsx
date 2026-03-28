"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ onNavClick }: { onNavClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavClick) {
      onNavClick();
    }
    // Mobile menu close handled separately
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "py-4" : "py-10"
      }`}
    >
      <div className="container px-6 mx-auto">
        <div
          className={`glass rounded-2xl flex items-center justify-between px-8 py-4 transition-all duration-700 border-white/5 ${
            isScrolled ? "bg-black/60 shadow-2xl shadow-black/40 backdrop-blur-2xl" : "bg-transparent border-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center font-black text-background group-hover:rotate-[360deg] transition-transform duration-1000 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
              AA
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-black text-white tracking-widest hidden sm:block uppercase">
                Ahsan <span className="text-accent/60">Arshad</span>
              </span>
              <span className="text-[10px] font-bold text-accent/40 tracking-[0.4em] uppercase hidden sm:block">
                Cosmic Terminal
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/40 hover:text-accent transition-all hover:scale-110 active:scale-90"
              >
                {link.name}
              </a>
            ))}
            <div className="w-px h-10 bg-white/5 mx-2" />
            <div className="flex items-center gap-5">
              <a href="https://github.com/itsahsanarshad" target="_blank" className="text-foreground/20 hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/itsahsanarshad" target="_blank" className="text-foreground/20 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden w-12 h-12 glass rounded-xl flex items-center justify-center text-foreground/40 hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-full left-0 right-0 p-6 md:hidden z-40"
          >
            <div className="glass rounded-[32px] p-8 flex flex-col gap-8 shadow-2xl border-white/10 bg-black/80 backdrop-blur-3xl">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    if (onNavClick) onNavClick();
                    setMobileMenuOpen(false);
                  }}
                  className="text-2xl font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-accent transition-all border-b border-white/5 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center justify-center gap-10 pt-4">
                <a href="https://github.com/itsahsanarshad" target="_blank" className="text-foreground/20 hover:text-accent transition-colors">
                  <Github className="w-8 h-8" />
                </a>
                <a href="https://linkedin.com/in/itsahsanarshad" target="_blank" className="text-foreground/20 hover:text-accent transition-colors">
                  <Linkedin className="w-8 h-8" />
                </a>
                <a href="mailto:mahammadahsan@gmail.com" className="text-foreground/20 hover:text-accent transition-colors">
                  <Mail className="w-8 h-8" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
