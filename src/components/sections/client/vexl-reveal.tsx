"use client";

import { createContext, useContext, type ReactNode, type RefObject } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

const VexlInViewContext = createContext(false);

interface VexlInViewProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
}

export function VexlInView({
  children,
  className,
  threshold = 0.2,
}: VexlInViewProps) {
  const { ref, isInView } = useInView({ threshold });

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      <VexlInViewContext.Provider value={isInView}>
        {children}
      </VexlInViewContext.Provider>
    </div>
  );
}

type Axis = "x" | "y";

interface VexlRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  axis?: Axis;
  distance?: number;
}

export function VexlReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  axis = "y",
  distance = 40,
}: VexlRevealProps) {
  const isInView = useContext(VexlInViewContext);

  const initial =
    axis === "x" ? { opacity: 0, x: distance } : { opacity: 0, y: distance };

  const animate = isInView
    ? axis === "x"
      ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 }
    : {};

  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
