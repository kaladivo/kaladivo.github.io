"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface ArtificVideoPlayerProps {
  videoId: string;
  title: string;
}

export function ArtificVideoPlayer({ videoId, title }: ArtificVideoPlayerProps) {
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border">
      {!videoPlaying ? (
        <button
          type="button"
          onClick={() => setVideoPlaying(true)}
          className="absolute inset-0 group cursor-pointer"
          aria-label="Play video"
        >
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Artific music video thumbnail"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-accent-foreground ml-1" />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}
