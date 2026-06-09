"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function SplitTextOnLoad() {
  useEffect(() => {
    const headers = document.querySelectorAll(".splitheader");

    headers.forEach((header) => {
      const text = header.textContent.trim();

      const startDelay = 0.8; // delay before animation begins
      const duration = 0.6;  // animation duration
      const ease = [0.16, 1, 0.3, 1];

      // ✅ MOBILE ANIMATION (no split)
      if (window.innerWidth < 770) {
        header.style.opacity = 0;
        header.style.transform = "translateY(30px)";
        header.style.filter = "blur(10px)";
        header.style.willChange = "transform, opacity, filter";

        animate(
          header,
          { opacity: 1, y: 0, filter: "blur(0px)" },
          {
            duration,
            ease,
            delay: startDelay,
          }
        );
        return;
      }

      // ✅ DESKTOP SPLIT-LETTER ANIMATION
      header.textContent = "";
      header.style.opacity = 1; // since letters will animate individually

      text.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.style.display = "inline-block";
        span.style.opacity = 0;
        span.style.transform = "translateY(24px)";
        span.style.filter = "blur(6px)";
        span.style.willChange = "transform, opacity, filter";
        header.appendChild(span);
      });

      const letters = header.querySelectorAll("span");

      letters.forEach((span, i) => {
        animate(
          span,
          { opacity: 1, y: 0, filter: "blur(0px)" },
          {
            duration,
            ease,
            delay: startDelay + i * 0.05,
          }
        );
      });
    });
  }, []);

  return null;
}















