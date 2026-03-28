"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll, motion, useSpring } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CosmosBackground from "@/components/ui/CosmosBackground";
import IntroSequence from "@/components/ui/IntroSequence";
import AudioController from "@/components/ui/AudioController";
import WarpEffect, { WarpEffectHandle } from "@/components/ui/WarpEffect";
import HUDOverlay from "@/components/ui/HUDOverlay";

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const warpRef = useRef<WarpEffectHandle>(null);
  
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    return smoothProgress.onChange((v) => setProgressValue(v));
  }, [smoothProgress]);

  const handleNavClick = () => {
    warpRef.current?.trigger();
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CosmosBackground progress={progressValue} />
      <IntroSequence onComplete={() => setIntroFinished(true)} />
      <WarpEffect ref={warpRef} />
      
      {introFinished && (
        <>
          <HUDOverlay />
          <SmoothScroll>
            <Navbar onNavClick={handleNavClick} />
            <AudioController />
            <main className="flex flex-col relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Journey />
              <Contact />
            </main>
          </SmoothScroll>
        </>
      )}
    </div>
  );
}
