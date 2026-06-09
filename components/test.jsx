"use client"
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import '@/app/style/test.css';

const AnimatedCards = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const smoothStep = (p) => p * p * (3 - 2 * p);

    if (window.innerWidth > 1000) {
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top top',
        end: '75% top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const heroCardsContainerOpacity = gsap.utils.interpolate(1, 0.5, smoothStep(progress));
          gsap.set('.hero-cards', { opacity: heroCardsContainerOpacity });

          ['#hero-card-1', '#hero-card-2', '#hero-card-3'].forEach((cardId, index) => {
            const delay = index * 0.9;
            const cardProgress = gsap.utils.clamp(0, 1, (progress - delay * 0.1) / (1 - delay * 0.1));

            const y = gsap.utils.interpolate('0%', '350%', smoothStep(cardProgress));
            const scale = gsap.utils.interpolate(1, 0.75, smoothStep(cardProgress));

            let x = '0%';
            let rotation = 0;
            if (index === 0) {
              x = gsap.utils.interpolate('0%', '90%', smoothStep(cardProgress));
              rotation = gsap.utils.interpolate(0, -15, smoothStep(cardProgress));
            } else if (index === 2) {
              x = gsap.utils.interpolate('0%', '-90%', smoothStep(cardProgress));
              rotation = gsap.utils.interpolate(0, 15, smoothStep(cardProgress));
            }

            gsap.set(cardId, { y, x, rotation, scale });
          });
        },
      });

      ScrollTrigger.create({
        trigger: '.services',
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        pin: '.services',
        pinSpacing: true,
      });

      ScrollTrigger.create({
        trigger: '.services',
        start: 'top top',
        end: `+=${window.innerHeight * 4}px`,
        onLeave: () => {
          const servicesSection = document.querySelector('.services');
          const servicesRect = servicesSection.getBoundingClientRect();
          const servicesTop = window.pageYOffset + servicesRect.top;

          gsap.set('.cards', {
            position: 'absolute',
            top: servicesTop,
            left: 0,
            width: '100vw',
            height: '100vh',
          });
        },
        onEnterBack: () => {
          gsap.set('.cards', {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          });
        },
      });

      ScrollTrigger.create({
        trigger: '.services',
        start: 'top bottom',
        end: `+=${window.innerHeight * 4}`,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const headerProgress = gsap.utils.clamp(0, 1, progress / 0.9);
          const headerY = gsap.utils.interpolate('400%', '0%', smoothStep(headerProgress));
          gsap.set('.services-header', { y: headerY });

          ['#card-1', '#card-2', '#card-3'].forEach((cardId, index) => {
            const delay = index * 0.5;
            const cardProgress = gsap.utils.clamp(0, 1, (progress - delay * 0.1) / (0.9 - delay * 0.1));

            const innerCard = document.querySelector(`${cardId} .flip-card-inner`);

            let y;
            if (cardProgress < 0.4) {
              const normalizedProgress = cardProgress / 0.4;
              y = gsap.utils.interpolate('-100%', '50%', smoothStep(normalizedProgress));
            } else if (cardProgress < 0.6) {
              const normalizedProgress = (cardProgress - 0.4) / 0.2;
              y = gsap.utils.interpolate('50%', '0%', smoothStep(normalizedProgress));
            } else {
              y = '0%';
            }

            let scale;
            if (cardProgress < 0.4) {
              const normalizedProgress = cardProgress / 0.4;
              scale = gsap.utils.interpolate(0.25, 0.75, smoothStep(normalizedProgress));
            } else if (cardProgress < 0.6) {
              const normalizedProgress = (cardProgress - 0.4) / 0.2;
              scale = gsap.utils.interpolate(0.75, 1, smoothStep(normalizedProgress));
            } else {
              scale = 1;
            }

            let opacity;
            if (cardProgress < 0.2) {
              const normalizedProgress = cardProgress / 0.2;
              opacity = smoothStep(normalizedProgress);
            } else {
              opacity = 1;
            }

            let x, rotate, rotationY;
            if (cardProgress < 0.6) {
              x = index === 0 ? '100%' : index === 1 ? '0%' : '-100%';
              rotate = index === 0 ? -5 : index === 1 ? 0 : 5;
              rotationY = 0;
            } else if (cardProgress < 1) {
              const normalizedProgress = (cardProgress - 0.6) / 0.4;
              x = gsap.utils.interpolate(
                index === 0 ? '100%' : index === 1 ? '0%' : '-100%',
                '0%',
                smoothStep(normalizedProgress)
              );
              rotate = gsap.utils.interpolate(index === 0 ? -5 : index === 1 ? 0 : 5, 0, smoothStep(normalizedProgress));
              rotationY = smoothStep(normalizedProgress) * 180;
            } else {
              x = '0%';
              rotate = 0;
              rotationY = 180;
            }

            gsap.set(cardId, { opacity, y, x, rotate, scale });
            gsap.set(innerCard, { rotationY });
          });
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef}>
      <nav>
        <div className="logo"><span>Site Logo</span></div>
        <div className="menu-btn"><span>Menu</span></div>
      </nav>

      <section className="hero">
        <div className="hero-cards">
          {['Plan', 'Design', 'Develop'].map((title, i) => (
            <div className="card" id={`hero-card-${i + 1}`} key={i}>
              <div className="card-title"><span>{title}</span><span>{`0${i + 1}`}</span></div>
              <div className="card-title"><span>{`0${i + 1}`}</span><span>{title}</span></div>
            </div>
          ))}
        </div>
      </section>

      <section className="about"><h1>Keep scrolling — it gets good</h1></section>

      <section className="services">
        <div className="services-header"><h1>Stuff I make so you don’t have to</h1></div>
        <div className="mobile-cards">
          <div className="cards-container">
            {['Plan', 'Design', 'Develop'].map((title, i) => (
              <div className="card" id={`mobile-card-${i + 1}`} key={i}>
                <div className="card-wrapper">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="card-title"><span>{title}</span><span>{`0${i + 1}`}</span></div>
                      <div className="card-title"><span>{`0${i + 1}`}</span><span>{title}</span></div>
                    </div>
                    <div className="flip-card-back">
                      <div className="card-title"><span>{title}</span><span>{`0${i + 1}`}</span></div>
                      <div className="card-copy">
                        {i === 0 && ['Discovery', 'Audit', 'User Flow', 'Site Map', 'Personas', 'Strategy']}
                        {i === 1 && ['Wireframes', 'UI Kits', 'Prototypes', 'Visual Style', 'Interaction', 'Design QA']}
                        {i === 2 && ['HTML/CSS/JS', 'CMS Build', 'GSAP Motion', 'Responsive', 'Optimization', 'Launch']}
                      </div>
                      <div className="card-title"><span>{`0${i + 1}`}</span><span>{title}</span></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cards">
        <div className="cards-container">
          {['Plan', 'Design', 'Develop'].map((title, i) => (
            <div className="card" id={`card-${i + 1}`} key={i}>
              <div className="card-wrapper">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-title"><span>{title}</span><span>{`0${i + 1}`}</span></div>
                    <div className="card-title"><span>{`0${i + 1}`}</span><span>{title}</span></div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-title"><span>{title}</span><span>{`0${i + 1}`}</span></div>
                    <div className="card-copy">
                      {i === 0 && ['Discovery', 'Audit', 'User Flow', 'Site Map', 'Personas', 'Strategy'].map((text) => <p key={text}>{text}</p>)}
                      {i === 1 && ['Wireframes', 'UI Kits', 'Prototypes', 'Visual Style', 'Interaction', 'Design QA'].map((text) => <p key={text}>{text}</p>)}
                      {i === 2 && ['HTML/CSS/JS', 'CMS Build', 'GSAP Motion', 'Responsive', 'Optimization', 'Launch'].map((text) => <p key={text}>{text}</p>)}
                    </div>
                    <div className="card-title"><span>{`0${i + 1}`}</span><span>{title}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="outro"><h1>The story’s not over yet</h1></section>
    </div>
  );
};

export default AnimatedCards;
















