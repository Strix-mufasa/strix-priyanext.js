"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function MobileSlideIn() {
  useEffect(() => {
    const elements = document.querySelectorAll(".mslide");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            const el = entry.target;
            
            // Only animate on mobile (760px and below)
            if (window.innerWidth <= 760) {
              el.dataset.animated = "true";

              animate(
                el,
                { opacity: 1, y: 0, filter: "blur(0px)" },
                { duration: 0.9, ease: "easeOut" }
              );
            } else {
              // Reset styles for larger screens
              el.style.opacity = 1;
              el.style.transform = "translateY(0)";
              el.style.filter = "blur(0px)";
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const initializeElements = () => {
      elements.forEach((el) => {
        if (window.innerWidth <= 760) {
          el.style.opacity = 0;
          el.style.transform = "translateY(80px)";
          el.style.filter = "blur(14px)";
          el.style.willChange = "transform, opacity, filter";
        } else {
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0px)";
        }
        observer.observe(el);
      });
    };

    initializeElements();

    // Handle resize
    const handleResize = () => {
      elements.forEach((el) => {
        el.dataset.animated = "";
        if (window.innerWidth > 760) {
          el.style.opacity = 1;
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0px)";
        }
      });
      initializeElements();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return null;
}














