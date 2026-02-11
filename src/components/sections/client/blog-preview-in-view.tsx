"use client";

import { useEffect } from "react";

interface BlogPreviewInViewProps {
  sectionId: string;
  threshold?: number;
}

function revealElements(elements: NodeListOf<HTMLElement>) {
  elements.forEach((element) => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
}

export function BlogPreviewInView({
  sectionId,
  threshold = 0.2,
}: BlogPreviewInViewProps) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) {
      return;
    }

    const animatedElements =
      section.querySelectorAll<HTMLElement>("[data-blog-preview-animate]");
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
