"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * TextRevealOnScroll Component
 * 
 * Animates text by revealing it from bottom to top as user scrolls.
 * The text starts gray and progressively reveals to white.
 * 
 * @param {Object} props
 * @param {string} props.text - The text content to animate
 * @param {string} props.className - Additional CSS classes (optional)
 * @param {string} props.triggerStart - ScrollTrigger start position (default: "top 50%")
 * @param {string} props.triggerEnd - ScrollTrigger end position (default: "bottom 50%")
 * 
 * Usage:
 * <TextRevealOnScroll 
 *   text="Your text here" 
 *   className="custom-class"
 * />
 */
export const TextRevealOnScroll = ({ 
  text, 
  className = '', 
  triggerStart = 'top 50%',
  triggerEnd = 'bottom 50%'
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const trigger = ScrollTrigger.create({
      trigger: textElement,
      start: triggerStart,
      end: triggerEnd,
      scrub: 1,
      onUpdate: (self) => {
        const clipValue = Math.max(0, 100 - self.progress * 100);
        textElement.style.setProperty('--clip-value', `${clipValue}%`);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [text, triggerStart, triggerEnd]);

  return (
    <h1 
      ref={textRef}
      className={`animate-text ${className}`}
      data-text={text}
      style={{
        position: 'relative',
        width: '60%',
        margin: '0 auto',
        color: '#4f4f4f',
        fontSize: '4rem',
        fontWeight: 900,
        letterSpacing: '-0.15rem',
        lineHeight: 1.125,
        textAlign: 'center',
        '--clip-value': '100%',
      }}
    >
      <style>{`
        .animate-text::before {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          color: #fff;
          clip-path: inset(0 0 var(--clip-value) 0);
          will-change: clip-path;
        }
        @media (max-width: 1000px) {
          .animate-text {
            width: 100% !important;
            font-size: 2rem !important;
            letter-spacing: -0.05rem !important;
          }
        }
      `}</style>
      {text}
    </h1>
  );
};

/**
 * ServicesHeaderSlide Component
 * 
 * Creates a pinned section with three headers that:
 * 1. Slide in from left/right
 * 2. Move vertically (top/bottom headers)
 * 3. Scale down together
 * 
 * @param {Object} props
 * @param {Array<string>} props.headers - Array of 3 text strings for the headers
 * @param {string} props.className - Additional CSS classes (optional)
 * @param {number} props.pinDuration - Duration multiplier for pin (default: 2)
 * 
 * Usage:
 * <ServicesHeaderSlide 
 *   headers={['WHAT I DO', 'WHAT I DO', 'WHAT I DO']}
 *   className="services-section"
 * />
 */
export const ServicesHeaderSlide = ({ 
  headers = ['WHAT I DO', 'WHAT I DO', 'WHAT I DO'],
  className = '',
  pinDuration = 0.5
}) => {
  const containerRef = useRef(null);
  const headerRefs = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const headerElements = headerRefs.current;
    
    if (!container || headerElements.length !== 3) return;

    // Initial slide-in animation
    const slideInTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'top top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(headerElements[0], { x: `${100 - self.progress * 100}%` });
        gsap.set(headerElements[1], { x: `${-100 + self.progress * 100}%` });
        gsap.set(headerElements[2], { x: `${100 - self.progress * 100}%` });
      },
    });

    // Pin and vertical movement + scale animation
    const pinTrigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${window.innerHeight * pinDuration}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      onUpdate: (self) => {
        if (self.progress <= 0.5) {
          // First half: vertical movement
          const yProgress = self.progress / 0.5;
          gsap.set(headerElements[0], { y: `${yProgress * 100}%` });
          gsap.set(headerElements[2], { y: `${yProgress * -100}%` });
        } else {
          // Second half: scaling
          gsap.set(headerElements[0], { y: '100%' });
          gsap.set(headerElements[2], { y: '-100%' });

          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
          const scale = 1 - scaleProgress * (1 - minScale);

          headerElements.forEach((header) => gsap.set(header, { scale }));
        }
      },
    });

    return () => {
      slideInTrigger.kill();
      pinTrigger.kill();
    };
  }, [headers, pinDuration]);

  return (
    <section 
      ref={containerRef}
      className={`services-container ${className}`}
      style={{
        position: 'relative',
        width: '100vw',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
      }}
    >
      <style>{`
        .services-header-item {
          position: relative;
          width: 100vw;
          padding: 0 2rem;
          will-change: transform;
          overflowx: visible;
        }
        .services-header-item h1 {
          font-size: 7rem;
          width: 100vw;
          font-weight: 900;
          letter-spacing: -0.15rem;
          line-height: 1;
          text-align: center;
          margin: 0;
          white-space: nowrap;
        }
        .services-header-item:nth-child(1),
        .services-header-item:nth-child(3) {
          transform: translateX(100%) translateY(0%);
        }
        .services-header-item:nth-child(2) {
          transform: translateX(-100%) translateY(0%);
          z-index: 2;
        }
        @media (max-width: 1000px) {
          .services-header-item h1 {
            font-size: 3rem;
            letter-spacing: -0.05rem;
          }
        }
      `}</style>
      
      {headers.map((text, index) => (
        <div
          key={index}
          ref={(el) => (headerRefs.current[index] = el)}
          className="services-header-item"
        >
          <h1>{text}</h1>
        </div>
      ))}
    </section>
  );
};















