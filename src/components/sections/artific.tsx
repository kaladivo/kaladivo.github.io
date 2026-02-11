import { ExternalLink, Music, Instagram } from "lucide-react";
import { ArtificVideoPlayer } from "./client/artific-video-player";

const YOUTUBE_VIDEO_ID = "fDJlwtHrgn8";
const SPOTIFY_ARTIST_ID = "7tLieLkytLqnUldwoKWHEZ";

export function ArtificSection() {
  return (
    <section id="artific" className="relative py-24 md:py-32 overflow-hidden bg-muted/30">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* Decorative background element */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-mono text-sm text-accent mb-4 block">
            Music Project
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Artific
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            When I&apos;m not writing code, I&apos;m making music
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* YouTube Video */}
          <div className="relative">
            <ArtificVideoPlayer
              videoId={YOUTUBE_VIDEO_ID}
              title="Artific Music Video"
            />

            <a
              href={`https://youtu.be/${YOUTUBE_VIDEO_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Watch on YouTube
            </a>
          </div>

          {/* Spotify Embed + Links */}
          <div className="space-y-6">
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
          </div>
        </div>
      </div>
    </section>
  );
}
