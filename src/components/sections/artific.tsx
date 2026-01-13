"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink, Music, Instagram } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";
import Image from "next/image";

const YOUTUBE_VIDEO_ID = "fDJlwtHrgn8";
const SPOTIFY_ARTIST_ID = "7tLieLkytLqnUldwoKWHEZ";

export function ArtificSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [videoPlaying, setVideoPlaying] = useState(false);

  return (
    <section
      id="artific"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-muted/30"
    >
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Decorative background element */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-accent mb-4 block">
            Music Project
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Artific
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            When I&apos;m not writing code, I&apos;m making music
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* YouTube Video */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-card border border-border">
              {!videoPlaying ? (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 group cursor-pointer"
                  aria-label="Play video"
                >
                  {/* Thumbnail */}
                  <Image
                    src={`https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`}
                    alt="Artific music video thumbnail"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-accent-foreground ml-1" />
                    </div>
                  </div>
                </button>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                  title="Artific Music Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </div>

            <a
              href={`https://youtu.be/${YOUTUBE_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </motion.div>

          {/* Spotify Embed + Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Spotify Embed */}
            <div className="rounded-2xl overflow-hidden border border-border">
              <iframe
                src={`https://open.spotify.com/embed/artist/${SPOTIFY_ARTIST_ID}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Artific on Spotify"
                className="border-0"
              />
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4">
              <a
                href={`https://open.spotify.com/artist/${SPOTIFY_ARTIST_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1DB954] text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Music className="w-4 h-4" />
                Spotify
              </a>
              <a
                href="https://www.instagram.com/artificmusic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
