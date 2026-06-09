"use client"
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "@/app/style/loop.css";

// Import images
const slogo1 = "/assets/img/slogo1.webp";
const slogo2 = "/assets/img/slogo2.webp";
const slogo3 = "/assets/img/slogo3.webp";
const slogo4 = "/assets/img/slogo4.webp";
const slogo5 = "/assets/img/slogo5.webp";
const slogo6 = "/assets/img/slogo6.webp";
const slogo7 = "/assets/img/slogo7.png";
const slogo8 = "/assets/img/slogo8.png";
const slogo9 = "/assets/img/slogo9.png";
const slogo10 = "/assets/img/slogo10.png";

const logos = [slogo1, slogo2, slogo3, slogo4, slogo5, slogo6, slogo7, slogo8, slogo9, slogo10,];

const LogoLoop = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const strip = containerRef.current.querySelector(".logo-strip");
      const stripWidth = strip.scrollWidth / 2; // width of one set of logos

      gsap.to(strip, {
        x: -stripWidth,
        duration: 30, // speed (lower = faster)
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => {
            const current = parseFloat(x);
            // Reset after moving one full set
            return `${current % -stripWidth}px`;
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="logo-loop" ref={containerRef}>
      <div className="logo-strip">
        {/* Duplicate logos to ensure smooth loop */}
        {logos.concat(logos).map((src, i) => (
          <div key={i} className="logo-item">
            <img src={src} alt={`logo-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
















