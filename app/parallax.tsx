"use client";

import { useEffect } from "react";

export default function Parallax() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const layers = [
      { element: document.querySelector<HTMLElement>(".hero-art"), amount: 0.12 },
      { element: document.querySelector<HTMLElement>(".landscape"), amount: 0.09 },
    ];
    let frame = 0;
    const update = () => {
      frame = 0;
      for (const { element, amount } of layers) {
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        const distance = window.innerHeight / 2 - rect.top - rect.height / 2;
        const offset = motion.matches ? 0 : Math.max(-65, Math.min(65, distance * amount));
        element.style.setProperty("--parallax", `${offset}px`);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", schedule);
      layers.forEach(({ element }) => element?.style.removeProperty("--parallax"));
    };
  }, []);
  return null;
}
