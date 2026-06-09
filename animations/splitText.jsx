"use client"
// SplitTextScroll.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Option A (trial package):
import SplitText from "gsap-trial/SplitText";
// Option B (Club/official plugin) — uncomment if you have the club plugin instead:
// import SplitText from "gsap/SplitText";

import "@/app/style/splitText.css";

const SplitTextScroll = () => {
  const rootRef = useRef(null);
  const instancesRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // If using club SplitText, also register it:
    // gsap.registerPlugin(SplitText);

    // make sure we can see the element before splitting (opacity->1)
    gsap.set(".split", { opacity: 1 });

    // wait for fonts so line-measuring is correct
    const run = async () => {
      try {
        await document.fonts.ready;
      } catch (e) {
        // fonts.ready may throw in some contexts; continue anyway
      }

      const containers = gsap.utils.toArray(".container");

      // store created SplitText instances for cleanup
      instancesRef.current = [];

      containers.forEach((container, i) => {
        const textEl = container.querySelector(".split");
        if (!textEl) return;

        // revert any previous split on this element (safety)
        if (textEl._splitInstance && typeof textEl._splitInstance.revert === "function") {
          textEl._splitInstance.revert();
        }

        // Create instance (works with gsap-trial and Club SplitText)
        // note: some builds expect `new SplitText(...)`, others allow calling as function
        let instance;
        try {
          instance = new SplitText(textEl, {
            type: "words,lines",
            linesClass: "line",
            wordsClass: "word",
            mask: "lines",
            autoSplit: true,
          });
        } catch (err) {
          // fallback to create (older examples)
          instance = SplitText.create
            ? SplitText.create(textEl, {
                type: "words,lines",
                linesClass: "line",
                wordsClass: "word",
                mask: "lines",
                autoSplit: true,
              })
            : null;
        }

        if (!instance) {
          console.warn("SplitText instance creation failed for element:", textEl);
          return;
        }

        // attach for safety & cleanup
        textEl._splitInstance = instance;
        instancesRef.current.push(instance);

        // animation (lines)
        gsap.from(instance.lines, {
          yPercent: 120,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",           // where animation starts
            end: "bottom 60%",         // where it ends
            scrub: true,
            markers: true,             // <-- shows start / end indicators
            onEnter: () => {
              // small hint for debugging
              // console.log("enter", i);
            },
            onLeaveBack: () => {
              // console.log("leave back", i);
            },
          },
        });
      });

      // refresh triggers after everything is created and on resize
      ScrollTrigger.refresh();
      window.addEventListener("resize", ScrollTrigger.refresh);
    };

    run();

    return () => {
      // cleanup: revert all split instances, kill triggers and remove listeners
      instancesRef.current.forEach((inst) => {
        try {
          inst.revert && inst.revert();
        } catch (e) {}
      });
      instancesRef.current = [];

      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", ScrollTrigger.refresh);
    };
  }, []);

  return (
    <div ref={rootRef} className="split-multiple-fixed">
      <div className="spacer" />
      {[1, 2, 3, 4, 5].map((n) => (
        <div className="container" key={n}>
          <h2 className="split">
            The text in this paragraph is split by words and lines. Lines can be
            tricky to manage responsively and other Text splitting libraries will
            break when the text reflows due to a resize.
          </h2>
        </div>
      ))}
      <div className="spacer" />
    </div>
  );
};

export default SplitTextScroll;















