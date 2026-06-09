"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

import "@/app/style/loader.css";

const Loader = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const navigate = useRouter();

  useEffect(() => {
    const handleLoad = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none";
          }
          navigate("/home");
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power3.inOut",
      }).to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power3.inOut",
      }, "-=0.8");
    };

    // If already loaded
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [navigate]);

  return (
    <div ref={loaderRef} className="loader">
      <h1 ref={textRef} className="loader-text">STRIX</h1>
    </div>
  );
};

export default Loader;



















