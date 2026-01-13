"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

const glitchTexts = ["404", "4Ø4", "4O4", "40Ψ", "Ψ04", "4ØΨ", "404"];

export default function NotFound() {
  const [glitchIndex, setGlitchIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      let count = 0;
      const glitchInterval = setInterval(() => {
        setGlitchIndex(Math.floor(Math.random() * glitchTexts.length));
        count++;
        if (count > 5) {
          clearInterval(glitchInterval);
          setGlitchIndex(0);
          setIsGlitching(false);
        }
      }, 50);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--accent)) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent/30 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            animate={{
              y: [null, -20, 20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Glitchy 404 */}
          <h1
            className={`font-mono text-[150px] md:text-[200px] font-bold leading-none mb-4 ${
              isGlitching ? "text-accent" : ""
            }`}
            style={{
              textShadow: isGlitching
                ? "2px 2px hsl(var(--accent)), -2px -2px cyan"
                : "none",
            }}
          >
            {glitchTexts[glitchIndex]}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-2xl md:text-3xl font-display mb-2">
            Lost in the void
          </p>
          <p className="text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist—or maybe it
            never did.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-muted rounded-full font-medium hover:bg-muted/80 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </motion.div>

        {/* Easter egg hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-12 text-xs text-muted-foreground/50 font-mono"
        >
          Error code: 0x404 | Universe: stable | Reality: questionable
        </motion.p>
      </div>
    </div>
  );
}
