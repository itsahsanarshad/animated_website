"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "framer-motion";
import { useState } from "react";
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

  // Raw scroll progress → spring-smoothed MotionValue (no state needed)
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const handleNavClick = () => {
    warpRef.current?.trigger();
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Pass MotionValue directly – no useState re-renders, fully reactive */}
      <CosmosBackground progress={smoothProgress} />

      <IntroSequence onComplete={() => setIntroFinished(true)} />
      <WarpEffect ref={warpRef} />

      {introFinished && (
        <>
          <HUDOverlay />
          <SmoothScroll>
            <Navbar onNavClick={handleNavClick} />
            <AudioController />
            <main className="flex flex-col relative">
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
