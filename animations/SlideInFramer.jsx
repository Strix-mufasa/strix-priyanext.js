"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function SlideInFramerAuto() {
  useEffect(() => {
    const elements = document.querySelectorAll(".slidein");
    if (!elements.length) return;

    elements.forEach((el) => {
      // Skip if already animated
      if (el.dataset.animated === "true") return;

      // Initial hidden state
      el.style.opacity = 0;
      el.style.transform = "translateY(80px)";
      el.style.filter = "blur(14px)";
      el.style.willChange = "transform, opacity, filter";

      const runAnimation = () => {
        animate(
          el,
          { opacity: 1, y: 0, filter: "blur(0px)" },
          {
            duration: 0.9,
            ease: "easeOut",
            onComplete: () => {
              el.dataset.animated = "true"; // ✅ lock animation
            }
          }
        );
      };

      // If element is already in view on page load -> animate immediately
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        runAnimation();
        return;
      }

      // Intersection Observer for scroll-in animation
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            runAnimation();
            observer.unobserve(el); // ✅ fire once only
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(el);
    });
  }, []);

  return null;
}















