import Image from "next/image";
import { Mail, Github, Instagram } from "lucide-react";
import { GenerativeBackground } from "@/components/generative-background";
import { Typewriter } from "@/components/typewriter";

const roles = [
  "Tech Lead at Vexl",
  "Developer",
  "Frontman at Artific",
  "Thinker",
  "Musician",
  "Problem Solver",
  "Human",
  "Thinkerer",
  "Singer",
];

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GenerativeBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <div
          className="mb-8 hero-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Floating Photo */}
          <div className="relative inline-block">
            <div className="relative hero-float">
              {/* Glow effect behind photo */}
              <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl scale-110" />
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src="/imgs/davenov_icon.jpeg"
                  alt="David Novák"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <h1
          className="hero-fade-up font-display text-5xl md:text-7xl font-bold tracking-tight mb-4"
          style={{ animationDelay: "0.5s" }}
        >
          David Novák
        </h1>

        <p
          className="hero-fade-up text-xl md:text-2xl text-muted-foreground mb-2 h-8"
          style={{ animationDelay: "0.7s" }}
        >
          <Typewriter
            phrases={roles}
            typingSpeed={80}
            deletingSpeed={40}
            pauseDuration={2500}
          />
        </p>

        <p
          className="hero-fade-up font-mono text-sm text-muted-foreground mb-8"
          style={{ animationDelay: "0.9s" }}
        >
          Building things that matter
        </p>

        {/* Social Links */}
        <div
          className="hero-fade-up flex items-center justify-center gap-4"
          style={{ animationDelay: "1.1s" }}
        >
          <a
            href="mailto:mail@davenov.com"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            aria-label="Send email"
          >
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">mail@davenov.com</span>
          </a>
          <a
            href="https://github.com/kaladivo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="GitHub profile"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/kaladivo/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Instagram profile"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="hero-fade-up" style={{ animationDelay: "1.5s" }}>
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2 hero-scroll-bob">
              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: hero-fade-up 0.8s ease-out forwards;
        }

        .hero-float {
          animation: hero-float 6s ease-in-out infinite;
        }

        .hero-scroll-bob {
          animation: hero-scroll-bob 1.5s ease-in-out infinite;
        }

        @keyframes hero-fade-up {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes hero-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes hero-scroll-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }
      `}</style>
    </section>
  );
}
