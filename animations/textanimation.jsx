"use client"
import React, { useEffect, useRef } from 'react';

const ScrollTextReveal = ({ 
  text, 
  type = 'letters', 
  animation = 'smooth-cascade',
  className = '',
  as = 'h1',
  style = {}
}) => {
  const textRef = useRef(null);
  const timelineRef = useRef(null);
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const initAnimation = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      
      if (!gsap || !ScrollTrigger) return;
      
      gsap.registerPlugin(ScrollTrigger);

      // Split text based on type
      let html = '';
      
      if (animation === 'multi-line') {
        const lines = text.split('\n').filter(line => line.trim());
        html = lines.map(line => 
          `<span class="str-line"><span class="str-line-inner">${line}</span></span>`
        ).join('');
      } else if (type === 'letters' || animation === 'smooth-cascade' || animation === 'smooth-wave') {
        html = text.split('').map(char => 
          `<span class="str-char">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
      } else if (type === 'words') {
        html = text.split(' ').map(word => 
          `<span class="str-word-wrapper"><span class="str-word">${word}</span></span>`
        ).join(' ');
      } else if (animation === 'cascade-mix') {
        html = text.split(' ').map(word => 
          `<span class="str-word-wrapper"><span class="str-word">${
            word.split('').map(char => `<span class="str-char">${char}</span>`).join('')
          }</span></span>`
        ).join(' ');
      }

      element.innerHTML = html;

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 60%',
          toggleActions: 'play none none reverse'
        }
      });

      // Apply animation based on type
      switch (animation) {
        case 'smooth-cascade':
          tl.to(element.querySelectorAll('.str-char'), {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: { amount: 0.6, ease: 'power2.inOut' }
          });
          break;

        case 'word-flow':
          tl.to(element.querySelectorAll('.str-word'), {
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: { amount: 0.5, ease: 'power2.inOut' }
          });
          break;

        case 'cascade-mix':
          tl.to(element.querySelectorAll('.str-word'), {
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1
          }).to(element.querySelectorAll('.str-char'), {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            stagger: { amount: 0.4, from: 'random' }
          }, 0.2);
          break;

        case 'gentle-flow':
          tl.to(element.querySelectorAll('.str-word-wrapper'), {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: { amount: 0.6, ease: 'power2.inOut' }
          });
          break;

        case 'multi-line':
          tl.to(element.querySelectorAll('.str-line-inner'), {
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            stagger: { amount: 0.3 }
          });
          break;

        case 'smooth-wave':
          tl.to(element.querySelectorAll('.str-char'), {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            stagger: { amount: 0.5, from: 'center', ease: 'power2.inOut' }
          });
          break;

        default:
          tl.to(element.querySelectorAll('.str-char'), {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            stagger: { amount: 0.6 }
          });
      }

      timelineRef.current = tl;
    };

    // Load GSAP scripts if not already loaded
    if (!scriptsLoadedRef.current && !window.gsap) {
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      document.head.appendChild(script2);

      script2.onload = () => {
        scriptsLoadedRef.current = true;
        initAnimation();
      };
    } else {
      initAnimation();
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [text, type, animation]);

  const Tag = as;

  return (
    <>
      <style>{`
        .scroll-text-reveal {
          overflow: visible;
          word-wrap: break-word;
          overflow-wrap: break-word;
        }

        .scroll-text-reveal .str-char {
          display: inline-block;
          opacity: 0;
          transform: translateY(40px);
          white-space: pre-wrap;
        }

        .scroll-text-reveal .str-word-wrapper {
          display: inline-block;
          overflow: visible;
          margin-right: 0.3em;
          vertical-align: top;
        }

        .scroll-text-reveal .str-word {
          display: inline-block;
          transform: translateY(100%);
          white-space: nowrap;
        }

        .scroll-text-reveal .str-line {
          display: block;
          overflow: visible;
          margin-bottom: 0.2em;
        }

        .scroll-text-reveal .str-line-inner {
          display: block;
          transform: translateY(100%);
        }

        .scroll-text-reveal.animation-gentle-flow .str-word-wrapper {
          opacity: 0;
          transform: translateY(20px);
        }

        .scroll-text-reveal.animation-cascade-mix .str-char {
          opacity: 0;
          transform: translateY(30px);
        }

        .scroll-text-reveal.animation-smooth-wave .str-char {
          opacity: 0;
          transform: translateY(30px) scale(0.9);
        }
      `}</style>
      
      <Tag 
        ref={textRef}
        className={`scroll-text-reveal animation-${animation} ${className}`}
        style={style}
      >
        {text}
      </Tag>
    </>
  );
};

export default ScrollTextReveal;














