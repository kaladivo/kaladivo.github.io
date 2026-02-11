"use client";

import { useEffect } from "react";

interface AboutInViewTriggerProps {
  sectionId: string;
  threshold?: number;
}

function revealElements(elements: NodeListOf<HTMLElement>) {
  elements.forEach((element) => {
    element.classList.remove("opacity-0", "translate-y-10");
    element.classList.add("opacity-100", "translate-y-0");
  });
}

export function AboutInViewTrigger({
  sectionId,
  threshold = 0.2,
}: AboutInViewTriggerProps) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const animatedElements =
      section.querySelectorAll<HTMLElement>("[data-about-animate]");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      revealElements(animatedElements);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry || !entry.isIntersecting) {
          return;
        }

        revealElements(animatedElements);
        observer.disconnect();
      },
      { threshold },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, threshold]);

  return null;
}
