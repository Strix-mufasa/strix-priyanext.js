"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from '../../components/Navbar'
const Circleblur = "/assets/img/sr-img.webp"
const Connect = "/assets/img/connect.svg"
import BtnNormsall from '../../components/normSmall-btn';
import Footer from '../../components/Footer'
const Blur1 = "/assets/img/p-blur2.png"
const Blur2 = "/assets/img/p-blur1.png"
const Blur3 = "/assets/img/Ellipse 7.png"
const BookTxt = "/assets/img/Book-txt.png"
const Blur4 = "/assets/img/Ellipse 8.png"
const Kundali = "/assets/img/kundali-case-study.webp"
import { Play } from 'lucide-react';
const Circle = "/assets/img/updown-circle.webp"
import '@/app/style/uiux.css'
import Link from 'next/link'
const CardImg = "/assets/img/ui-card.webp"
const Cardcon1 = "/assets/img/ui-card1.png"
const Cardcon2 = "/assets/img/ui-card2.png"
import ProjectCarousel from "../../components/projectCarouel";
import Button from "../../components/Button";
const ProjectCircle = "/assets/img/project-circle.webp"
const HeroImg = "/assets/img/serv.webp"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotGrid from "../../animations/DotGrid";
import RotateCardsScroll from '../../animations/RotateCardsScroll'
import ScrollSlideAnimations from '../../animations/slideins'
import Stagger from '../../animations/stagger'
import ScrollAnimation from '../../animations/scrollReveal'
import SlideInFramerOnLoad from '../../animations/SlideInFramerOnLoad'
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../../components/SEO'
import FAQ from "../../components/FAQ";


gsap.registerPlugin(ScrollTrigger);

const Product = () => {
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
  const faqData = [ 
    {
      question: "What product development services does Strix Production provide?",
      answer: "End-to-end product development helps startups turn ideas into functional products through strategy, design, prototyping, and development. Strix Production delivers scalable solutions, guiding businesses from concept to launch with strong performance."
    },
    {
      question: "How does product design and development help startups launch faster?",
      answer: "Product design and development help startups validate ideas, build prototypes, and create scalable solutions. Strix Production offers UI/UX design, prototyping, and agile development to deliver products aligned with market needs."
    },
    {
      question: "Why should startups invest in digital product development services?",
      answer: "Digital product development services turn ideas into market-ready platforms using design, engineering, and strategy. Strix Production delivers user-focused, scalable solutions with strong performance to support long-term growth."
     },
     {
      question: "What makes a reliable product development company for startups?",
      answer: "A product development company builds innovative digital solutions using strategy, design, and engineering. Strix Production helps startups create scalable products with strong architecture, user-focused design, and growth-driven development."
     }

  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "What product development services does Strix Production provide?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "End-to-end product development helps startups turn ideas into functional products through strategy, design, prototyping, and development. Strix Production delivers scalable solutions, guiding businesses from concept to launch with strong performance."
      }
    },{
      "@type": "Question",
      "name": "How does product design and development help startups launch faster?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Product design and development help startups validate ideas, build prototypes, and create scalable solutions. Strix Production offers UI/UX design, prototyping, and agile development to deliver products aligned with market needs."
      }
    },{
      "@type": "Question",
      "name": "Why should startups invest in digital product development services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Digital product development services turn ideas into market-ready platforms using design, engineering, and strategy. Strix Production delivers user-focused, scalable solutions with strong performance to support long-term growth."
      }
    },{
      "@type": "Question",
      "name": "What makes a reliable product development company for startups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A product development company builds innovative digital solutions using strategy, design, and engineering. Strix Production helps startups create scalable products with strong architecture, user-focused design, and growth-driven development."
      }
    }]
  };

  return (
    <div>
      <SEO
        title="Custom SaaS Product Development Company | SaaS Product Design Agency"
        description="Custom SaaS product development company and SaaS product design agency delivering innovative, scalable solutions to bring your software ideas to life."
        schema={faqSchema}
      />
      <Nav />
      <SlideInFramerOnLoad />
      {/* <ScrollAnimation /> */}
      <RotateCardsScroll />
      <ScrollSlideAnimations />
      <Stagger />
      {/* DotGrid removed */}




      {/* =============== service-hero ============ */}
      <div className="service-hero">
        <div className="returnNext" >
          <Link href='/service'><button className="back-button">
            <ArrowLeft size={16} /> Return to Service
          </button></Link>

          <Link href='/cdesign'><button className="back-button">
            Next Service <ArrowRight size={16} />
          </button></Link>
        </div>
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h1 className="slideinLoad">Product design</h1>
        </div>

        <div className="case-box-con uiu-con">
          <img src={Blur3} className="blur3-hero-left" alt="" />
          <img src={Blur4} className="blur3-hero-right" alt="" />
          <div
            ref={videoexRef}
            style={{
              width: '78vw',
              height: '90vh'
            }}
            className="video-card-container">
            {!isPlaying ? (
              <div className="video-thumbnail">
                <img
                  src={HeroImg}
                  alt="Video thumbnail"
                  className="thumbnail-image"
                />
                <div className="play-button-overlay">
                  <h2 className="sr-watch viewwork2">View work</h2>

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
        <p className="ui-hero-p scrollReveal">We craft end-to-end product designs that bring bold ideas to life - balancing aesthetics, usability, and functionality for market-ready impact.</p>
        <img src={Blur1} className='p-blur1' alt="" />
        <img src={Blur2} className='p-blur2' alt="" />
      </div>

      {/* =================provide=========== */}
      <div className="provide-con">
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h2 className="scrollReveal">What we provide</h2>
        </div>

        <div className="provide-grid">
          <div className="provide-card p-sec2-card1">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img src={Cardcon1} alt="" />
                <p>Build your on MVP</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card2">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img className="top-card-con1" src={Cardcon2} alt="" />
                <p>Hardware + Digital Interfaces</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card1">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img src={Cardcon1} alt="" />
                <p>Product Concept Development</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card2">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img src={Cardcon1} alt="" />
                <p>Interactive product mockup</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>


        </div>
      </div>

      {/* ===================launch-fast================== */}
      <div className="product-launch-section">
        <div className="sh-top uiux-hero product-launch-hero">
          <img src={Circleblur} alt="" />
          <h2 className="scrollReveal">Products That Launch Fast and Scale Clean</h2>
          <div className="product-launch-copy scrollReveal">
            <p>Strix Production works as a custom SaaS product development company that connects design, code, and production in one flow. No handoff gaps. No mixed direction. Work moves straight from idea to build with the same team.</p>
            <p>As an MVP product development company, the goal is simple. Launch early. Test fast. Improve with real data. Only core features go first. This keeps time short and costs under control while the product starts getting users.</p>
            <p>A focused SaaS product design agency approach shapes every screen. Clear paths, clean layouts, easy actions. It is what users know how to do without giving it much thought. That maintains the drop-offs and the engagement at a steady level.</p>
            <p>Products are built to scale from the start. Strong structure. Flexible code. Adding features later does not break the system. No need to rebuild when growth comes.</p>
            <p>Everything stays aligned. Strategy, design, and development move together. Faster output. Better results. Less confusion at every step.</p>
            <p>Strix Production builds digital products that start simple, grow steady, and stay strong, shaped by real work, clear thinking, and a team that builds with purpose.</p>
          </div>
        </div>
      </div>

      {/* ===================why================== */}
      <div className="sh-top uiux-hero what-con">
        <img src={Circleblur} alt="" />
        <h2 className="scrollReveal">Why Choose us ?</h2>
        <p className="p-inde scrollReveal">Our UI/UX practice combines research, strategy, and sleek execution — helping startups and enterprises create designs that actually perform.</p>
      </div>

      <div className='project-carousel-con'>
        <CircleBlurAnimation className="ProjectCircle" src={ProjectCircle} />
        <h2>Related Projects</h2>
        <ProjectCarousel serviceFilter="App Design" />
      </div>
      <div className="uiuxproinfo">
        <p>Projects tailored to your industry or need are available on request.</p>
        <BtnNormsall className="scrollReveal" text='Know more' />
      </div>

      {/* ==================booking====================== */}
      <div className="booking" >
        <h2 className='delay2'>Turn Your Vision Into an Experience That Lasts</h2>
        <div className="logo-slider logo-slider2">
          <div className="logo-track logo-track2">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <img src={BookTxt} alt="" className="loop-img" />
                <img src={BookTxt} alt="" className="loop-img" />
                <img src={BookTxt} alt="" className="loop-img" />
                <img src={BookTxt} alt="" className="loop-img" />
                <img src={BookTxt} alt="" className="loop-img" />
                <img src={BookTxt} alt="" className="loop-img" />
              </React.Fragment>
            ))}
          </div>
        </div>
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

export default Product


























