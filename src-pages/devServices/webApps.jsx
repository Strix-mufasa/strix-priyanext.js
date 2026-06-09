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
const Blur4 = "/assets/img/Ellipse 8.png"
import '@/app/style/uiux.css'
import Link from 'next/link'
const CardImg = "/assets/img/ui-card.webp"
const Cardcon1 = "/assets/img/webapp.png"
const Cardcon2 = "/assets/img/webapp2.png"
const Cardcon3 = "/assets/img/webapp3.png"
const Cardcon4 = "/assets/img/webapp4.png"
import ProjectCarousel from "../../components/projectCarouel";
import Button from "../../components/Button";
const ProjectCircle = "/assets/img/project-circle.webp"
const HeroImg = "/assets/img/dev-bgg.webp"
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

const WebApp = () => {
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
      question: "How can full stack SaaS web application development services help businesses?",
      answer: "Full stack SaaS development includes front-end, back-end, and cloud integration for scalable applications. Strix Production builds reliable SaaS solutions with seamless user experience, efficient data management, and strong performance for growing businesses."
    },
    {
      question: "What are full stack web app development services?",
      answer: "Full stack web app development covers UI design, backend logic, databases, and integrations. Strix Production delivers end-to-end solutions with scalable architecture, ensuring reliable performance and fully functional applications across platforms."
    },
    {
      question: "Which are the best web app development Company in Delhi?",
      answer: "A web app development company builds responsive, feature-rich applications that improve accessibility and engagement. Strix Production delivers secure, scalable web apps with strong performance, helping startups grow with reliable digital solutions."
    },
    {
      question: "What advantages do web app development agencies for startups in Delhi offer?",
      answer: "Web app development agencies help startups build and launch products efficiently through agile planning, MVP development, and continuous improvements. Strix Production delivers scalable web solutions that support startup growth and iterative development."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How can full stack SaaS web application development services help businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full stack SaaS development includes front-end, back-end, and cloud integration for scalable applications. Strix Production builds reliable SaaS solutions with seamless user experience, efficient data management, and strong performance for growing businesses."
      }
    },{
      "@type": "Question",
      "name": "What are full stack web app development services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Full stack web app development covers UI design, backend logic, databases, and integrations. Strix Production delivers end-to-end solutions with scalable architecture, ensuring reliable performance and fully functional applications across platforms."
      }
    },{
      "@type": "Question",
      "name": "Which are the best web app development Company in Delhi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A web app development company builds responsive, feature-rich applications that improve accessibility and engagement. Strix Production delivers secure, scalable web apps with strong performance, helping startups grow with reliable digital solutions."
      }
    },{
      "@type": "Question",
      "name": "What advantages do web app development agencies for startups in Delhi offer?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Web app development agencies help startups build and launch products efficiently through agile planning, MVP development, and continuous improvements. Strix Production delivers scalable web solutions that support startup growth and iterative development."
      }
    }]
  };

  return (
    <div>
      <SEO
        title="SaaS Web Application Development Services"
        description="Expert SaaS web application development services to build scalable, secure, and high-performing web apps that accelerate your business growth."
        schema={faqSchema}
      />
      <Nav />
      <SlideInFramerOnLoad />
      <ScrollAnimation />
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

          <Link href='/appdev'><button className="back-button">
            Next Service <ArrowRight size={16} />
          </button></Link>
        </div>
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h1 className="slideinLoad">Website Application</h1>
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
        <p className="ui-hero-p scrollReveal">We develop scalable, high-performance web apps tailored for business automation, SaaS platforms, and enterprise-level solutions.</p>
        <img src={Blur1} className='p-blur1' alt="Light effect right" />
        <img src={Blur2} className='p-blur2' alt="Light effect left" />
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
                <img className="ui2" src={Cardcon1} alt="" />
                <p>Saas Platform</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card2">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img className="top-card-con1 ui1" src={Cardcon2} alt="Custom Dashboards & Panels" />
                <p>Custom Dashboards & Panels</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card1">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img className="ui1" src={Cardcon3} alt="Workflow Automation Tools" />
                <p>Workflow Automation Tools</p>
              </div>
            </div>
            <p className="provide-card-p">At Strix Productions, we design, develop, and deliver world-class visuals and experience</p>
            <BtnNormsall text="Get a quote" to="/contact" />
          </div>

          <div className="provide-card p-sec2-card2">
            <div className="p-top-card">
              <img src={CardImg} alt="" />
              <div className="top-card-con">
                <img className="ui1" src={Cardcon4} alt="Real-Time Web Applications" />
                <p>Real-Time Web Applications</p>
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
        <h2 className="scrollReveal">Why Choose us ?</h2>
        <p className="p-inde scrollReveal">Our branding practice combines research, strategy, and sleek execution — helping startups and enterprises create brands that actually stand out.</p>
      </div>

      <div className="service-hero saas-webapp-section">
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="" />
          <h2 className="scrollReveal">SaaS Web Apps That Grow with Your Product</h2>
          <div className="saas-webapp-copy scrollReveal">
            <p>Speed matters at the start. A slow build can delay growth. Strix Production creates SaaS web application development services that help teams launch early and stay ready for change. Each product is shaped with a clear plan, simple flow, and clean code that works from the first release.</p>
            <p>Many apps fail when design and development do not match.</p>
            <p>Here, both are handled as one process. The layout feels easy, and the system behind it stays stable. Users move through the app without confusion, and the product keeps up as demand grows. Growth should not break your app.</p>
            <p>Each SaaS system is built to handle more users, more data, and new features over time. No need to rebuild from zero. The building is useful in the long term and this saves time and money in the future.</p>
            <p>Every part of the app is tested in real use. Small delays, weak flows, or extra steps are fixed early. The result is a product that feels smooth, loads fast and stays reliable.</p>
            <p>Strix Production develops SaaS applications that are well constructed, maintain consistency in performance and user navigation, which allows teams to transform the idea into a working product without slowing down.</p>
          </div>
        </div>
      </div>

      <div className='project-carousel-con'>
        <CircleBlurAnimation className="ProjectCircle" src={ProjectCircle} />
        <h2>Related Projects</h2>
        <ProjectCarousel serviceFilter="Web-app" />
      </div>

      {/* ==================booking====================== */}
      <div className="booking" >
        <h2 className="section-header2">
          Have a project that <br /> deserves attention ?
        </h2>
        <div className="second">


          <div className="left-booking slideInLeft">
            <p className="leave">
              <span>•</span>Leave a request
            </p>

            <div className="right-booking right-booking2">
              <img className="right-booking-img" src={Connect} alt="" />
              <p>
                Let's start <br /> your project
              </p>
            </div>
            <p className="sr-mobile" > We'd love to be challenged by you! Feel free to share your brief with us</p>
          </div>


          <div className="right-booking slideInRight">
            <img className="right-booking-img" src={Connect} alt="" />
            <p>
              Let's start <br /> your project
            </p>
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

export default WebApp;


























