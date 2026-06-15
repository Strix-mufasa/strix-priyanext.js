"use client"
import React, { useState, useRef, useEffect } from "react";
import "@/app/style/home.css";
const Light = "/assets/img/bg.webp";
import Nav from "../components/Navbar";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Button from "../components/Button";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Connect = "/assets/img/connect.svg"
import SmoothScroll from "../animations/SmoothScrollGSAP";
gsap.registerPlugin(ScrollTrigger);
const Shadow1 = "/assets/img/shadow1.webp";
const Shadow2 = "/assets/img/shadow2.webp";
import CountUp from "../components/CountUp";
const Shadow3 = "/assets/img/shadow3.webp";
const VectorB = "/assets/img/b-vector.webp"
import Loop from "../components/Loop";
const Card = "/assets/img/card.webp";
const Star = "/assets/img/star.webp";
const Star2 = "/assets/img/star2.webp";
const Card2 = "/assets/img/card1.webp";
const Card3 = "/assets/img/card3.webp";
const Cloud = "/assets/img/cloud.webp";
const Cloud2 = "/assets/img/cloud2.webp";
const Bolt = "/assets/img/bolt.webp";
const Bolt2 = "/assets/img/bolt2.webp";
const CircleBlur = "/assets/img/circle-blur.webp";
const Mvp = "/assets/img/mvp.webp";
import Carousel from "../components/carousel";
const Coin = "/assets/img/coin-video.webm";
import Footer from "../components/Footer";
import TestimonialCarousel from "../components/testimonial";
const LightMobile = "/assets/img/mobile-hero.webp";
const MvpReasearch = "/assets/img/mpv-research.png"
const MvpDev = "/assets/img/mvp-dev.png"
const MvpDesign = "/assets/img/mvp-design.png"
import ButtonArrow from "../components/button-arrow";
import ButtonSmall from "../components/btn-small";
import BtnNormsall from "../components/normSmall-btn";
import DevelopmentModal from "../components/DevelopmentModal";
import DesignModal from "../components/DesignModal";
import ResearchModal from "../components/production";
import CardBtn from "../components/cardBtn";
const Shadow4 = "/assets/img/shadow4.webp"
import Link from "next/link";
import DotGrid from "../animations/DotGrid";
import ServiceSearch from "../components/ServiceSearch";
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";


// Smooth text reveal animation component
const SmoothTextReveal = ({ children, className = "", delay = 0, as = "div" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Component = motion[as];

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

// Blur text animation component
const BlurTextReveal = ({ children, className = "", as = "h2" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const Component = motion[as];

  return (
    <Component
      ref={ref}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={isInView ? {
        opacity: 1,
        filter: "blur(0px)"
      } : {
        opacity: 0,
        filter: "blur(10px)"
      }}
      transition={{
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

/// Blur-in animation component (scroll-triggered)
const ScrambleText = ({ children, className = "" }) => {
  const ref = useRef(null);
  // This hook triggers when element enters viewport
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.p
      ref={ref} // Attached to element for scroll detection
      initial={{ opacity: 0, filter: "blur(10px)" }}
      // Animation only triggers when isInView is true
      animate={isInView ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.p>
  );
};


const CircleBlurAnimation = ({ src, className = "" }) => {
  // ✅ define ref first
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
        // preserve centering
      }}
      animate={
        isInView
          ? { scale: 1, opacity: 1, x: "-50%", } // keep translate during animation
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

const Home = () => {
  const [openModal, setOpenModal] = useState(null);
  const titleRef = useRef(null);
  const subTextRef = useRef(null);
  const velocityRef = useRef(null);
  const section = useRef(null);

  const faqData = [
    {
      question: "What services does Strix Production provide?",
      answer: "Creative and technology services combine branding, design, development, and marketing to build a strong digital presence. Strix Production offers UI/UX design, web and app development, content creation, and marketing for impactful results."
    },
    {
      question: "Which are the best startup branding agencies for digital-first businesses?",
      answer: "Startup branding agencies help new businesses build a clear identity through strategy, design, and messaging. Strix Productions creates cohesive branding systems, visuals, and promotional content to help startups stand out and grow in competitive markets."
    },
    {
      question: "What are the top SaaS platform development company for scalable products?",
      answer: "SaaS platform development involves building cloud-based software accessible online without installation. Strix Production creates secure, scalable, and user-friendly SaaS solutions with strong performance, intuitive design, and reliable architecture for growing businesses."
    }, {
      question: "What makes Strix Production a reliable digital design and development partner?",
      answer: "Effective digital experiences combine strategy, user-focused design, and modern technology. Strix Production delivers scalable development, strong branding, and engaging solutions to help businesses create impactful products and drive long-term growth."
    }
  ];
  // Hero animation for title and subtitle
  useEffect(() => {
    gsap.set(titleRef.current, {
      opacity: 0,
      visibility: "hidden",
      scale: 1.2,
      letterSpacing: "140px",
      y: 100,
      filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
    });

    gsap.set(subTextRef.current, {
      opacity: 0,
      visibility: "hidden",
      y: 60,
    });

    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      opacity: 1,
      visibility: "visible",
      scale: 1,
      letterSpacing: "90px",
      y: 0,
      filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.474))",
      ease: "power4.out",
      duration: 2.5,
    });

    tl.to(
      subTextRef.current,
      {
        opacity: 1,
        visibility: "visible",
        y: 0,
        ease: "power3.out",
        duration: 1.8,
      },
      "-=0.8"
    );
  }, []);

  // MVP Card animation
  useEffect(() => {
    gsap.set(".mvp-card", { opacity: 0 });

    let mm = gsap.matchMedia();

    // Desktop animation only (scroll-based)
    mm.add("(min-width: 771px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: ".mvp-cardcon",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
        .to(".mvp-card1", {
          opacity: 1,
          x: -260,
          rotate: -18,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(
          ".mvp-card2",
          {
            opacity: 1,
            x: 0,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.9"
        )
        .to(
          ".mvp-card3",
          {
            opacity: 1,
            x: 260,
            rotate: 18,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.9"
        );
    });

    // Mobile — NO animation, show instantly
    mm.add("(max-width: 770px)", () => {
      gsap.set(".mvp-card1", { opacity: 1, x: "0", rotate: 0 });
      gsap.set(".mvp-card2", { opacity: 1, x: "0", rotate: 0 });
      gsap.set(".mvp-card3", { opacity: 1, x: "0", rotate: 0 });
    });

    return () => mm.revert();
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInSide = (direction) => ({
    hidden: { opacity: 0, x: direction === "left" ? -80 : 80 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.6 },
    },
  });

  // Card animation variants for services section
  const ServiceCard = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.div
        ref={ref}
        initial={{
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotateX: 45
        }}
        animate={isInView ? {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0
        } : {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotateX: 45
        }}
        transition={{
          duration: 1,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
          type: "spring",
          stiffness: 50,
          damping: 15
        }}
        whileHover={{
          y: -10,
          transition: { duration: 0.3 }
        }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {children}
      </motion.div>
    );
  };

  const PortfolioLink = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // detect screen width
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    return (
      <motion.p
        ref={ref}
        className="link-button"
        initial={isMobile ? false : { opacity: 0, x: -50 }}
        animate={isMobile ? false : (isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 })}
        transition={
          isMobile
            ? { duration: 0 } // disable animation entirely
            : { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] }
        }
        whileHover={
          isMobile
            ? {} // no hover animation on mobile
            : { scale: 1.05, transition: { duration: 0.2 } }
        }
      >
        {children}
      </motion.p>
    );
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Strix Production",
    "url": "https://www.strixproduction.com/",
    "logo": "https://raw.githubusercontent.com/DraeWE3/strix-sample/refs/heads/main/src/assets/img/Header%20Logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "8851313109",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "sameAs": [
      "https://www.instagram.com/strix_productions",
      "https://x.com/strixproduction"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Strix Production",
    "image": "https://raw.githubusercontent.com/DraeWE3/strix-sample/refs/heads/main/src/assets/img/Header%20Logo.png",
    "@id": "",
    "url": "https://www.strixproduction.com/",
    "telephone": "8851313109",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sec-62",
      "addressLocality": "Noida",
      "postalCode": "201309",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6229,
      "longitude": 77.3640
    },
    "sameAs": [
      "https://www.instagram.com/strix_productions",
      "https://x.com/strixproduction",
      "https://www.strixproduction.com/"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What services does Strix Production provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Creative and technology services combine branding, design, development, and marketing to build a strong digital presence. Strix Production offers UI/UX design, web and app development, content creation, and marketing for impactful results."
      }
    },{
      "@type": "Question",
      "name": "Which are the best startup branding agencies for digital-first businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Startup branding agencies help new businesses build a clear identity through strategy, design, and messaging. Strix Productions creates cohesive branding systems, visuals, and promotional content to help startups stand out and grow in competitive markets."
      }
    },{
      "@type": "Question",
      "name": "What are the top SaaS platform development company for scalable products?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SaaS platform development involves building cloud-based software accessible online without installation. Strix Production creates secure, scalable, and user-friendly SaaS solutions with strong performance, intuitive design, and reliable architecture for growing businesses."
      }
    },{
      "@type": "Question",
      "name": "What makes Strix Production a reliable digital design and development partner?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Effective digital experiences combine strategy, user-focused design, and modern technology. Strix Production delivers scalable development, strong branding, and engaging solutions to help businesses create impactful products and drive long-term growth."
      }
    }]
  };

  return (
    <>
      <SEO
        title="End-to-End SaaS Development Company"
        description="End-to-end SaaS development company delivering full-cycle solutions from concept to launch, helping startups and businesses build scalable, high-performance platforms."
        schemas={[organizationSchema, localBusinessSchema, faqSchema]}
      />
      <Nav />

      {/* <SmoothScroll 
      intensity={1}      // Scroll distance multiplier
      ease={1}           // Lower = smoother, higher = snappier
      skew={1}             // Skew amount during scroll
      enableSkew={true}    // Toggle skew effect
      mobile={true}        // Enable on mobile devices
    > */}


      <div className="app" id="smooth-wrapper" ref={section} style={{ position: "relative" }}>
        <DotGrid
          dotSize={2}
          gap={24}
          activeColor="#ffffff"
        />


        {/* =============hero section============== */}
        <div className="hero sectionCon smoothsection">
          <h1 className="spread-h1" ref={titleRef}>STRIX</h1>
          <p className="spread-txt" ref={subTextRef}>Where Creative Strategy Meets Scalable Technology</p>
          <div className="half-circle-container">
            <svg className="half-circle-svg" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="halfCircleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: "#f8f8f8", stopOpacity: 0.95 }} />
                  <stop offset="100%" style={{ stopColor: "#ffffff", stopOpacity: 0.9 }} />
                </linearGradient>
              </defs>
              <path className="half-circle-path" d="M 50 0 A 150 150 0 0 0 350 0" />
            </svg>
          </div>
          <img src={Light} alt="" className="underlay" />
          <img src={LightMobile} alt="" className="underlay-mobile" />

          <motion.div
            className="explore explore-mobile relative overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="section-container2" variants={itemVariants}>
              <ServiceSearch variants={itemVariants} />
            </motion.div>

            <motion.h2 className="power-desk" variants={itemVariants}>
              Powering Brands with Design & Technology
            </motion.h2>
            <motion.p className="power-mobile" variants={itemVariants}>
              Powering Brands with Design & Technology
            </motion.p>

            <motion.div className="section-container" variants={itemVariants}>
              <ServiceSearch variants={itemVariants} />
            </motion.div>

            <motion.div className="button-p flex gap-4 mt-6" variants={itemVariants}>

              <Link href='/contact'><ButtonArrow text="Get Started" /></Link>
              <Link href='/cs'><Button text="Explore Work" /></Link>

            </motion.div>

            <motion.img
              src={Shadow1}
              alt=""
              className="shadow1 absolute top-10 left-0 w-40"
              variants={fadeInSide("right")}
            />
            <motion.img
              src={Shadow2}
              alt=""
              className="shadow2 absolute bottom-0 right-0 w-40"
              variants={fadeInSide("left")}
            />
          </motion.div>
        </div>


        {/* =============section 2============== */}
        <div className="smoothsection sectionCon explore relative overflow-hidden explore-desk">
          <div className="section-container2">
            <ServiceSearch isMotion={false} />
          </div>

          <h2 className="power-desk section-header">Powering Brands with Design & Technology</h2>
          <p className="power-mobile">Powering Brands with Design & Technology</p>

          <div className="section-container">
            <ServiceSearch isMotion={false} />
          </div>

          <div className="button-p flex gap-4 mt-6">
            <ButtonArrow text="Get Started" />
            <Button text="Explore Work" />
          </div>
          <img
            src={Shadow1}
            alt=""
            className="shadow1 absolute top-10 left-0 w-40"
          />
          <img
            src={Shadow2}
            alt=""
            className="shadow2 absolute bottom-0 right-0 w-40"
          />
        </div>

        {/* =============section 3============== */}
        <div className="smoothsection motion sectionCon">
          <img src={Shadow3} alt="" className="shadow3" />
          <img src={VectorB} alt="" className="Vector1" />

          <SmoothTextReveal as="h2" className="section-header2 delay1">Real Work. Real Results</SmoothTextReveal>

          <div className="number-container">
            <img src={Shadow4} className="shadow4" alt="" />
            <div className="num1 delay2">
              <div>
                <CountUp
                  from={10}
                  to={20}
                  separator=","
                  direction="up"
                  duration={2}
                  className="count-up-text"
                />
                <span>+</span>
              </div>
              <p>Conversions</p>
            </div>

            <div className="num1">
              <div>
                <CountUp
                  from={200}
                  to={220}
                  separator=","
                  direction="up"
                  duration={2}
                  className="count-up-text"
                />
                <span>+</span>
              </div>
              <p>Projects</p>
            </div>

            <div className="num1">
              <div>
                <CountUp
                  from={80}
                  to={90}
                  separator=","
                  direction="up"
                  duration={2}
                  className="count-up-text"
                />
                <span>%</span>
              </div>
              <p>Client-Retention</p>
            </div>

            <div className="num1">
              <div>
                <h2 className="count-up-text">∞</h2>
              </div>
              <p>Potential</p>
            </div>
          </div>

          <SmoothTextReveal as="p" className="motion-p p-up" delay={0.2}>
            Trusted by brands that demand Excellence - we deliver creative-tech
            solutions that don't just look good, they perform where it matters
          </SmoothTextReveal>
          <Link href="/cs">
            <Button text="Explore Cases" />
          </Link>

        </div>


        {/* =============section 4============== */}
        <div className="smoothsection logo-loop sectionCon">
          <Loop />
        </div>



        {/* =============section 5============== */}
        <div className="smoothsection services circcon sectionCon">
          <SmoothTextReveal as="h2" className="section-header delay3 ">
            We Build Experiences that Breathe
          </SmoothTextReveal>

          <CircleBlurAnimation className="circleblur circleblurtop" src={CircleBlur} />


          <div ref={velocityRef} className="altcard flex gap-8 justify-center">
            <ServiceCard delay={0}>
              <div className="card-con card-con1">
                <img src={Card} alt="" className="card-img" />
                <img src={Star} alt="" className="card-icon" />
                <img src={Star2} alt="" className="card-icon2" />
                <div className="card-content">
                  <h2>Design</h2>
                  <p className="card-content-p">Crafted to Captivate</p>
                  <div className="btn-con">
                    <CardBtn onClick={() => setOpenModal("design")} text="Know more" />
                  </div>
                </div>
                <div className="glow"></div>
              </div>
            </ServiceCard>

            <ServiceCard delay={0.2}>
              <div className="card-con card-con2">
                <img src={Card2} alt="" className="card-img" />
                <img src={Cloud} alt="" className="card-icon" />
                <img src={Cloud2} alt="" className="card-icon2" />
                <div className="card-content">
                  <h2>Development</h2>
                  <p className="card-content-p">Engineered for Performance</p>
                  <div className="btn-con">
                    <CardBtn onClick={() => setOpenModal("dev")} text="Know more" />
                  </div>
                </div>
                <div className="glow glow2"></div>
              </div>
            </ServiceCard>

            <ServiceCard delay={0.4}>
              <div className="card-con">
                <img src={Card3} alt="" className="card-img" />
                <img src={Bolt} alt="" className="card-icon" />
                <img src={Bolt2} alt="" className="card-icon2" />
                <div className="card-content">
                  <h2>Production</h2>
                  <p className="card-content-p">Elevate your content</p>
                  <div className="btn-con">
                    <CardBtn onClick={() => setOpenModal("research")} text="Know more" />
                  </div>
                </div>
                <div className="glow glow3"></div>
              </div>
            </ServiceCard>
          </div>

          <DevelopmentModal isOpen={openModal === "dev"} onClose={() => setOpenModal(null)} />
          <DesignModal isOpen={openModal === "design"} onClose={() => setOpenModal(null)} />
          <ResearchModal isOpen={openModal === "research"} onClose={() => setOpenModal(null)} />

          <SmoothTextReveal as="p" className="services-p p-up" delay={0.3}>
            From visuals that speak to systems that scale - We deliver
            end-to-end solutions that define, design, and develop your brand's
            digital presence
          </SmoothTextReveal>
          <Link href="/cs">
            <Button text="Our Services" />
          </Link>

        </div>



        {/* =============section 6============== */}
        <div className="smoothsection sectionCon services services-mvp">
          <SmoothTextReveal as="h2" className="section-header delay3">From Idea to Market in 4 Weeks</SmoothTextReveal>
          <div className="mvp-cardcon mvp-desk">
            <img
              src={Shadow1}
              alt=""
              className="shadow1 shdowsmall absolute top-10 left-0 w-40"
            />
            <img
              src={Shadow2}
              alt=""
              className="shadow2 mpv-shad shdowsmall absolute bottom-0 right-0 w-40"
            />

            <div className="mvp-card mvp-card1 ">
              <img className="mvp-img" src={Mvp} alt="" />
              <img className="mvp-img-ab" src={MvpDev} alt="" />
              <div className="mvp-content">
                <h2>
                  MVP <br /> Research
                </h2>
                <div className="btn-con2">
                  <p className="mvp-ptxt">Shape your concept into a roadmap</p>
                  <Link href="/cs">
                    <CardBtn text="Know more" />
                  </Link>

                </div>
              </div>
            </div>

            <div className="mvp-card mvp-card2">
              <img className="mvp-img" src={Mvp} alt="" />
              <img className="mvp-img-ab" src={MvpDesign} alt="" />
              <div className="mvp-content">
                <h2>
                  MVP <br /> Design
                </h2>
                <div className="btn-con2">
                  <p className="mvp-ptxt">Create intuitive flows, protoypes & More</p>

                  <Link href="/cs">
                    <CardBtn text="Know more" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="mvp-card mvp-card3">
              <img className="mvp-img" src={Mvp} alt="" />
              <img className="mvp-img-ab" src={MvpReasearch} alt="" />
              <div className="mvp-content">
                <h2>
                  MVP <br /> Development
                </h2>
                <div className="btn-con2">
                  <p className="mvp-ptxt">Full-stack, scalable builds</p>

                  <Link href="/cs">
                    <CardBtn text="Know more" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <SmoothTextReveal as="p" className="services-p p-up" delay={0.2}>
            We don't just design and develop - we help founders validate and
            launch market-ready MVPs with speed, clarity, and impact.
          </SmoothTextReveal>
          <ButtonSmall text="Build MVP" />
        </div>
        

        {/* =============Our Successful MVPs============== */}
<div className="smoothsection sectionCon mvp-success">
  <SmoothTextReveal as="h2" className="section-header delay3">
    Our Successful MVPs
  </SmoothTextReveal>

  {/* Card 1 - Kundli Pro */}
  <div className="mvp-success-card">
    <div className="mvp-success-left">
      <img src="/assets/img/Astra.png" alt="Kundli Pro" className="mvp-success-logo" />
      <p className="mvp-success-desc">
        The Kundli Pro is a Vedic astrology software used to create detailed 
        birth charts, predict future events, and analyze horoscopes.
      </p>
      <div className="mvp-success-stats">
        <div>
          <h3>50k + Downloads</h3>
        </div>
        <div>
          <h3>4.0 ⭐ Ratings</h3>
        </div>
      </div>
      {/* <div className="mvp-success-btns">
        <button className="mvp-play-btn">🎮 Google Play Store</button>
        <button className="mvp-review-btn">100+ User Reviews</button>
      </div> */}
    </div>
    <div className="mvp-success-right">
      <img src="/assets/img/kundaliHome.jpg" alt="Kundli App" className="mvp-success-img" />
      <Link href="/cs" className="mvp-case-btn">View Case Study →</Link>
      <p className="mvp-tag">• Mobile MVP</p>
    </div>
  </div>

  {/* Card 2 - Ryvon AI */}
  <div className="mvp-success-card">
    <div className="mvp-success-left">
      <img src="/assets/img/RyvonLogo.png" alt="Ryvon AI" className="mvp-success-logo" />
      <p className="mvp-success-desc">
        <strong>Ryvon</strong> is one platform for document chat, audio 
        transcription, and workflow automation.
      </p>
      <div className="mvp-success-stats">
        <div>
          <h3>&lt;3 Weeks</h3>
          <p>From Idea to launch ready</p>
        </div>
        <div>
          <h3>$1M+</h3>
          <p>Pre-seed Valuation</p>
        </div>
      </div>
    </div>
    <div className="mvp-success-right">
      <img src="/assets/img/RyvonHome.png" alt="Ryvon AI" className="mvp-success-img" />
      <Link href="/cs" className="mvp-case-btn">
        View Case Study →
      </Link>
      <p className="mvp-tag">• AI SaaS Platform</p>
    </div>
  </div>

  <Link href="/cs" className="mvp-explore-btn">Explore Cases</Link>
</div>

        {/* =============section 6.5============== */}
        <div className="smoothsection sectionCon services saas-growth-section">
          <SmoothTextReveal as="h2" className="section-header delay3">
            SaaS That Starts Strong and Keeps Growing
          </SmoothTextReveal>
          <SmoothTextReveal as="p" className="services-p p-up">
            Strix Production works as an end-to-end SaaS development company that brings design, development, and production into one smooth flow. Work does not pass between separate teams. It moves together, step by step, which keeps the product clear and consistent from the start.
          </SmoothTextReveal>
          <SmoothTextReveal as="p" className="services-p p-up" delay={0.2}>
            The approach stays practical. Every SaaS product is not only launched but also developed to grow. This prevents repudiation in the future and it makes the business progress without wasting time.
            Every product begins with a strong base. The interface is simple and easy to use. The backend stays stable and ready for more users. Each feature connects well, so nothing feels out of place.
          </SmoothTextReveal>
          <SmoothTextReveal as="p" className="services-p p-up" delay={0.4}>
            Speed is part of the process, but stability comes first. The system is built to handle growth, which means fewer problems as the product expands. Many platforms look good but fail during daily use. That gap is reduced by testing early and building with real users in mind. Small changes happen during development, not after launch.
          </SmoothTextReveal>
          <SmoothTextReveal as="p" className="services-p p-up" delay={0.6}>
            Each part works as one system, which keeps the product reliable and easy to manage. This end-to-end SaaS development company keeps work clear, steady, and focused on results that last.
            Strix Production builds SaaS that runs clean, grows steady, and stays useful over time, shaped by real work, simple thinking, and a system that holds together.
            </SmoothTextReveal>


        </div>


        {/* =============section 7============== */}
        <section className="smoothsection sectionCon services service-pro relative">
          <SmoothTextReveal as="h2" className="bold-head delay3">Strix Production</SmoothTextReveal>

          <div className="coin-con flex justify-center items-center">
            <video
              className="coin-anime"
              src={Coin}
              playsInline
              muted
              autoPlay
              loop
            ></video>
          </div>

          <SmoothTextReveal as="p" className="services-p p-up" delay={0.2}>
            Not just another agency — Strix combines design, development,
            production, and MVP expertise to help brands and startups scale faster.
          </SmoothTextReveal>

          <BtnNormsall text="About us" />

          <img
            src={Shadow1}
            alt=""
            className="shadow1 absolute top-10 left-0 w-40"
          />
          <img
            src={Shadow2}
            alt=""
            className="shadow2 absolute bottom-0 right-0 w-40"
          />
        </section>



        {/* =============section 8============== */}
        <div className="smoothsection zle circcon portfolio relative">
          <img
            src={Shadow1}
            alt=""
            className="shadow1 shadowmed absolute top-10 left-0 w-40"
          />
          <img
            src={Shadow2}
            alt=""
            className="shadow2 shadowmed absolute bottom-0 right-0 w-40"
          />

          <SmoothTextReveal as="h2" className="section-header2 delay3">Our Craft, Your Expression.</SmoothTextReveal>

          <div className="links">
            <PortfolioLink delay={0}>Branding</PortfolioLink>
            <PortfolioLink delay={0.1}>Websites</PortfolioLink>
            <PortfolioLink delay={0.2}>All</PortfolioLink>
            <PortfolioLink delay={0.3}>UI/UX</PortfolioLink>
            <PortfolioLink delay={0.4}>Media</PortfolioLink>
          </div>

          <div className="cl relative flex flex-col items-center justify-center">
            <CircleBlurAnimation className="circleblur2 circleblurtop" src={CircleBlur} />

            <Carousel />
            <div className="cl-btn mt-10">
              <Link href="/cs">
                <ButtonSmall text="Portfolio" />
              </Link>

            </div>
          </div>
        </div>



        {/* =============section 10============== */}
        <div className="sectionCon testimonial-con">
          <SmoothTextReveal as="h2" className="section-header2 delay2">
            What our clients say
          </SmoothTextReveal>
          <SmoothTextReveal as="p" className="text-pp delay3" delay={0.2}>
            Real stories from the brands and people we've helped grow, design,
            and stand out
          </SmoothTextReveal>
          <TestimonialCarousel />
        </div>



        {/* =============section 10============== */}
        <div className="zle booking delay3">
          <BlurTextReveal >
            Turn Your Idea Into a <br /> Market-Ready MVP That Lasts
          </BlurTextReveal>
          <div className="second">
            <div className="left-booking">
              <p className="leave">
                <span>•</span>Leave a request
              </p>

              <Link href='/contact'>
                <div className="right-booking right-booking2">
                  <img className="right-booking-img" src={Connect} alt="" />
                  <p>
                    Let's start <br /> your project
                  </p>
                </div>
              </Link>
              <ScrambleText className="sr-mobile">
                We'd love to be challenged by you! Feel free to share your brief with us
              </ScrambleText>
            </div>
            <Link href='/contact'>
              <div className="right-booking">
                <img className="right-booking-img" src={Connect} alt="" />
                <p>
                  Let's start <br /> your project
                </p>
              </div>
            </Link>
          </div>
          <a target="_blank" href="https://calendly.com/strixmufasa/30min">
            <Button text="Book Appointment" />
          </a>
        </div>

        {/* =============section 11 FAQ ============== */}
        <div className="smoothsection sectionCon faq-section">
          <FAQ
            faqData={faqData}
            title="Frequently Asked Questions"
            subtitle="Everything you need to know"
          />
        </div>
      </div>

      <Footer />
      {/* </SmoothScroll> */}
    </>
  );
};

export default Home;

























