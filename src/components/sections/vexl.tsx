"use client";

import { motion } from "framer-motion";
import { ExternalLink, Shield, Users, Bitcoin } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

export function VexlSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      id="vexl"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section divider - decorative element */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-sm text-accent mb-4 block">
            Since October 2022
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Tech Lead at Vexl
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building the future of peer-to-peer Bitcoin trading
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12 card-glow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg leading-relaxed mb-6">
                  Vexl is a mobile app enabling{" "}
                  <span className="text-accent font-medium">
                    peer-to-peer Bitcoin trading
                  </span>{" "}
                  without identity verification. It connects users through their
                  social networks—friends and friends of friends—allowing them
                  to browse anonymized trade offers and communicate through
                  end-to-end encrypted chat.
                </p>
                <p className="text-muted-foreground mb-8">
                  The service emphasizes user privacy and control over personal
                  data, providing a simple, accessible way to trade bitcoin as
                  it was intended.
                </p>

                <a
                  href="https://vexl.it"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  Visit Vexl
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Privacy First</h3>
                    <p className="text-sm text-muted-foreground">
                      No KYC, no identity verification, full control
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Social Network</h3>
                    <p className="text-sm text-muted-foreground">
                      Trade with friends and trusted connections
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <div className="p-2 rounded-lg bg-accent/10 text-accent">
                    <Bitcoin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">True P2P</h3>
                    <p className="text-sm text-muted-foreground">
                      Bitcoin as it was intended—peer to peer
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
