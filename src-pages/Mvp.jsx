"use client"
import React, { useState, useEffect, useRef } from "react";
import Nav from '../components/Navbar'
const Circleblur = "/assets/img/sr-img.webp"
const Connect = "/assets/img/connect.svg"
import BtnNormsall from '../components/normSmall-btn';
import Footer from '../components/Footer'
const Blur1 = "/assets/img/p-blur2.png"
const Blur2 = "/assets/img/p-blur1.png"
const Blur3 = "/assets/img/Ellipse 7.png"
const Blur4 = "/assets/img/Ellipse 8.png"
const Blur5 = "/assets/img/p-blur3.png"
const Blur6 = "/assets/img/p-blur4.png"
import { Play } from 'lucide-react';
import '@/app/style/mvp.css'
import Button from "../components/Button";
const HeroImg = "/assets/img/mvp-hero.webp"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DotGrid from "../animations/DotGrid";
import RotateCardsScroll from '../animations/RotateCardsScroll'
import ScrollSlideAnimations from '../animations/slideins'
import Stagger from '../animations/stagger'
import ScrollAnimation from '../animations/scrollReveal'
import SlideInFramerOnLoad from '../animations/SlideInFramerOnLoad'
const BgMvp3card = "/assets/img/mvp3card.svg"
const HbgMvp3card = "/assets/img/mvp3card-h.svg"
const BgMvp3card2 = "/assets/img/mvp3card2.svg"
const HbgMvp3card2 = "/assets/img/mvp3card2-h.svg"
const HbgMvp3card3 = "/assets/img/mvp3card3-h.svg"
const Speed = "/assets/img/speed.png"
const Speed2 = "/assets/img/speed2.png"
import CardBtn from "../components/cardBtn";
const Scala = "/assets/img/scala.png"
const ScalaH = "/assets/img/scala-h.png"
const Stra = "/assets/img/strategy.png"
const StraH = "/assets/img/strategy-h.png"
const Gemini = "/assets/img/gemini.webp"
const TimeIcon = "/assets/img/time-icon.svg"
const Arrow = "/assets/img/arrow-right.svg"
import Link from 'next/link'
const ProjectCircle = "/assets/img/project-circle.webp"
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore'
const Open = "/assets/img/open.svg"
const Close = "/assets/img/close.svg"
import SEO from "../components/SEO";
import FAQ from "../components/FAQ";



// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3i7GvHlnib2GCCyR37H5XC7aANbPMVIc",
  authDomain: "strix-production-402d4.firebaseapp.com",
  projectId: "strix-production-402d4",
  storageBucket: "strix-production-402d4.firebasestorage.app",
  messagingSenderId: "207095143719",
  appId: "1:207095143719:web:ef9c4d4a3482131da5dd02",
  measurementId: "G-0MVYMSZCWX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

gsap.registerPlugin(ScrollTrigger);

const Mvp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoexRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true);
  };

  // Load projects from Firebase
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const q = query(
        collection(db, 'projects'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc'),
        limit(4) // Limit to 4 projects for the MVP page
      );
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
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

  const extendRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!extendRef.current || !timelineRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top 60%",
        end: "bottom 90%",
        scrub: 1.5,
      }
    });

    tl.to(extendRef.current, {
      height: "25%",
      duration: 0.25,
      ease: "power2.inOut"
    })
      .to(extendRef.current, {
        height: "50%",
        duration: 0.25,
        ease: "power2.inOut"
      })
      .to(extendRef.current, {
        height: "75%",
        duration: 0.25,
        ease: "power2.inOut"
      })
      .to(extendRef.current, {
        height: "100%",
        duration: 0.25,
        ease: "power2.inOut"
      });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const faqData = [
    {
      question: "How do SaaS MVP development agencies help early-stage SaaS businesses?",
      answer: "SaaS MVP development agencies help startups launch basic products to test ideas and gather real user feedback. Strix Production offers strategy, UX design, agile development, and scalable cloud solutions to build and validate SaaS products efficiently."
    },
    {
      question: "Why choose custom MVP development services for startups?",
      answer: "Custom MVP development helps startups build a product tailored to their business goals and audience. Strix Production delivers scalable MVPs with core features, user-focused design, and continuous feedback to refine and improve products efficiently."
    },
    {
      question: "How much does it cost to build an MVP?",
      answer: "MVP development pricing depends on complexity, features, platforms, and integrations. Strix Production offers cost-effective, transparent pricing to help startups build functional MVPs, validate ideas, and enter the market without unnecessary expenses."
    },
    {
      question: "How long does the MVP development timeline take?",
      answer: "MVP development timelines depend on features, integrations, and testing needs. Strix Production delivers scalable MVPs within 4–12 weeks, helping startups quickly launch, gather user insights, and move efficiently from idea to market."
    },
    {
      question: "What is the difference between MVP and prototype?",
      answer: "A prototype is an early model used to visualize and test design and user experience, while an MVP is a functional product with core features to test real market demand. Strix Production starts with prototypes and then builds MVPs to validate ideas efficiently."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{
      "@type": "Question",
      "name": "How do SaaS MVP development agencies help early-stage SaaS businesses?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SaaS MVP development agencies help startups launch basic products to test ideas and gather real user feedback. Strix Production offers strategy, UX design, agile development, and scalable cloud solutions to build and validate SaaS products efficiently."
      }
    },{
      "@type": "Question",
      "name": "Why choose custom MVP development services for startups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Custom MVP development helps startups build a product tailored to their business goals and audience. Strix Production delivers scalable MVPs with core features, user-focused design, and continuous feedback to refine and improve products efficiently."
      }
    },{
      "@type": "Question",
      "name": "How much does it cost to build an MVP?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MVP development pricing depends on complexity, features, platforms, and integrations. Strix Production offers cost-effective, transparent pricing to help startups build functional MVPs, validate ideas, and enter the market without unnecessary expenses."
      }
    },{
      "@type": "Question",
      "name": "How long does the MVP development timeline take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MVP development timelines depend on features, integrations, and testing needs. Strix Production delivers scalable MVPs within 4–12 weeks, helping startups quickly launch, gather user insights, and move efficiently from idea to market."
      }
    },{
      "@type": "Question",
      "name": "What is the difference between MVP and prototype?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A prototype is an early model used to visualize and test design and user experience, while an MVP is a functional product with core features to test real market demand. Strix Production starts with prototypes and then builds MVPs to validate ideas efficiently."
      }
    }]
  };

  return (
    <div>
      <SEO
        title="Full-Stack MVP Development Company | Custom MVP Development Services"
        description="Full-stack MVP development company providing custom MVP development services to turn your ideas into scalable, market-ready products fast and efficiently."
        schema={faqSchema}
      />
      <Nav />
      {/* <SlideInFramerOnLoad />
      <ScrollAnimation /> 
      <RotateCardsScroll />
      <ScrollSlideAnimations />
      <Stagger /> */}
      <DotGrid
        dotSize={2}
        gap={24}
        activeColor="#ffffff"
      />


      {/* =============== service-hero ============ */}
      <div className="service-hero">
        <div className="sh-top uiux-hero">
          <img src={Circleblur} alt="Design background blur" />
          <h1 className="slideinLoad mvp-hero-h1">Get flawless <br />product from scratch</h1 >
        </div>

        <div className="case-box-con uiu-con mvp-video">
          <img src={Blur3} className="blur3-hero-left" alt="Light effect left" />
          <img src={Blur4} className="blur3-hero-right" alt="Light effect right" />
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
        <p className="ui-hero-p scrollReveal ">We don't just build apps. We craft Minimum Viable Products designed to validate, Impress, and last.</p>
        <img src={Blur1} className='p-blur1' alt="Gradient blur 1" />
        <img src={Blur2} className='p-blur2' alt="Gradient blur 2" />
      </div>

      {/* =================provide=========== */}
      <div className="provide-con mpvcard-section ">
        <div className="sh-top uiux-hero mvp-conn">
          <img src={Circleblur} alt="Design background blur" />
          <h2 className="scrollReveal mvp-why">Why MVP with Strix ?</h2>
          <p className="mvp-hero-p scrollReveal mvp-why-p"> We craft transformative digital experiences that elevate brands and captivate audiences. Your vision, realized without compromise.</p>
        </div>

        <div className="mvp3cards">
          <div className="mvp3card slideInBottomLeft">
            <img className="mvp3card-bg" src={BgMvp3card} alt="Card background" />
            <img className="mvp3card-bg-h" src={HbgMvp3card} alt="Card background hover" />
            <div className="mvp3card-details">
              <img className="speed" src={Speed} alt="Speed icon" />
              <img className="speed-h" src={Speed2} alt="Speed icon hover" />
              <p className="mvp3card-head">Speed</p>
              <p className="mvp3card-title">Launch faster, validate smarter ideas - we turn ideas into <strong>working prototype</strong> before competitors even start planning.</p>
              <p className="mvp3card-title-h">We build <strong>MVPs</strong> that move at the pace of innovation - designed, developed, and deployed in as little as <strong>4-6</strong> weeks.</p>
              <div className="mvp3card-btn">
                <CardBtn text="Know more" />
              </div>
            </div>
          </div>

          <div className="mvp3card scrollReveal">
            <img className="mvp3card-bg" src={BgMvp3card2} alt="Card background" />
            <img className="mvp3card-bg-h" src={HbgMvp3card2} alt="Card background hover" />
            <div className="mvp3card-details">
              <img className="speed" src={Scala} alt="Scalability icon" />
              <img className="speed-h" src={ScalaH} alt="Scalability icon hover" />
              <p className="mvp3card-head">Scalability</p>
              <p className="mvp3card-title">Your MVP isn't a one-off experiment - it's the foundation of your <strong>future product.</strong></p>
              <p className="mvp3card-title-h">Every line of code, every screen, and every interaction is built with <strong>scalability</strong> in mind - so you can evolve, expand, and scale without starting over.</p>
              <div className="mvp3card-btn">
                <CardBtn text="Know more" />
              </div>
            </div>
          </div>

          <div className="mvp3card slideInBottomRight">
            <img className="mvp3card-bg" src={BgMvp3card} alt="Card background" />
            <img className="mvp3card-bg-h" src={HbgMvp3card3} alt="Card background hover" />
            <div className="mvp3card-details">
              <img className="speed" src={Stra} alt="Strategy icon" />
              <img className="speed-h" src={StraH} alt="Strategy icon hover" />
              <p className="mvp3card-head">Strategy</p>
              <p className="mvp3card-title">A <strong>great MVP</strong> isn't just about what you build, but why you build it. </p>
              <p className="mvp3card-title-h">We align every feature with your business model, market fit and audience behavior - ensuring your MVP doesn't just work, it <strong>Wins.</strong> </p>
              <div className="mvp3card-btn">
                <CardBtn text="Know more" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================built-to-launch================== */}
      <div className="mvp-built-section">
        <div className="sh-top uiux-hero mvp-built-conn">
          <img src={Circleblur} alt="Design background blur" />
          <h2 className="scrollReveal">MVPs Built to Launch, Not Sit Idle</h2>
          <div className="mvp-built-copy scrollReveal">
            <p>Speed matters early. As an MVP development company for startups, Strix Production builds only what your users need first. Core features. Clean flow. Ready to test in weeks, not months.
              As a SaaS MVP development agency, we design and build together. No gaps between teams. No long waits. You see each step. You give input. The product stays on track.
            </p>
            <p>Our Custom MVP development services fit your goal, not a preset plan. We map features, pick simple tech, and keep things easy to scale. Less waste. More focus.</p>
            <p>Strix Production is an MVP development company for startups, offering Custom MVP development services and MVP app development for startups as a trusted SaaS MVP development agency focused on fast, scalable launches.</p>
            <p>We handle MVP app development for startups across web and mobile. Fast load, smooth use, stable code. Your first users get a product that works, not a draft.</p>
            <p>Strix Production is a thoughtful and fast MVP builder, assisting founders in testing their ideas early, learning with real users and developing with a clear and consistent direction ahead.</p>
          </div>
        </div>
      </div>

      {/* ===================why================== */}
      <div className="sh-top uiux-hero what-con mvp-connn">
        <img src={Circleblur} alt="Design background blur" />
        <h2 className="scrollReveal">Our 4-Week <br />MVP Framework</h2>
        <p className="p-inde scrollReveal">At Strix Productions, we design, develop, and deliver world-class visuals and experience that help ambitious brands move faster, scale bigger, and stand out globally.</p>
      </div>

      <div className="gemini-con">
        <img className="gemini" src={Gemini} alt="Framework visual" />
      </div>

      <div className="timeline" ref={timelineRef}>
        <div className="timeline-con">
          <div className="time-left">
            <div className="time-con time-con1">
              <img src={TimeIcon} alt="Timeline milestone icon" />
              <p className="time-con-head">Discovery & Wireframes</p>
              <p className="time-con-p">
                We define your core idea, map user journeys, and create wireframes that lock your product vision with direction.
              </p>
            </div>

            <div className="time-con time-con2">
              <img src={TimeIcon} alt="Timeline milestone icon" />
              <p className="time-con-head">Development & Iterations</p>
              <p className="time-con-p">
                We develop the MVP with clean, scalable code & refine through quick sprints to keep results aligned with the vision.
              </p>
            </div>
          </div>

          <div className="time-mid">
            <div className="line-time">
              <div className="extend" ref={extendRef}>
                <div className="time-dot"></div>
                <div className="time-circle"></div>
              </div>
            </div>
          </div>

          <div className="time-right">
            <div className="time-con time-con3">
              <img src={TimeIcon} alt="Timeline milestone icon" />
              <p className="time-con-head">Design & Validation</p>
              <p className="time-con-p">
                High-fidelity visuals, interactive prototypes, and feedback loops - ensuring every screen looks and feels right before development.
              </p>
            </div>
          </div>
        </div>

        <div className="time-con time-con5">
          <img src={TimeIcon} alt="Timeline milestone icon" />
          <p className="time-con-head">Test, Launch & Scale</p>
          <p className="time-con-p">
            Before going live, we stress-test every feature for smooth performance, scalability, and future expansion.
          </p>
        </div>
      </div>

      {/* ===================Project Section================== */}
      <div className="project-section-mvp">
        <h2 className="project-section-mvp-h1">MVPs Delivered</h2>
        <p className="project-section-mvp-p">From Concept to launch - a process built for clarity, precision, and speed.</p>
        <div className="section2">
          <div className="p-card-con">
            {loading ? (
              <div className="loading-state">
                <p>Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <p>No projects available at the moment.</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <div
                  key={project.id}
                  className={`p-sec2-card ${index % 2 === 0 ? 'p-sec2-card1' : 'p-sec2-card2'}`}
                >
                  <img
                    className='p-sec2-card-img'
                    src={project.image}
                    alt={project.title}
                  />
                  <p>{project.categoryText}</p>
                  <Link className='linkkk' href={`/case-study/${project.id}`}>
                    <div>
                      <h2>{project.title}</h2>
                      <img src={Arrow} className='icon' alt="Arrow" />
                    </div>
                  </Link>
                </div>
              ))
            )}

            <img src={Blur5} className='p-blur3' alt="Blur" />
            <img src={Blur6} className='p-blur4' alt="Blur" />
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link href="/project">
              <BtnNormsall text="View All Projects" />
            </Link>
          </div>
        </div>
      </div>

      {/* ==================booking====================== */}
      <div className="booking" >
        <h2 className="section-header3">
          Have an Idea? <br />Let’s turn it into a market-ready MVP
        </h2>
        <div className="second">
          <div className="left-booking slideInLeft">
            <p className="leave">
              <span>•</span>Leave a request
            </p>

            <div className="right-booking right-booking2">
              <img className="right-booking-img" src={Connect} alt="Connect with Strix" />
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


      {/* ==========FAq================== */}

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

export default Mvp

























