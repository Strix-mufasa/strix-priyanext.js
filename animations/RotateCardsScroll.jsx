"use client"
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RotateCardsScroll() {
  useEffect(() => {
    if (window.innerWidth < 770) return; // desktop only

    const animateCard = (selector, startAngle) => {
      const cards = document.querySelectorAll(selector);

      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            rotate: startAngle,
            opacity: 0.4,
            y: 60,
            filter: "blur(6px)",
            transformOrigin: "center center",
          },
          {
            rotate: 0,
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 70%",
              end: "top 40%",
              scrub: 1.2,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    };

    // ✅ Card types
    animateCard(".p-sec2-card2", "18deg");
    animateCard(".p-sec2-card1", "-18deg");

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return null;
}















