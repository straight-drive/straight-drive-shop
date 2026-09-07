"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function VideoWithSound({ src, className = "" }) {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <div className={`relative aspect-video rounded-xl border border-cyan/[0.16] overflow-hidden bg-navy-deep ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      <button
        onClick={toggle}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-navy-deep/80 border border-cyan/40 flex items-center justify-center text-cyan hover:text-ink hover:border-cyan transition-colors backdrop-blur-sm"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}