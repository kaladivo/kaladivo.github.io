"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Github, Instagram } from "lucide-react";
import { GenerativeBackground } from "@/components/generative-background";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GenerativeBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          {/* Floating Photo */}
          <div className="relative inline-block">
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
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
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          David Novák
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-xl md:text-2xl text-muted-foreground mb-2"
        >
          Tech Lead at{" "}
          <a
            href="https://vexl.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline underline-offset-4"
          >
            Vexl
          </a>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="font-mono text-sm text-muted-foreground mb-8"
        >
          Building things that matter
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex items-center justify-center gap-4"
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
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
