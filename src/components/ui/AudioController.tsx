"use client";

import { useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Space Ambient Track
    soundRef.current = new Howl({
      src: ["https://cdn.pixabay.com/download/audio/2022/02/10/audio_55a2979201.mp3?filename=space-ambient-sci-fi-10103.mp3"],
      html5: true,
      loop: true,
      volume: 0.5,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, []);

  const togglePlay = () => {
    if (isMuted) {
      soundRef.current?.mute(false);
      setIsMuted(false);
    } else {
      soundRef.current?.mute(true);
      setIsMuted(true);
    }
  };

  const startAudio = () => {
    if (!isPlaying) {
      soundRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex items-center gap-4">
      {/* Auto-start hint / Play button */}
      {!isPlaying ? (
        <button
          onClick={startAudio}
          className="glass px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2 hover:bg-accent hover:text-background transition-all"
        >
          <Volume2 className="w-4 h-4" />
          Enable Audio Experience
        </button>
      ) : (
        <button
          onClick={togglePlay}
          className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/40 hover:text-accent transition-colors"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      )}
    </div>
  );
}
