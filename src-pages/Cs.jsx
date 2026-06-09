"use client"
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Nav from "../components/Navbar";
const Css = "/assets/img/cs.webp";
import "@/app/style/cs.css";
const Cicon = "/assets/img/c-icon.webp";
import ButtonArrow from "../components/button-arrow";

const Cs = () => {
  const containerRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const imageRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✅ Keep image centered without breaking layout
      gsap.set(imageRef.current, {
        xPercent: -50,
        yPercent: -50,
        top: "50%",
        left: "50%",
        position: "absolute",
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Headings & paragraph
      tl.from(heading1Ref.current, { y: 50, opacity: 0, duration: 1 })
        .from(
          heading2Ref.current,
          { y: 50, opacity: 0, duration: 1 },
          "-=0.6"
        )
        .from(
          paragraphRef.current,
          { y: 30, opacity: 0, duration: 0.8 },
          "-=0.4"
        )

        // Css image scale-out effect
        .fromTo(
          imageRef.current,
          { opacity: 0, scale: 1.3 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power4.out",
          },
          "-=0.3"
        )

        // Social icons stagger
        .from(
          socialsRef.current.children,
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.6,
          },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={containerRef} className="comming">
      <Nav />
      <h1 ref={heading1Ref}>Coming soon!</h1>
      <h2 ref={heading2Ref}>
        This page is under <br /> construction
      </h2>
      <p ref={paragraphRef}>Stay in the loop — follow us on social media.</p>

      {/* ✅ Image stays perfectly centered while animating */}
      <img ref={imageRef} className="c-img" src={Css} alt="coming soon" />

      <div ref={socialsRef} className="mobile-socials">
        <span className="ri--behance-fill"></span>
        <span className="icon-park-outline--dribble"></span>
        <span className="mdi--instagram"></span>
        <span className="ri--twitter-x-line"></span>
        <span className="akar-icons--linkedin-v1-fill"></span>
        <img src={Cicon} className="cion" alt="cicon" />
      </div>

     <div className="btccs">
       <ButtonArrow text="Let's talk" />
     </div>
    </div>
  );
};

export default Cs;


























