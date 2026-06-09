"use client"
import React, { useState, useEffect, useRef } from 'react';
const T1 = "/assets/img/hiren.webp";
const T2 = "/assets/img/interpolitian.jpg"
const T3 = "/assets/img/zenith.png"
const T4 = "/assets/img/itc.png"
const T5 = "/assets/img/wroott.png"
const T6 = "/assets/img/T6.png"
import '@/app/style/carousal.css';
import '@/app/style/test.css';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonOffset, setButtonOffset] = useState("22.5%");
  const containerRef = useRef(null);
  const startX = useRef(0);
  const isDragging = useRef(false);

  // ✅ Responsive button positioning
  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth <= 768) {
        setButtonOffset("1%");
      } else if (window.innerWidth <= 1200) {
        setButtonOffset("20%");
      } else if (window.innerWidth <= 1500) {
        setButtonOffset("25%");
      } else {
        setButtonOffset("27%");
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // ✅ Full Testimonial Data
  const testimonialData = [
    {
      id: 1,
      image: T2,
      name: "Hiren",
      position: "Design Head, Interpolitan Money",
      text:
        "We hired Strix Production for few Web-Design projects and it was great working with them. The team's commitment to timely delivery and high quality makes him stand different from others. Everyone in the team is a thorough gentleman and professional to work with!"
    },
    {
      id: 2,
      image: T4,
      name: "Rick Wickelton",
      position: "CTO , IT Empire",
      text:
        "They transformed our clunky interface into a beautiful, lightning-fast website. The entire process was seamless, and our user engagement is up 40% since launch. A total game-changer."
    },
    {
      id: 3,
      image: T3,
      name: "Sameer",
      position: "CEO, Zenith Wellness",
      text:
        "From brand design to web development and video production, they excel at everything. It’s rare to find a single agency that delivers such high quality across the board. They are our go-to creative partner."
    },
    {
      id: 4,
      image: T5,
      name: "Akshay Dave",
      position: "Marketing Head, Wroot",
      text:
        "As a small business owner, I was lost. They patiently guided me from a simple idea to a beautiful brand and a professional e-commerce site. Our online orders have tripled!"
    },
    {
      id: 5,
      image: T6,
      name: "Abhishek",
      position: "Founder, The Kundli Pro",
      text:
        "They made promo for The Kundli Pro app and it was exceptional. The final video was dynamic, flawless and perfectly captured our app’s essence. A powerful marketing tool, we highly recommend their work!"
    }
  ];

  const infiniteItems = [...testimonialData, ...testimonialData, ...testimonialData];
  const totalItems = infiniteItems.length;

  const getCardStyle = (index) => {
    const position = index - currentIndex;
    const isCenter = position === 0;
    const absPosition = Math.abs(position);

    let transform = '';
    let opacity = 1;
    let zIndex = 10;
    let scale = 1;

    if (isCenter) {
      transform = 'translateX(0%) translateZ(0px)';
      scale = 1.1;
      zIndex = 20;
    } else if (absPosition === 1) {
      const translateX = position > 0 ? '120%' : '-120%';
      transform = `translateX(${translateX}) translateZ(-60px)`;
    } else if (absPosition === 2) {
      const translateX = position > 0 ? '240%' : '-240%';
      transform = `translateX(${translateX}) translateZ(-120px)`;
    } else {
      const translateX = position > 0 ? '360%' : '-360%';
      transform = `translateX(${translateX}) translateZ(-180px)`;
      opacity = 0.5;
    }

    return {
      transform: `${transform} scale(${scale})`,
      opacity,
      zIndex,
      transition: isAnimating ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
    };
  };

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      return newIndex >= totalItems - 2 ? testimonialData.length : newIndex;
    });
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => {
      const newIndex = prev - 1;
      return newIndex < 2 ? totalItems - testimonialData.length - 1 : newIndex;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // ✅ Drag / Swipe handling
  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
  };

  const handleDragEnd = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
    const deltaX = endX - startX.current;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevTestimonial();
      } else {
        nextTestimonial();
      }
    }
  };

  const styles = {
    container: {
      width: "100%",
      minHeight: "20rem",
      position: "relative",
      marginTop: "2rem",
      padding: "0 1rem",
      maxWidth: '2650px',
      overflow: "hidden",
      cursor: "grab"
    },
    mainWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    carouselContainer: {
      position: "relative",
      width: "100%",
      height: "24rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      perspective: "1200px",
      perspectiveOrigin: "50% 50%",
      cursor: "grab",
    },
    card: {
      position: "absolute",
      width: "clamp(260px, 80%, 500px)",
      minHeight: "280px",
      padding: "1rem",
      borderRadius: "1.5rem",
      color: "#fff",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
      backdropFilter: "blur(10px)",
      textAlign: "center",
      userSelect: "none"
    },
    avatar: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      objectFit: "cover",
      margin: "0 auto 0.75rem",
    },
    name: { fontWeight: "bold", fontSize: "clamp(1rem, 2.5vw, 1.1rem)" },
    position: { fontSize: "clamp(0.8rem, 2vw, 0.9rem)", opacity: 0.7, marginBottom: "0.5rem" },
    text: { fontSize: "clamp(0.75rem, 2vw, 0.9rem)", lineHeight: 1.4, marginBottom: "0.5rem" }
  };

  return (
    <div style={styles.container}>
      <div
        style={styles.mainWrapper}
        ref={containerRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        <div style={styles.carouselContainer}>
          {infiniteItems.map((item, index) => (
            <div
              className="test-card"
              key={`${item.id}-${Math.floor(index / testimonialData.length)}`}
              style={{ ...styles.card, ...getCardStyle(index) }}
            >
              <img src={item.image} alt={item.name} style={styles.avatar} />
              <p className="test-p" style={styles.text}>"{item.text}"</p>
              <div className="text-name" style={styles.name}>{item.name}</div>
              <div className="position-test" style={styles.position}>{item.position}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
















