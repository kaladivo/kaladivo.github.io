"use client";

import { motion } from "framer-motion";
import { Mail, Github, Instagram, Heart } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export function ContactSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 bg-muted/30"
    >
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Want to chat about a project, collaboration, or just say hi?
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a
              href="mailto:mail@davenov.com"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-accent-foreground font-medium text-lg hover:opacity-90 transition-opacity"
            >
              <Mail className="w-5 h-5" />
              mail@davenov.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <a
              href="https://github.com/kaladivo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-card border border-border hover:border-accent/50 hover:text-accent transition-all"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/kaladivo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-card border border-border hover:border-accent/50 hover:text-accent transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
            Made with <Heart className="w-4 h-4 text-accent" /> by David Novák
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            © {new Date().getFullYear()}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}
