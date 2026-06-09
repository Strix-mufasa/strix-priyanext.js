"use client"
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// const Pi1 = "/assets/img/proca1.webp";
// const Pi2 = "/assets/img/proca2.webp";
// const Pi3 = "/assets/img/proca3.webp";
// const Pi4 = "/assets/img/pi4.webp"
// const Pi5 = "/assets/img/pi5.webp"
// const Pi6 = "/assets/img/pi6.webp"
// const Pi7 = "/assets/img/pi7.webp"
import '@/app/style/carousal.css';

const firebaseConfig = {
  apiKey: "AIzaSyB3i7GvHlnib2GCCyR37H5XC7aANbPMVIc",
  authDomain: "strix-production-402d4.firebaseapp.com",
  projectId: "strix-production-402d4",
  storageBucket: "strix-production-402d4.firebasestorage.app",
  messagingSenderId: "207095143719",
  appId: "1:207095143719:web:ef9c4d4a3482131da5dd02",
  measurementId: "G-0MVYMSZCWX"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


const ProjectCarousel = ({ serviceFilter }) => {
  const [currentIndex, setCurrentIndex] = useState(2); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonOffset, setButtonOffset] = useState("22.5%");
  const [carouselData, setCarouselData] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateOffset = () => {
      if (window.innerWidth <= 768) {
        setButtonOffset("1%");
      } else if (window.innerWidth <= 1500) {
        setButtonOffset("33.4%");
      } else {
        setButtonOffset("32.4rem");
      }
    };
    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  useEffect(() => {
  const fetchProjects = async () => {
    try {
      const q = query(
        collection(db, 'projects'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      const filtered = projectsData.filter(project => {
        const filters = project.filters || {}
        return Object.values(filters).some(arr => arr.includes(serviceFilter))
      })

      setCarouselData(filtered.map((p, i) => ({
        id: i + 1,
        image: p.image,
        title: p.title
      })))
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  if (serviceFilter) fetchProjects()
}, [serviceFilter])

  // ✅ Added text for each carousel item
  // const carouselData = [
  //   { id: 1, image: Pi1, title: "Modern Architecture" },
  //   { id: 2, image: Pi2, title: "Futuristic Design" },
  //   { id: 3, image: Pi3, title: "Eco Smart Home" },
  //   { id: 4, image: Pi4, title: "Urban Lifestyle" },
  //   { id: 5, image: Pi5, title: "Luxury Interior" },
  //   { id: 6, image: Pi6, title: "Creative Workspace" },
  //   { id: 7, image: Pi7, title: "Minimalist Haven" },
  // ];

  const infiniteItems = [...carouselData, ...carouselData, ...carouselData];
  const totalItems = infiniteItems.length;

  const getItemStyle = (index) => {
    const position = index - currentIndex;
    const isCenter = position === 0;
    const absPosition = Math.abs(position);

    let transform = '';
    let opacity = 1;
    let zIndex = 10;
    let scale = 1;
    let visibility = "visible";

    if (isCenter) {
      transform = 'translateX(0%) translateZ(0px)';
      scale = 1.2;
      zIndex = 20;
      opacity = 1;
    } else if (absPosition === 1) {
      const translateX = position > 0 ? '135%' : '-135%';
      transform = `translateX(${translateX}) translateZ(-80px)`;
    } else if (absPosition === 2) {
      const translateX = position > 0 ? '270%' : '-270%';
      transform = `translateX(${translateX}) translateZ(-140px)`;
    } else {
      const translateX = position > 0 ? '360%' : '-360%';
      transform = `translateX(${translateX}) translateZ(-200px)`;
      opacity = 0;
      visibility = "hidden";
    }

    return {
      transform: `${transform} scale(${scale})`,
      opacity,
      visibility,
      zIndex,
      transition: isAnimating
        ? 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        : 'none',
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
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  // ✅ Touch & Drag Events
  const startX = useRef(0);
  const isDragging = useRef(false);
  const handleStart = (x) => { startX.current = x; isDragging.current = true; };
  const handleMove = (x) => {
    if (!isDragging.current) return;
    const diff = startX.current - x;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      isDragging.current = false;
    }
  };

  const styles = {
    container: {  overflow: 'hidden', maxWidth: '1400px', width: '100%', position: 'relative', cursor: 'grab' },
    backgroundEffect: {
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'clamp(250px, 60vw, 400px)',
      height: 'clamp(250px, 60vw, 400px)',
      background: 'radial-gradient(circle, rgba(139,69,19,0.1) 0%, transparent 70%)',
      borderRadius: '50%', filter: 'blur(60px)',
    },
    carouselContainer: {
      position: 'relative',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      perspective: '1200px', marginBottom: '1.5rem',
      
    },
    carouselItem: {
      position: 'absolute',
      width: 'clamp(180px, 70vw, 395px)',
      height: 'clamp(120px, 50vw, 260px)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    imageContainer: (isCenter) => ({
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '2rem',
      overflow: 'hidden',
      boxShadow: isCenter
        ? '0 0 20px 2px rgba(255, 255, 255, 0.4)' // ✅ outer glow for focused card
        : '0 15px 30px -10px rgba(0, 0, 0, 0.6)',
      transition: 'box-shadow 0.4s ease',
    }),
    title: {
      marginTop: '0.8rem',
      fontSize: '1.2rem',
      color: '#fff',
      fontWeight: '500',
      fontFamily: "cd-reg",
      textAlign: 'center',
      textShadow: '0 2px 6px rgba(0,0,0,0.6)',
    },
  };

  return (
    <div className='p-carousel-container' style={styles.container}>
      <div style={styles.backgroundEffect}></div>
      <div className='p-carousel-con'  style={styles.carouselContainer}
        ref={containerRef}
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={() => (isDragging.current = false)}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={() => (isDragging.current = false)}
        onMouseLeave={() => (isDragging.current = false)}
      >
        {infiniteItems.map((item, index) => {
          const isCenter = index === currentIndex;
          return (
            <div
              key={`${item.id}-${index}`}
              style={{ ...styles.carouselItem, ...getItemStyle(index) }}
              onClick={() => !isAnimating && setCurrentIndex(index)}
            >
              <div style={styles.imageContainer(isCenter)}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={styles.title}>{item.title}</div>
            </div>
          );
        })}
      </div>

      {/* ✅ Navigation */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        style={{
          position: 'absolute', top: '50%', left: buttonOffset, transform: 'translateY(-50%)',
          display: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', border: 'none', zIndex: 30,
        }}
      >
        <ChevronLeft size={38} />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        style={{
          position: 'absolute', top: '50%', right: buttonOffset, transform: 'translateY(-50%)',
          display: 'none', background: 'transparent', color: '#fff', cursor: 'pointer', border: 'none', zIndex: 30,
        }}
      >
        <ChevronRight size={38} />
      </button>
    </div>
  );
};

export default ProjectCarousel;
















