"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from '@/components/Navbar'
import SEO from '@/components/SEO'
import Image from "next/image";
import BtnNormsall from '@/components/normSmall-btn';
import Footer from '@/components/Footer'
import { Play } from 'lucide-react';
import '@/app/style/uiux.css'
import ProjectCarousel from "@/components/projectCarouel";
import Button from "@/components/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotGrid from "@/animations/DotGrid";
import RotateCardsScroll from '@/animations/RotateCardsScroll'
import ScrollSlideAnimations from '@/animations/slideins'
import Stagger from '@/animations/stagger'
import ScrollAnimation from '@/animations/scrollReveal'
import SlideInFramerOnLoad from '@/animations/SlideInFramerOnLoad'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link'
import FAQ from "@/components/FAQ";
import NumbersSection from '@/components/NumbersSection';
import WhyChooseUs from '@/components/WhyChooseUs';

gsap.registerPlugin(ScrollTrigger);

const Uiux = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoexRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true);
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

  const CircleBlurAnimation = ({ src, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
      <motion.img
        ref={ref}
        src={src}
        className={className}
        initial={{ scale: 0.7, opacity: 0, x: "-50%" }}
        animate={isInView ? { scale: 1, opacity: 1, x: "-50%" } : { x: "-50%" }}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: "absolute", left: "50%", transformOrigin: "center center" }}
      />
    );
  };

  const faqData = [
    {
      question: "What are the leading UI/UX design companies for digital products?",
      answer: "UI/UX design companies create user-friendly interfaces and seamless digital experiences for web and mobile apps. Strix Production delivers intuitive, user-focused design solutions that improve usability, boost engagement, and drive better conversions."
    },
    {
      question: "Why should startups hire UI/UX design agencies for startups?",
      answer: "UI/UX design agencies help startups create engaging digital products with intuitive navigation and clear user flows. Strix Production delivers user-focused designs that attract users, enhance experience, and support growth and long-term customer retention."
    },
    {
      question: "What benefits do custom UI/UX design services offer SaaS and mobile apps?",
      answer: "Custom UI/UX design services help businesses create user experiences that match their brand and user needs. Strix Production delivers tailored user flows, responsive interfaces, and design systems for SaaS platforms and mobile apps."
    },
    {
      question: "How do UI/UX design services for web and app startups in Delhi impact user satisfaction?",
      answer: "UI/UX design services for startups focus on usability, engagement, and smooth user interactions. Strix Production creates intuitive, responsive designs for web and app startups, helping improve conversions, user experience, and overall business growth."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": { "@type": "Answer", "text": answer }
    }))
  };

  return (
    <div>
      <SEO
        title="UI/UX Design Services for Web & Mobile Apps"
        description="Strix crafts intuitive and visually compelling UI/UX designs for web and mobile apps, helping businesses improve usability, user retention, and digital impact."
        canonical="https://www.strixproduction.com/uiux"
        schema={faqSchema}
      />
      <Nav />

      {/* =============== service-hero ============ */}
      <div className="service-hero">
        <div className="returnNext">
          <Link href='/service'>
            <button className="back-button">
              <ArrowLeft size={16} /> Return to Service
            </button>
          </Link>
          <Link href='/webdesign'>
            <button className="back-button">
              Next Service <ArrowRight size={16} />
            </button>
          </Link>
        </div>

        <div className="sh-top uiux-hero">
          <img src="/assets/img/sr-img.webp" alt="Design background blur" />
          <h1 className="slideinLoad">UI/UX design</h1>
        </div>

        <div className="case-box-con uiu-con">
          <img src="/assets/img/Ellipse 7.png" className="blur3-hero-left" alt="" />
          <img src="/assets/img/Ellipse 8.png" className="blur3-hero-right" alt="" />
          <div
            ref={videoexRef}
            style={{ width: '78vw', height: '90vh' }}
            className="video-card-container"
          >
            {!isPlaying ? (
              <div className="video-thumbnail">
                <img src="/assets/img/serv.webp" alt="Video thumbnail" className="thumbnail-image" />
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
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/zk0mGoyUrLo?autoplay=1"
                  title="Video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <p className="ui-hero-p scrollReveal">From concept to launch, we design products that captivate users and elevate businesses.</p>
        <img src="/assets/img/p-blur2.png" className='p-blur1' alt="" />
        <img src="/assets/img/p-blur1.png" className='p-blur2' alt="" />
      </div>

      {/* =================provide=========== */}
      <div className="provide-con">
        <div className="sh-top uiux-hero">
          <img src="/assets/img/sr-img.webp" alt="" />
          <h2 className="scrollReveal">What we provide</h2>
        </div>

        <div className="provide-grid">
          {[
            { img: "/assets/img/ui1.png", label: "SaaS Interfaces", className: "ui1" },
            { img: "/assets/img/ui2.png", label: "Dashboards", className: "top-card-con1" },
            { img: "/assets/img/ui3.png", label: "Enterprise Applications", className: "ui1" },
            { img: "/assets/img/ui4.png", label: "User Flows & Wireframes", className: "ui1" },
          ].map(({ img, label, className }, i) => (
            <div key={i} className={`provide-card ${i % 2 === 0 ? 'p-sec2-card1' : 'p-sec2-card2'}`}>
              <div className="p-top-card">
                <img src="/assets/img/ui-card.webp" alt="" />
                <div className="top-card-con">
                  <img className={className} src={img} alt={label} />
                  <p>{label}</p>
                </div>
              </div>
              <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
              <BtnNormsall text="View Work" to="/contact" />
            </div>
          ))}
        </div>
      </div>
      <NumbersSection />
      
      {/* ===================why================== */}
      <div className="sh-top uiux-hero what-con" style={{ marginBottom: 0, paddingBottom: 0 }}>
        <img src="/assets/img/sr-img.webp" alt="" />
        <h2 className="scrollReveal">Why Choose us ?</h2>
        <p className="p-inde scrollReveal">Our UI/UX practice combines research, strategy, and sleek execution — helping startups and enterprises create designs that actually perform.</p>
        
      </div>
      <WhyChooseUs />
      <div style={{ marginTop: '100px' }}>  
      <div className='project-carousel-con'>
        <CircleBlurAnimation style={{ position: "absolute", left: "50%", transformOrigin: "center center", zIndex: 0 }} className="ProjectCircle" src="/assets/img/project-circle.webp" />
        <h2 style={{ position: 'relative', zIndex: 10, color: '#000' }}>Related Projects</h2>
        <ProjectCarousel serviceFilter="UI/UX" />
      </div>
      </div>

      {/* ==================booking====================== */}
      <div className="booking">
        <h2 className="section-header2">
          Have a project that <br /> deserves attention ?
        </h2>
        <div className="second">
          <div className="left-booking slideInLeft">
            <p className="leave">
              <span>•</span>Leave a request
            </p>
            <div className="right-booking right-booking2">
              <img className="right-booking-img" src="/assets/img/connect.svg" alt="" />
              <p>Let's start <br /> your project</p>
            </div>
            <p className="sr-mobile">We'd love to be challenged by you! Feel free to share your brief with us</p>
          </div>
          <div className="right-booking slideInRight">
            <img className="right-booking-img" src="/assets/img/connect.svg" alt="" />
            <p>Let's start <br /> your project</p>
          </div>
        </div>
        <Button text="Book Appointment" />
      </div>

      <div className="smoothsection sectionCon faq-section">
        <FAQ
          faqData={faqData}
          title="Frequently Asked Questions"
          subtitle="Everything you need to know"
        />
      </div>

      <Footer />
    </div>
  )
}

export default Uiux


