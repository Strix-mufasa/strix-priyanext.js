"use client"
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Nav from '../../components/Navbar'
const Circleblur = "/assets/img/sr-img.webp"
import BtnNormsall from '../../components/normSmall-btn';
import Footer from '../../components/Footer'
const Blur1 = "/assets/img/p-blur2.png"
const Blur2 = "/assets/img/p-blur1.png"
const Blur3 = "/assets/img/Ellipse 7.png"
const BookTxt = "/assets/img/Book-txt.png"
const Blur4 = "/assets/img/Ellipse 8.png"
import { Play } from 'lucide-react';
import '@/app/style/uiux.css'
import Link from 'next/link'
const CardImg = "/assets/img/ui-card.webp"
const Cardcon1 = "/assets/img/appdesign1.png"
const Cardcon2 = "/assets/img/appdesign2.png"
const Cardcon3 = "/assets/img/appdesign3.png"
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


gsap.registerPlugin(ScrollTrigger);

const AppDesign = () => {
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

  return (
    <div>
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

          <Link href='/product'><button className="back-button">
            Next Service <ArrowRight size={16} />
          </button></Link>
        </div>
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h1 className="slideinLoad">Application Designs</h1>
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
                  <button
                    onClick={handlePlay}
                    className="play-button-sr"
                    aria-label="Play video"
                  >
                    <h1 className="sr-watch viewwork">Watch showreel</h1>
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
        <p className="ui-hero-p scrollReveal">Designing mobile & tablet experiences that feel intuitive, engaging, and conversion-ready — built for iOS, Android, and cross-platform success.</p>
        <img src={Blur1} className='p-blur1' alt="" />
        <img src={Blur2} className='p-blur2' alt="" />
      </div>

      {/* =================provide=========== */}
      <div className="provide-con">
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h1 className="scrollReveal">What we provide</h1>
        </div>

        <div className="provide-grid">
          <div className="provide-card p-sec2-card1">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img src={Cardcon1} alt="" />
                <p>iOS & Android Interfaces</p>
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
                <p>iOS App Development</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card1">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img className="ui1" src={Cardcon3} alt="" />
                <p>Cross Platform App</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>
        </div>
      </div>

      {/* ===================why================== */}
      <div className="sh-top uiux-hero what-con">
        <img src={Circleblur} alt="" />
        <h1 className="scrollReveal">Why Choose us ?</h1>
        <p className="p-inde scrollReveal">Our UI/UX practice combines research, strategy, and sleek execution — helping startups and enterprises create designs that actually perform.</p>
      </div>

      <div className='project-carousel-con'>
        <CircleBlurAnimation className="ProjectCircle" src={ProjectCircle} />
        <h1>Related Projects</h1>
        <ProjectCarousel serviceFilter="App Design" />
      </div>
      <div className="uiuxproinfo">
        <p>Projects tailored to your industry or need are available on request.</p>
        <BtnNormsall className="scrollReveal" text='Know more' />
      </div>

      {/* ==================booking====================== */}
      <div className="booking" >
        <h1 className='delay2'>Join 100+ Experts Taking Their Brand to the Next Level</h1>
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

      <Footer />
    </div>
  )
}

export default AppDesign


























