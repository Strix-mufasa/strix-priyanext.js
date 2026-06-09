"use client"
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import "@/app/style/animation.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

export default function AliceWonderland() {
  useEffect(() => {
    // Smooth scroll
    ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
    });

    // Split text animation
    const splitLetters = SplitText.create(
      document.querySelector(".opacity-reveal")
    );
    gsap.set(splitLetters.chars, { opacity: "0.2", y: 0 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".section-stick",
          pin: true,
          start: "center center",
          end: "+=1500",
          scrub: 1,
        },
      })
      .to(splitLetters.chars, {
        opacity: "1",
        duration: 1,
        ease: "none",
        stagger: 1,
      })
      .to({}, { duration: 10 })
      .to(".opacity-reveal", {
        opacity: "0",
        scale: 1.2,
        duration: 50,
      });

    // Reverse scroll images/text
    let reverseTrigger = gsap.utils.toArray(".reverse-scroll");
    reverseTrigger.forEach((element) => {
      gsap.to(element, {
        yPercent: 30,
        scrollTrigger: {
          trigger: element,
          start: 0,
          end: "+=100%",
          scrub: true,
          pin: true,
        },
      });
    });

    // Liquify animation
    gsap.set(".liquify-scroll", { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".liquify-scroll",
          start: "top bottom",
          end: "bottom 60%",
          scrub: true,
        },
      })
      .to(
        "#liquid",
        {
          attr: { scale: 0 },
        },
        0
      )
      .to(
        ".liquify-scroll",
        {
          opacity: 1,
          y: 0,
        },
        0
      );
  }, []);

  return (
    <main className="font-[Open_Sans]">
      {/* Section 1 */}
      <section className="flex p-24 min-h-screen">
        <div className="flex flex-col xl:flex-row justify-between grow-1 gap-24">
          <div className="reverse-scroll">
            <h1 className="heading font-semibold leading-[0.8]">
              behind
              <br />
              curtain
            </h1>
            <p className="pt-8 px-2">
              She tried the little golden key in the lock, and to her great
              delight it fitted !
            </p>
            <p className="pt-2 px-2">
              Alice opened the door and found that it led into a small passage
            </p>
          </div>
          <div className="grow-1 flex xl:justify-end items-end">
            <img
              className="reverse-scroll w-full max-w-[760px]"
              src="https://assets.codepen.io/204808/alice-curtain.jpg"
              alt="Alice"
            />
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="section-stick min-h-screen bg-black flex justify-center items-center text-white">
        <p className="opacity-reveal text-7xl text-center w-3/5 font-medium">
          It was all very well to say "Drink me," but the wise little Alice was
          not going to do that
        </p>
      </section>

      {/* Section 3 */}
      <section className="relative min-h-screen bg-white mt-[-1px]">
        <video
          className="w-screen h-screen object-cover"
          src="https://assets.codepen.io/204808/alice-in-wonderland-vid.mov"
          muted
          autoPlay
          loop
          playsInline
        ></video>
        <h1
          style={{ filter: "url('#liquify')" }}
          className="liquify-scroll absolute text-center top-1/2 translate-y-[-50%] w-full text-8xl font-semibold px-60"
        >
          Alice&apos;s Adventures in Wonderland
        </h1>
        <svg className="hidden">
          <filter id="liquify">
            <feTurbulence
              baseFrequency="0.015"
              numOctaves="3"
              result="warp"
              type="fractalNoise"
            ></feTurbulence>
            <feDisplacementMap
              id="liquid"
              in="SourceGraphic"
              in2="warp"
              scale="100"
              xChannelSelector="R"
              yChannelSelector="B"
            ></feDisplacementMap>
          </filter>
        </svg>
      </section>

      {/* Progress bar */}
      <div className="progress-bar">
        <div className="progress-bar__text" data-text="PROGRESS">
          PROGRESS
        </div>
      </div>

      {/* Author */}
      <div className="c-author">
        Built with 💜 by{" "}
        <a
          target="_blank"
          rel="noreferrer"
          className="c-author__link"
          href="https://www.linkedin.com/in/iamryanyu/"
        >
          Ryan Yu
        </a>
      </div>
    </main>
  );
}
















