"use client"
import { useEffect } from "react";
import { animate } from "framer-motion";

export default function ScrollSlideAnimations() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    // Mobile: reduced distance, no blur, faster duration
    // Desktop: full effects
    const animationConfigs = {
      slideInTopLeft: {
        initial: { opacity: 0, x: isMobile ? -30 : -80, y: isMobile ? -30 : -80, filter: isMobile ? "blur(0px)" : "blur(14px)" },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      },
      slideInBottomLeft: {
        initial: { opacity: 0, x: isMobile ? -30 : -80, y: isMobile ? 30 : 80, filter: isMobile ? "blur(0px)" : "blur(14px)" },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      },
      slideInTopRight: {
        initial: { opacity: 0, x: isMobile ? 30 : 80, y: isMobile ? -30 : -80, filter: isMobile ? "blur(0px)" : "blur(14px)" },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      },
      slideInBottomRight: {
        initial: { opacity: 0, x: isMobile ? 30 : 80, y: isMobile ? 30 : 80, filter: isMobile ? "blur(0px)" : "blur(14px)" },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      },
      slideInLeft: {
        initial: { opacity: 0, x: isMobile ? -30 : -80, y: 0, filter: isMobile ? "blur(0px)" : "blur(14px)" },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      },
      slideInRight: {
        initial: { opacity: 0, x: isMobile ? 30 : 80, y: 0, filter: isMobile ? "blur(0px)" : "blur(14px)" },
        animate: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.animated) {
            const el = entry.target;
            el.dataset.animated = "true";

            const animationType = Array.from(el.classList).find(cls => 
              Object.keys(animationConfigs).includes(cls)
            );

            if (animationType) {
              const config = animationConfigs[animationType];
              animate(
                el,
                config.animate,
                { 
                  duration: isMobile ? 0.5 : 0.9,
                  ease: isMobile ? [0.25, 0.1, 0.25, 1] : "easeOut"
                }
              );
            }
          }
        });
      },
      { 
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? "0px 0px -50px 0px" : "0px 0px -100px 0px"
      }
    );

    Object.keys(animationConfigs).forEach(animationType => {
      const elements = document.querySelectorAll(`.${animationType}`);
      elements.forEach((el) => {
        const config = animationConfigs[animationType];
        el.style.opacity = config.initial.opacity;
        el.style.transform = `translate(${config.initial.x}px, ${config.initial.y}px)`;
        if (!isMobile) {
          el.style.filter = config.initial.filter;
        }
        // Hardware acceleration
        el.style.willChange = isMobile ? "transform, opacity" : "transform, opacity, filter";
        el.style.backfaceVisibility = "hidden";
        el.style.perspective = "1000px";
        observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  return null;
}














