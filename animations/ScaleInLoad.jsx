"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function ScaleInLoad() {
  useEffect(() => {
    const elements = document.querySelectorAll(".scaleLoad");

    elements.forEach((el) => {
      // initial state
      el.style.opacity = 0;
      el.style.transform = "scale(0.88)";
      el.style.filter = "blur(12px)";
      el.style.willChange = "transform, opacity, filter";

      const isMobile = window.innerWidth < 770;

      animate(
        el,
        { 
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        },
        {
          duration: isMobile ? 0.7 : 0.85,     // slightly snappier on mobile
          ease: [0.22, 1, 0.36, 1],            // buttery smooth curve
        }
      );
    });
  }, []);

  return null;
}















