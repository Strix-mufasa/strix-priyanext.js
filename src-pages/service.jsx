"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import BtnNormsall from '../components/normSmall-btn';
const Kundali = "/assets/img/kundali-case-study.webp"
const Circle = "/assets/img/updown-circle.webp"
import { Play } from 'lucide-react';
import '@/app/style/services.css'
const Circleblur = "/assets/img/sr-img.webp"
const DesignC1 = "/assets/img/sr-car1.webp"
const DesignC2 = "/assets/img/sr-car2.webp"
const DesignC3 = "/assets/img/sr-car3.webp"
const DesignC4 = "/assets/img/sr-car4.webp"
const DesignC5 = "/assets/img/sr-car5.webp"
const DesignC6 = "/assets/img/sr-car6.webp"
const SrIcon1 = "/assets/img/sr-icon1.svg"
const SrIcon2 = "/assets/img/sr-icon2.svg"
const SrIcon3 = "/assets/img/sr-icon3.svg"
const SrIcon4 = "/assets/img/sr-icon4.svg"
const SrIcon5 = "/assets/img/sr-icon5.svg"
const SrIcon6 = "/assets/img/sr-icon6.svg"
import Carousel from "../components/carousel";
const CircleBlur = "/assets/img/circle-blur.webp";
import ButtonSmall from "../components/btn-small";
import Button from "../components/Button";
const Blur1 = "/assets/img/p-blur2.png"
const Blur2 = "/assets/img/p-blur1.png"
const Blur3 = "/assets/img/Ellipse 7.png"
const Blur4 = "/assets/img/Ellipse 8.png"
const Blur5 = "/assets/img/p-blur3.png"
const Blur6 = "/assets/img/p-blur4.png"
const HeroImg = "/assets/img/serv.webp"
const Connect = "/assets/img/connect.svg"
const DotGrid = dynamic(() => import('../animations/DotGrid'), { ssr: false });


const ScaleInLoad = dynamic(() => import('../animations/ScaleInLoad'), { ssr: false });
const SlideInFramerOnLoad = dynamic(() => import('../animations/SlideInFramerOnLoad'), { ssr: false });
const ScrollAnimation = dynamic(() => import('../animations/scrollReveal'), { ssr: false });
import gsap from "gsap";
const Dev1 = "/assets/img/devc1.webp"
const Dev2 = "/assets/img/devc2.webp"
const Dev3 = "/assets/img/devc3.webp"
const Dev4 = "/assets/img/devc4.webp"
const Dev5 = "/assets/img/devc5.webp"
const Dev6 = "/assets/img/devc6.webp"
const Pro1 = "/assets/img/proc1.webp"
const Pro2 = "/assets/img/proc2.webp"
const Pro3 = "/assets/img/proc3.webp"
const Pro4 = "/assets/img/proc4.webp"
const Pro5 = "/assets/img/proc5.webp"
import SEO from "../components/SEO";
const De1 = "/assets/img/dec1.webp"
const De2 = "/assets/img/dec2.webp"
const De3 = "/assets/img/dec3.webp"
const De4 = "/assets/img/dec4.webp"
const De5 = "/assets/img/dec5.webp"
const De6 = "/assets/img/dec6.webp"
const Devicon1 = "/assets/img/dev-i1.svg"
const Devicon2 = "/assets/img/dev-i2.svg"
const Devicon3 = "/assets/img/dev-i3.svg"
const Devicon4 = "/assets/img/dev-i4.svg"
const Devicon5 = "/assets/img/dev-i5.svg"
const Devicon6 = "/assets/img/dev-i6.svg"
const Proicon1 = "/assets/img/pro-i1.svg"
const Proicon2 = "/assets/img/pro-i2.svg"
const Proicon3 = "/assets/img/pro-i3.svg"
const Proicon4 = "/assets/img/pro-i4.svg"
const Proicon5 = "/assets/img/pro-i5.svg"



const Service = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoexRef = useRef(null)

  const heroRef = useRef(null);
  const designRef = useRef(null);
  const devRef = useRef(null);
  const proRef = useRef(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: designScroll } = useScroll({
    target: designRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: devScroll } = useScroll({
    target: devRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: proScroll } = useScroll({
    target: proRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.5, 1], [1, 0.8, 0.3]);

  const designY = useTransform(designScroll, [0, 1], ["10%", "-10%"]);
  const devY = useTransform(devScroll, [0, 1], ["10%", "-10%"]);
  const proY = useTransform(proScroll, [0, 1], ["10%", "-10%"]);

  const blur1Y = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const blur2Y = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const CircleBlurAnimation = ({ src, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.img
        ref={ref}
        src={src}
        className={className}
        initial={{
          scale: 0.7,
          opacity: 0,
          x: "-50%",
        }}
        animate={
          isInView
            ? { scale: 1, opacity: 1, x: "-50%", }
            : { x: "-50%" }
        }
        transition={{
          duration: 1.2,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          position: "absolute",
          left: "50%",
          transformOrigin: "center center",
        }}
      />
    );
  };

  useEffect(() => {
    if (window.innerWidth < 768) return
    if (!videoexRef.current) return
    const element = videoexRef.current

    const ctx = gsap.context(() => {
      gsap.to(element, {
        width: '85vw',
        height: '90vh',
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // ── Reusable carousel hook with UX enhancements ──
  const useCarousel = (slides, autoInterval = 6000) => {
    const [current, setCurrent] = useState(0);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startTime = useRef(0);
    const moveX = useRef(0);
    const autoRef = useRef(null);
    const pausedRef = useRef(false);
    const currentRef = useRef(current);
    currentRef.current = current;

    // Auto-slide using refs to avoid stale closures
    const startAuto = useCallback(() => {
      clearInterval(autoRef.current);
      autoRef.current = setInterval(() => {
        if (!pausedRef.current) {
          setCurrent((prev) => (prev + 1) % slides.length);
        }
      }, autoInterval);
    }, [slides.length, autoInterval]);

    useEffect(() => {
      startAuto();
      return () => clearInterval(autoRef.current);
    }, [startAuto]);

    const goTo = useCallback((index) => setCurrent(index), []);

    const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), [slides.length]);
    const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), [slides.length]);

    // Pause auto-slide on hover / touch
    const pause = useCallback(() => { pausedRef.current = true; }, []);
    const resume = useCallback(() => { pausedRef.current = false; }, []);

    // Drag / swipe handlers with velocity detection
    const onDragStart = useCallback((e) => {
      isDragging.current = true;
      const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
      startX.current = x;
      moveX.current = x;
      startTime.current = Date.now();
      pause();
    }, [pause]);

    const onDragMove = useCallback((e) => {
      if (!isDragging.current) return;
      moveX.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    }, []);

    const onDragEnd = useCallback(() => {
      if (!isDragging.current) return;
      const diff = startX.current - moveX.current;
      const elapsed = Date.now() - startTime.current;
      // Velocity-aware: faster swipes need less distance
      const threshold = elapsed < 200 ? 20 : 50;
      if (diff > threshold) next();
      else if (diff < -threshold) prev();
      isDragging.current = false;
      resume();
    }, [next, prev, resume]);

    // Keyboard navigation
    const onKeyDown = useCallback((e) => {
      if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { prev(); e.preventDefault(); }
    }, [next, prev]);

    // Container props bundle
    const containerProps = {
      onMouseDown: onDragStart,
      onMouseMove: onDragMove,
      onMouseUp: onDragEnd,
      onMouseLeave: (e) => { onDragEnd(e); resume(); },
      onMouseEnter: pause,
      onTouchStart: onDragStart,
      onTouchMove: onDragMove,
      onTouchEnd: onDragEnd,
      onKeyDown,
      tabIndex: 0,
      role: 'region',
      'aria-roledescription': 'carousel',
      style: { cursor: isDragging.current ? 'grabbing' : 'grab', outline: 'none', userSelect: 'none' },
    };

    return { current, goTo, containerProps, isDragging: isDragging.current, slides };
  };

  // ── Instantiate all 3 carousels ──
  const designSlides = [De1, De2, De3, De4, De5, De6];
  const design = useCarousel(designSlides);

  const devSlides = [Dev1, Dev2, Dev3, Dev4, Dev5, Dev6];
  const dev = useCarousel(devSlides);

  const proSlides = [Pro1, Pro2, Pro3, Pro4, Pro5];
  const pro = useCarousel(proSlides);

  return (
    <div>
      <SEO
        title="SaaS Platform Development for Startups"
        description="We offer SaaS platform development for startups, creating scalable, secure, and innovative solutions to bring your software ideas to market fast."
      />
      <DotGrid dotSize={2} gap={24} activeColor="#ffffff" />
      <ScaleInLoad />
      <SlideInFramerOnLoad />
      {/* <ScrollAnimation /> */}
      <Nav />

      <div className="service-hero" ref={heroRef}>
        <motion.div className="sh-top sh-top-hero" style={{ y: heroY, opacity: heroOpacity }}>
          <img src={Circleblur} alt="" />
          <h1 className="slideinLoad">The Architects of<br /> Digital Excellence.</h1>
        </motion.div>

        <div className="case-box-con">
          <motion.img src={Blur3} className="blur3-hero-left" style={{ y: blur1Y }} />
          <motion.img src={Blur4} className="blur3-hero-right" style={{ y: blur2Y }} />
          <div ref={videoexRef} style={{ width: '78vw', height: '85vh' }} className="video-card-container">
            {!isPlaying ? (
              <div className="video-thumbnail">
                <img src={HeroImg} alt="Video thumbnail" className="thumbnail-image" />
                <div className="play-button-overlay">
                  <button onClick={handlePlay} className="play-button-sr" aria-label="Play video">
                    <h2 className="sr-watch viewwork">Watch showreel</h2>
                    <span className="play-line"></span>
                    <Play className="play-icon" fill="white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="video-player">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/zk0mGoyUrLo?autoplay=1" title="Video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
              </div>
            )}
          </div>
        </div>
        <motion.img src={Blur1} className='p-blur1' style={{ y: blur1Y }} />
        <motion.img src={Blur2} className='p-blur2' style={{ y: blur2Y }} />
      </div>

      <div className="service-hero sr-txt-con norm-pad">
        <div className="sh-top sh-top-section">
          <img src={Circleblur} alt="" />
          <h2 className="scrollReveal">What we do at Strix Production?</h2>
          <p className="sh-top-p scrollReveal">We craft transformative digital experiences that elevate brands and captivate audiences. Your vision, realized without compromise.</p>
          <BtnNormsall className="scrollReveal" text='Know more' />
        </div>
      </div>

      <div className="service-hero saas-launch-section">
        <div className="sh-top sh-top-section">
          <img src={Circleblur} alt="" />
          <h2 className="scrollReveal">SaaS Built to Launch Fast and Grow Right</h2>
          <div className="sh-top-p saas-launch-copy scrollReveal">
            <p>Startups move quick. Products should too. SaaS platform development for startups at Strix Production focuses on building real, usable systems without delay. Work starts with a clear plan, then moves straight into design and build. No long gaps between steps. No confusion about what comes next.</p>
            <p>Separate teams often slow things down. Here, design and development happen together. That keeps the product tight and aligned. Each screen connects to a real function, not just looks. The result feels smooth when users interact with it, not just when they see it.</p>
            <p>Early-stage products often break when growth comes. The latter is prevented by establishing a good foundation at the start. SaaS platform development for startups here means clean structure, flexible systems, and room to expand without rework.</p>
            <p>Every feature has a reason. Every step supports user action and business goals. No extra layers. Just what works.</p>
            <p>Strix Production develops SaaS frameworks that remain simple, fast and scalable to enable startups to progress in a well-organized and sustainable manner.</p>
          </div>
        </div>
      </div>

      <motion.div className="sr-design" ref={designRef} style={{ y: designY }}>
        <h2 className='sr-design-h2 scrollReveal'>Design</h2>
        <p className='sr-design-p'>Crafting experiences that resonate.</p>
        <div className="sr-carousel-con">
          <div className="sr-carousel-items" {...design.containerProps}>
            <div className="sr-carousel-inner" style={{ display: "flex", transition: design.isDragging ? "none" : "transform 1s cubic-bezier(0.23, 1, 0.32, 1)", transform: isMobile ? `translateX(-${design.current * 100}%)` : `translateX(-${design.current * (100 / designSlides.length)}%)`, width: `${designSlides.length * 100}%`, willChange: "transform" }}>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / designSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={De1} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>UI/UX Design</h2><p>Beyond beautiful interfaces, we build seamless user journeys that drive engagement and conversion.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / designSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={De2} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items sr-items2"><h2>Product Design</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / designSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={De3} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Mobile app Design</h2><p>Strategically designed mobile experiences that are intuitive, beautiful, and built for your users' on-the-go lifestyle.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / designSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={De4} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Creative Design</h2><p>A team of creative visionaries delivering high-impact graphics, thumbnails, and presentations that leave a lasting impression.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / designSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={De5} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Website Design</h2><p>Bespoke websites and landing pages built to be the digital cornerstone of your business.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / designSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={De6} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Branding</h2><p>We forge powerful brand identities and comprehensive guidelines that articulate your mission and vision with clarity.</p></div></div>
            </div>
          </div>
          <div className="sr-carousel-select">
            <BtnNormsall text="Explore" />
            <div className="sr-icons"><img src={SrIcon1} alt="" /><img src={SrIcon2} alt="" /><img src={SrIcon3} alt="" /><img src={SrIcon4} alt="" /><img src={SrIcon5} alt="" /><img src={SrIcon6} alt="" /></div>
            <div className="sr-indicator">{designSlides.map((_, index) => (<span key={index} className={`dot ${design.current === index ? "active" : ""}`} onClick={() => design.goTo(index)}></span>))}</div>
            <p className="sr-carousel-select-p">We create intuitive, eye-catching designs for web, apps, and brands that stand out in a crowded digital landscape.</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="sr-design" ref={devRef} style={{ y: devY }}>
        <h2 className='sr-dev-h1'>Development</h2>
        <p className='sr-design-p'>Crafting experiences that resonate.</p>
        <div className="sr-carousel-con">
          <div className="sr-carousel-items" {...dev.containerProps}>
            <div className="sr-carousel-inner" style={{ display: "flex", transition: dev.isDragging ? "none" : "transform 1s cubic-bezier(0.23, 1, 0.32, 1)", transform: isMobile ? `translateX(-${dev.current * 100}%)` : `translateX(-${dev.current * (100 / devSlides.length)}%)`, width: `${devSlides.length * 100}%`, willChange: "transform" }}>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / devSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Dev1} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Web Applications</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / devSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Dev2} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>E-Commerce</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / devSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Dev3} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Website Development</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / devSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Dev4} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Mobile Applications</h2><p>Beyond beautiful interfaces, we build seamless user journeys that drive engagement and conversion.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / devSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Dev5} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Interactive Websites</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / devSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Dev6} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Maintenance &  Hosting</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
            </div>
          </div>
          <div className="sr-carousel-select">
            <BtnNormsall text="Explore" />
            <div className="sr-icons"><img src={Devicon1} alt="" /><img src={Devicon2} alt="" /><img src={Devicon3} alt="" /><img src={Devicon4} alt="" /><img src={Devicon5} alt="" /><img src={Devicon6} alt="" /></div>
            <div className="sr-indicator">{devSlides.map((_, index) => (<span key={index} className={`dot ${dev.current === index ? "active" : ""}`} onClick={() => dev.goTo(index)}></span>))}</div>
            <p className="sr-carousel-select-p">We create intuitive, eye-catching designs for web, apps, and brands that stand out in a crowded digital landscape.</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="sr-design" ref={proRef} style={{ y: proY }}>
        <h2 className='sr-pro-h1'>Production</h2>
        <p className='sr-design-p'>Crafting experiences that resonate.</p>
        <div className="sr-carousel-con">
          <div className="sr-carousel-items" {...pro.containerProps}>
            <div className="sr-carousel-inner" style={{ display: "flex", transition: pro.isDragging ? "none" : "transform 1s cubic-bezier(0.23, 1, 0.32, 1)", transform: isMobile ? `translateX(-${pro.current * 100}%)` : `translateX(-${pro.current * (100 / proSlides.length)}%)`, width: `${proSlides.length * 100}%`, willChange: "transform" }}>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / proSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Pro1} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>3D Animations</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / proSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Pro2} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Commercials & Promos</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / proSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Pro3} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Reels & Shorts</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / proSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Pro4} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Long Format Content</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
              <div className="sr-carousel-item" style={{ width: isMobile ? '100%' : `${100 / proSlides.length}%`, flexShrink: 0, padding: isMobile ? '0 1rem' : '0 2rem' }}><img src={Pro5} alt="" style={{ userSelect: 'none', pointerEvents: 'none' }} /><div className="sr-items"><h2>Motion Graphics</h2><p>From concept to launch, we meticulously shape digital products for unparalleled user satisfaction and business impact.</p></div></div>
            </div>
          </div>
          <div className="sr-carousel-select">
            <BtnNormsall text="Explore" />
            <div className="sr-icons"><img src={Proicon1} alt="" /><img src={Proicon2} alt="" /><img src={Proicon3} alt="" /><img src={Proicon4} alt="" /><img src={Proicon5} alt="" /></div>
            <div className="sr-indicator">{proSlides.map((_, index) => (<span key={index} className={`dot ${pro.current === index ? "active" : ""}`} onClick={() => pro.goTo(index)}></span>))}</div>
            <p className="sr-carousel-select-p">We create intuitive, eye-catching designs for web, apps, and brands that stand out in a crowded digital landscape.</p>
          </div>
        </div>
      </motion.div>

      <div className="service-hero norm-pad">
        <div className="sh-top">
          <img src={Circleblur} alt="" />
          <h2 className="sh-top-h1 strix-why scrollReveal">Why Strix Production?</h2>
          <p className="sh-top-p scrollReveal">We craft transformative digital experiences that elevate brands and captivate audiences. Your vision, realized without compromise.</p>
          <BtnNormsall text='Know more' />
        </div>
      </div>

      <div className="portfolio sr-portfolio" >
        <h2 className="section-header2 scrollReveal">Our Curated Portfolio</h2>
        <div className="cl">
          <CircleBlurAnimation className="circleblur2 circleblurtop" src={CircleBlur} />
          <Carousel />
          <div className="cl-btn">
            <ButtonSmall text="Portfolio" />
          </div>
        </div>
      </div>

      <div className="booking" >
        <img src={Blur5} className="blur-booking-left" />
        <img src={Blur6} className="blur-booking-right" />
        <h2 className="section-header2">Have  a project that <br /> deserves attention ?</h2>
        <div className="second">
          <div className="left-booking">
            <p className="leave"><span>•</span>Leave a request</p>
            <div className="right-booking right-booking2">
              <img className="right-booking-img" src={Connect} alt="" />
              <p>Let's start <br /> your project</p>
            </div>
            <p className="sr-mobile" > We'd love to be challenged by you! Feel free to share your brief with us</p>
          </div>
          <div className="right-booking">
            <img className="right-booking-img" src={Connect} alt="" />
            <p>Let's start <br /> your project</p>
          </div>
        </div>
        <Button text="Book Appointment" />
      </div>
      <Footer />
    </div>
  );
};

export default Service;

























