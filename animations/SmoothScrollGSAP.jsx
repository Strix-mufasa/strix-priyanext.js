"use client"
import React, { useEffect, useRef, useState } from 'react';

const SmoothScroll = ({ 
  children, 
  intensity = 1.2,
  mobile = true,
  mobileBreakpoint = 768,
  ease = 0.1,
  direction = 'vertical',
  skew = 2,
  enableSkew = true,
  disabled = false
}) => {
  const scrollRef = useRef(null);
  const contentRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const data = useRef({
    ease,
    current: 0,
    previous: 0,
    rounded: 0,
    skewTarget: 0,
    skewCurrent: 0
  }).current;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  useEffect(() => {
    if (disabled || (isMobile && !mobile)) {
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
      if (contentRef.current) {
        contentRef.current.style.transform = 'none';
      }
      return;
    }

    const setBodyHeight = () => {
      if (contentRef.current) {
        document.body.style.height = `${contentRef.current.getBoundingClientRect().height * intensity}px`;
      }
    };

    setBodyHeight();
    window.addEventListener('resize', setBodyHeight);

    const onScroll = () => {
      data.current = window.scrollY;
    };

    window.addEventListener('scroll', onScroll);

    let rafId;
    const smoothScroll = () => {
      data.previous = data.current;
      data.current = window.scrollY;
      data.rounded = Math.round(data.current * 100) / 100;

      const difference = data.current - data.previous;
      const acceleration = difference / (window.innerWidth / 2);
      
      if (enableSkew) {
        data.skewTarget = acceleration * skew;
        data.skewCurrent += (data.skewTarget - data.skewCurrent) * ease;
      }

      const delta = (data.current - data.rounded) * ease;
      data.rounded += delta;

      if (contentRef.current) {
        if (direction === 'vertical') {
          contentRef.current.style.transform = enableSkew
            ? `translate3d(0, -${data.rounded}px, 0) skewY(${data.skewCurrent}deg)`
            : `translate3d(0, -${data.rounded}px, 0)`;
        } else {
          contentRef.current.style.transform = enableSkew
            ? `translate3d(-${data.rounded}px, 0, 0) skewX(${data.skewCurrent}deg)`
            : `translate3d(-${data.rounded}px, 0, 0)`;
        }
      }

      rafId = requestAnimationFrame(smoothScroll);
    };

    rafId = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', setBodyHeight);
      cancelAnimationFrame(rafId);
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, [intensity, ease, direction, skew, enableSkew, disabled, mobile, isMobile]);

  if (disabled || (isMobile && !mobile)) {
    return <>{children}</>;
  }

  return (
    <div ref={scrollRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', overflow: 'hidden' }}>
      <div ref={contentRef} style={{ willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
};

export default SmoothScroll;














