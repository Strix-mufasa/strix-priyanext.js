"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function SlideInFrameronLoad() {
  useEffect(() => {
    const elements = document.querySelectorAll(".slideinLoad");

    elements.forEach((el, index) => {
      el.style.opacity = 0;
      el.style.transform = "translateY(80px)";
      el.style.filter = "blur(14px)";
      el.style.willChange = "transform, opacity, filter";

      // Stagger delay using index
      const delay = index * 0.2;

      setTimeout(() => {
        animate(
          el,
          { opacity: 1, y: 0, filter: "blur(0px)" },
          { duration: 0.9, ease: "easeOut" }
        );
      }, delay * 3000);
    });
  }, []);

  return null;
}















