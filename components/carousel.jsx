"use client"
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../admin/firebaseconfig';
import '@/app/style/carousal.css';

/**
 * Optimize Cloudinary URLs for carousel thumbnails.
 * Requests a 640px wide, auto-quality, auto-format version — 
 * typically 5-10× smaller than the original upload.
 */
const getOptimizedImage = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/w_640,q_auto,f_auto/');
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonOffset, setButtonOffset] = useState("22.5%"); // ✅ default desktop
  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const router  = useRouter();

  // ✅ Fetch projects from Firebase with Resilience
  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        // Since we enabled persistence in firebaseconfig, getDocs will prefer cache if offline
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        if (cancelled) return;

        const projects = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(p => p.status === 'published' && p.image);

        if (projects.length > 0) {
          setCarouselData(projects);
          setCurrentIndex(Math.min(2, projects.length - 1));
        }
      } catch (error) {
        console.error('Carousel fetch error:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProjects();

    // Safety timeout: if Firestore takes too long, stop loading spinner
    const timer = setTimeout(() => {
      if (loading && !cancelled) setLoading(false);
    }, 10000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // ✅ Responsive button offset
  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth <= 768) {
        setButtonOffset("1%"); // 📱 mobile
      } else if (window.innerWidth <= 1500) {
        setButtonOffset("33.4%"); // 💻 tablet / medium screens
      } else {
        setButtonOffset("32.4rem"); // 🖥️ large desktop
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  const infiniteItems = [...carouselData, ...carouselData, ...carouselData];
  const totalItems = infiniteItems.length;

  // const getItemStyle = (index) => {
  //   const position = index - currentIndex;
  //   const isCenter = position === 0;
  //   const absPosition = Math.abs(position);

  //   let transform = '';
  //   let opacity = 1;
  //   let zIndex = 10;
  //   let scale = 1;
  //   let visibility = "visible";

  //   if (isCenter) {
  //     transform = 'translateX(0%) translateZ(0px)';
  //     scale = 1.2;
  //     zIndex = 20;
  //     opacity = 1;
  //   } else if (absPosition === 1) {
  //     const translateX = position > 0 ? '120%' : '-120%';
  //     transform = `translateX(${translateX}) translateZ(-80px)`;
  //   } else if (absPosition === 2) {
  //     const translateX = position > 0 ? '240%' : '-240%';
  //     transform = `translateX(${translateX}) translateZ(-140px)`;
  //   } else {
  //     // ✅ Far left / right images → hide them
  //     const translateX = position > 0 ? '320%' : '-320%';
  //     transform = `translateX(${translateX}) translateZ(-200px)`;
  //     opacity = 0;           // fully transparent
  //     visibility = "hidden"; // remove from layout/interaction
  //   }

  //   return {
  //     transform: `${transform} scale(${scale})`,
  //     opacity,
  //     visibility,
  //     zIndex,
  //     transition: isAnimating
  //       ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  //       : 'none',
  //   };
  // };

  const getItemStyle = (index) => {
  const position = index - currentIndex;
  const isCenter = position === 0;

  if (isCenter) {
    return {
      transform: 'translateX(0%) scale(1)',
      opacity: 1,
      visibility: 'visible',
      zIndex: 20,
      transition: isAnimating ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    };
  }

  
  return {
    transform: position > 0 ? 'translateX(120%) scale(0.85)' : 'translateX(-120%) scale(0.85)',
    opacity: 0,
    visibility: 'hidden',
    zIndex: 0,
    transition: isAnimating ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  };
};
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= totalItems - 2 ? carouselData.length : newIndex;
    });
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 2 ? totalItems - carouselData.length - 1 : newIndex;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // ✅ Swipe & Drag support
  const startX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDragging.current = false;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    const diff = startX.current - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const styles = {
    container: {
      width: '100%',
      height: 'auto',
      overflow: 'visible',
      position: 'relative',
      marginTop: '2rem',
      cursor: 'grab',

    },
    backgroundEffect: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'clamp(250px, 60vw, 400px)',
      height: 'clamp(250px, 60vw, 400px)',
      background:
        'radial-gradient(circle, rgba(139, 69, 19, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      filter: 'blur(60px)',
    },
    mainWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      cursor: 'grab',
      overflow: 'visible',
    },
    carouselContainer: {
      position: 'relative',
      width: '100%',
      height: 'clamp(320px, 60vh, 100px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      perspective: '1200px',
      perspectiveOrigin: '50% 50%',
      cursor: 'grab',
      marginBottom: '1.5rem'
    },
    carouselItem: {
      position: 'absolute',
      width: 'clamp(180px, 70vw, 320px)',
      height: 'clamp(120px, 50vw, 220px)',
      cursor: 'pointer',
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '2rem',
      overflow: 'hidden',
      boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.6)',
      transition: 'box-shadow 0.3s ease',
      cursor: 'grab',
    },
    imageContainerHover: {
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
      cursor: 'grab',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 30,
      width: '60px',
      height: '60px',
      background: 'transparent',
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    prevButton: {
      left: buttonOffset,
    },
    nextButton: {
      right: buttonOffset,
    },
    indicators: {
      position: 'absolute',
      bottom: '16px',
      left: '50%',
      transform: 'translateX(-50%)',
      gap: '6px',
      display: 'none',
    },
    indicator: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: 'rgba(255, 255, 255, 0.4)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    indicatorActive: {
      background: 'white',
      width: '20px',
      borderRadius: '4px',
    },
  };

  // ✅ Don't render carousel if no data
  if (loading) {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255,255,255,0.1)',
          borderTop: '3px solid rgba(255,255,255,0.6)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (carouselData.length === 0) {
    return null; // No published projects, hide carousel
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundEffect}></div>
      <div style={styles.mainWrapper}>
        <div
          ref={containerRef}
          style={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {infiniteItems.map((item, index) => (
            <div
              key={`${item.id}-${Math.floor(index / carouselData.length)}`}
              style={{ ...styles.carouselItem, ...getItemStyle(index) }}
              onClick={() => {
                if (isAnimating) return;

                if (index === currentIndex) {
                  // ✅ Center card clicked → navigate to case study
                const externalLink = item.externalLink;
                if (externalLink && externalLink.startsWith('http')) {
                  window.open(externalLink, '_blank');
                } else if (item.link) {
                  router.push(item.link);
                } else {
                  router.push(`/case-study/${item.id}`);
                }
                } else {
                  // Non-center card → slide it into focus
                  setIsAnimating(true);
                  setCurrentIndex(index);
                }
              }}
            >
              <div
                style={styles.imageContainer}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    styles.imageContainerHover.boxShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    styles.imageContainer.boxShadow;
                }}
              >
                <img
                  src={getOptimizedImage(item.image)}
                  alt={item.title || `Project ${item.id}`}
                  style={styles.image}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-card-info">
          <p className="carousel-card-category">
            {carouselData[currentIndex % carouselData.length]?.categoryText}
          </p>
          <h3 className="carousel-card-title">
            {carouselData[currentIndex % carouselData.length]?.title}
          </h3>
          <div className="carousel-dots">
            {carouselData.map((_, i) => (
              <span
                key={i}
                className={`carousel-dot ${(currentIndex % carouselData.length) === i ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>
        {/* ✅ Responsive Buttons */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          style={{
            ...styles.navButton,
            ...styles.prevButton,
            ...(isAnimating ? { opacity: 0.5 } : {}),
          }}
        >
          <ChevronLeft size={38} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          style={{
            ...styles.navButton,
            ...styles.nextButton,
            ...(isAnimating ? { opacity: 0.5 } : {}),
          }}
        >
          <ChevronRight size={38} />
        </button>
      </div>

      <div style={styles.indicators}>
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index + carouselData.length);
              }
            }}
            style={{
              ...styles.indicator,
              ...((currentIndex % carouselData.length) === index
                ? styles.indicatorActive
                : {}),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;



















