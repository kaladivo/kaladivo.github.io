"use client";

import { useEffect } from "react";

interface ProjectsInViewTriggerProps {
  sectionId: string;
  threshold?: number;
}

export function ProjectsInViewTrigger({
  sectionId,
  threshold = 0.1,
}: ProjectsInViewTriggerProps) {
  useEffect(() => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.setAttribute("data-in-view", String(entry.isIntersecting));
      },
      { threshold }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, threshold]);

  return null;
}
