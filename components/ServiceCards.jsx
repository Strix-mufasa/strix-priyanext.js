"use client"
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
const Card = "/assets/img/card.webp";
const Star = "/assets/img/star.webp";
const Star2 = "/assets/img/star2.webp";
const Card2 = "/assets/img/card1.webp";
const Card3 = "/assets/img/card3.webp";
const Cloud = "/assets/img/cloud.webp";
const Cloud2 = "/assets/img/cloud2.webp";
const Bolt = "/assets/img/bolt.webp";
const Bolt2 = "/assets/img/bolt2.webp";
import CardBtn from "./cardBtn";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServiceCards = ({ onModalOpen }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 770);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP ScrollTrigger animation for mobile
  useEffect(() => {
    if (!isMobile || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: ".pin-wrapper",
        pinSpacing: false,
      });

      // Animate card 1 - moves up and scales down
      gsap.to(card1Ref.current, {
        y: -100,
        scale: 0.9,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        }
      });

      // Animate card 2 - starts below, moves to center
      gsap.fromTo(card2Ref.current, 
        { y: 400, scale: 1 },
        {
          y: 0,
          scale: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "66% top",
            scrub: 1,
          }
        }
      );

      // Animate card 3 - starts below, moves to center
      gsap.fromTo(card3Ref.current, 
        { y: 800, scale: 1 },
        {
          y: 0,
          scale: 0.95,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "33% top",
            end: "100% top",
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => {
      ctx.revert(); // Cleanup
    };
  }, [isMobile]);

  // Desktop animation component
  const DesktopCard = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    if (isMobile) {
      return <div>{children}</div>;
    }

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
      >
        {children}
      </motion.div>
    );
  };

  if (isMobile) {
    return (
      <div ref={containerRef} style={styles.mobileOuterContainer}>
        <div className="pin-wrapper" style={styles.mobileStickyContainer}>
          {/* Card 1 - Design */}
          <div 
            ref={card1Ref}
            className="card-con card-con1"
            style={{
              position: 'absolute',
              zIndex: 1,
              willChange: 'transform',
            }}
          >
            <img src={Card} alt="" className="card-img" />
            <img src={Star} alt="" className="card-icon" />
            <img src={Star2} alt="" className="card-icon2" />
            <div className="card-content">
              <h2>Design</h2>
              <p className="card-content-p">Crafted to Captivate</p>
              <div className="btn-con">
                <CardBtn onClick={() => onModalOpen("design")} text="Know more" />
              </div>
            </div>
            <div className="glow"></div>
          </div>

          {/* Card 2 - Development */}
          <div 
            ref={card2Ref}
            className="card-con card-con2"
            style={{
              position: 'absolute',
              zIndex: 2,
              willChange: 'transform',
            }}
          >
            <img src={Card2} alt="" className="card-img" />
            <img src={Cloud} alt="" className="card-icon" />
            <img src={Cloud2} alt="" className="card-icon2" />
            <div className="card-content">
              <h2>Development</h2>
              <p className="card-content-p">Engineered for Performance</p>
              <div className="btn-con">
                <CardBtn onClick={() => onModalOpen("dev")} text="Know more" />
              </div>
            </div>
            <div className="glow glow2"></div>
          </div>

          {/* Card 3 - Production */}
          <div 
            ref={card3Ref}
            className="card-con"
            style={{
              position: 'absolute',
              zIndex: 3,
              willChange: 'transform',
            }}
          >
            <img src={Card3} alt="" className="card-img" />
            <img src={Bolt} alt="" className="card-icon" />
            <img src={Bolt2} alt="" className="card-icon2" />
            <div className="card-content">
              <h2>Production</h2>
              <p className="card-content-p">Elevate your content</p>
              <div className="btn-con">
                <CardBtn onClick={() => onModalOpen("research")} text="Know more" />
              </div>
            </div>
            <div className="glow glow3"></div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={styles.desktopContainer}>
      {/* Card 1 - Design */}
      <DesktopCard delay={0}>
        <div className="card-con card-con1">
          <img src={Card} alt="" className="card-img" />
          <img src={Star} alt="" className="card-icon" />
          <img src={Star2} alt="" className="card-icon2" />
          <div className="card-content">
            <h2>Design</h2>
            <p className="card-content-p">Crafted to Captivate</p>
            <div className="btn-con">
              <CardBtn onClick={() => onModalOpen("design")} text="Know more" />
            </div>
          </div>
          <div className="glow"></div>
        </div>
      </DesktopCard>

      {/* Card 2 - Development */}
      <DesktopCard delay={0.2}>
        <div className="card-con card-con2">
          <img src={Card2} alt="" className="card-img" />
          <img src={Cloud} alt="" className="card-icon" />
          <img src={Cloud2} alt="" className="card-icon2" />
          <div className="card-content">
            <h2>Development</h2>
            <p className="card-content-p">Engineered for Performance</p>
            <div className="btn-con">
              <CardBtn onClick={() => onModalOpen("dev")} text="Know more" />
            </div>
          </div>
          <div className="glow glow2"></div>
        </div>
      </DesktopCard>

      {/* Card 3 - Production */}
      <DesktopCard delay={0.4}>
        <div className="card-con">
          <img src={Card3} alt="" className="card-img" />
          <img src={Bolt} alt="" className="card-icon" />
          <img src={Bolt2} alt="" className="card-icon2" />
          <div className="card-content">
            <h2>Production</h2>
            <p className="card-content-p">Elevate your content</p>
            <div className="btn-con">
              <CardBtn onClick={() => onModalOpen("research")} text="Know more" />
            </div>
          </div>
          <div className="glow glow3"></div>
        </div>
      </DesktopCard>
    </div>
  );
};

const styles = {
  desktopContainer: {
    display: 'flex',
    gap: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  mobileOuterContainer: {
    height: '300vh', // Creates scroll space for the animation
    position: 'relative',
  },
  mobileStickyContainer: {
    position: 'relative',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
};

export default ServiceCards;















