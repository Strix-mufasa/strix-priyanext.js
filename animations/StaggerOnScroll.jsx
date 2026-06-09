"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function StaggerOnScrollDebug() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const groups = document.querySelectorAll(".stagger");
    if (!groups.length) return;

    // Set initial state immediately
    groups.forEach((parent) => {
      Array.from(parent.children).forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateX(40px)";
        el.style.filter = "blur(6px)";
        el.style.willChange = "transform, opacity, filter";
      });
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const parent = entry.target;
          const children = Array.from(parent.children).filter(el => el.nodeType === 1);

          children.forEach((el, i) => {
            animate(
              el,
              { opacity: 1, x: 0, filter: "blur(0px)" },
              {
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.12,
              }
            );
          });

          // ✅ Ensure animation only fires ONCE
          io.unobserve(parent);
        });
      },
      { threshold: 0.15 }
    );

    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, []);

  return null;
}















