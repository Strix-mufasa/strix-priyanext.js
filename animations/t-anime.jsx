"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const ScrollText = ({ text, type = "letters", animation = "fade-up" }) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Split text
    const split = new SplitType(textRef.current, {
      types:
        type === "letters"
          ? "chars"
          : type === "words"
          ? "words"
          : "lines, words, chars",
    });

    // Animation configs
    const target =
      type === "letters"
        ? split.chars
        : type === "words"
        ? split.words
        : split.lines;

    // Define animation variants
    const animations = {
      "fade-up": { y: 40, opacity: 0 },
      "slide-in": { x: -40, opacity: 0 },
      "scale-in": { scale: 0.9, opacity: 0 },
      "wave": { y: 30, scale: 0.9, opacity: 0 },
    };

    const fromVars = animations[animation] || animations["fade-up"];

    // Animate on scroll
    gsap.fromTo(
      target,
      fromVars,
      {
        y: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        },
      }
    );

    // Cleanup
    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [text, type, animation]);

  return (
    <h1 ref={textRef} style={{ margin: 0, padding: 0 }}>
      {text}
    </h1>
  );
};

export default ScrollText;















