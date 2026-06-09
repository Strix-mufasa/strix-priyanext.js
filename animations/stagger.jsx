"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function Stagger() {
  useEffect(() => {
    const staggerConfigs = {
      stagger1: { delay: 0 },
      stagger2: { delay: 0.1 },
      stagger3: { delay: 0.2 },
      stagger4: { delay: 0.3 },
      stagger5: { delay: 0.4 },
      stagger6: { delay: 0.5 },
      stagger7: { delay: 0.6 },
      stagger8: { delay: 0.7 },
      stagger9: { delay: 0.8 },
      stagger10: { delay: 0.9 }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            const el = entry.target;
            el.dataset.animated = "true";

            const staggerClass = Array.from(el.classList).find(cls => 
              Object.keys(staggerConfigs).includes(cls)
            );

            const delay = staggerClass ? staggerConfigs[staggerClass].delay : 0;

            animate(
              el,
              { opacity: 1, y: 0, filter: "blur(0px)" },
              { duration: 0.9, ease: "easeOut", delay }
            );
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    Object.keys(staggerConfigs).forEach(staggerClass => {
      const elements = document.querySelectorAll(`.${staggerClass}`);
      elements.forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(80px)";
        el.style.filter = "blur(14px)";
        el.style.willChange = "transform, opacity, filter";
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return null;
}














