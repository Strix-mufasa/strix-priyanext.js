"use client"
import '@/app/style/blogNav.css'
import Link from 'next/link'
const Bloglogo = "/assets/img/blog-logo.webp"
const Cicon = "/assets/img/c-icon.webp";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
const Upwork = "/assets/img/cib--upwork.svg"
const Behance = "/assets/img/ri--behance-fill.svg"
const Dribble = "/assets/img/icon-park-outline--dribble.svg"
const Tweet = "/assets/img/prime--twitter.svg"
const Linkedin = "/assets/img/uil--linkedin.svg"
const Insta = "/assets/img/mdi--instagram.svg"
const Search = "/assets/img/search.svg"

const BlogNav = ({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) => {
  const socialsRef = useRef(null);
  const containerRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const paragraphRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
  if (
    !containerRef.current ||
    !heading1Ref.current ||
    !heading2Ref.current ||
    !paragraphRef.current ||
    !imageRef.current ||
    !socialsRef.current
  ) return;

  const ctx = gsap.context(() => {
    gsap.set(imageRef.current, {
      xPercent: -50,
      yPercent: -50,
      top: "50%",
      left: "50%",
      position: "absolute",
    });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(heading1Ref.current, { y: 50, opacity: 0, duration: 1 })
      .from(heading2Ref.current, { y: 50, opacity: 0, duration: 1 }, "-=0.6")
      .from(paragraphRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.4")
      .fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.3 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" },
        "-=0.3"
      )
      .from(
        socialsRef.current.children,
        { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 },
        "-=0.8"
      );
  }, containerRef);

  return () => ctx.revert();
}, []);


  return (
    <div className='blog-navv'>
      <div className="icon">
        <img ref={imageRef} src={Bloglogo} alt="" className='blog-logo' />
      </div>
      <div className="routeblog">
        <Link href="/">HOME</Link><span>/</span><Link href="/blog">BLOG</Link>
      </div>
      <p className='blognav-p'>
        Here's where we let you in — the sketches, the sparks, the lessons, & the late-night thoughts that shape the work you see.
      </p>

      <div className="blog-icons">
        <div ref={socialsRef} className="mobile-socials">
          <a href="https://clutch.co/profile/strix-production/" target="_blank" rel="noopener noreferrer"><img src={Cicon} className="cion1" alt="clutch" /></a>
          <a href="https://www.upwork.com/agencies/~010688cc460787e912" target="_blank" rel="noopener noreferrer"><img src={Upwork} className="cion1" alt="upwork" /></a>
          <a href="https://www.behance.net/strixproductions" target="_blank" rel="noopener noreferrer"><img src={Behance} className="cion1" alt="behance" /></a>
          <a href="https://dribbble.com/StrixProduction" target="_blank" rel="noopener noreferrer"><img src={Dribble} className="cion1 cion3" alt="dribble" /></a>
          <a href="https://www.instagram.com/strix_productions" target="_blank" rel="noopener noreferrer"><img src={Insta} className="cion1 cion3" alt="instagram" /></a>
          <a href="https://x.com/strixproduction" target="_blank" rel="noopener noreferrer"><img src={Tweet} className="cion1 cion3" alt="twitter" /></a>
          <a href="https://www.linkedin.com/company/strix-production/" target="_blank" rel="noopener noreferrer"><img src={Linkedin} className="cion1 cion3" alt="linkedin" /></a>
        </div>
        <div className="line-rigt"></div>

        <div className="blogsearch">
          <img src={Search} alt="" />
          <input
            type="text"
            placeholder='Search Topic'
            value={searchTerm || ''}
            onChange={(e) => setSearchTerm && setSearchTerm(e.target.value)}
          />
        </div>

        <div className="blog-cat">
          <h3>Categories</h3>
          <p
            onClick={() => setSelectedCategory && setSelectedCategory('All Topics')}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCategory === 'All Topics' ? 'bold' : 'normal'
            }}
          >
            All Topics
          </p>
          <p
            onClick={() => setSelectedCategory && setSelectedCategory('Tips')}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCategory === 'Tips' ? 'bold' : 'normal'
            }}
          >
            Tips
          </p>
          <p
            onClick={() => setSelectedCategory && setSelectedCategory('News')}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCategory === 'News' ? 'bold' : 'normal'
            }}
          >
            News
          </p>
          <p
            onClick={() => setSelectedCategory && setSelectedCategory('Saved')}
            style={{
              cursor: 'pointer',
              fontWeight: selectedCategory === 'Saved' ? 'bold' : 'normal'
            }}
          >
            Saved
          </p>
        </div>
        <div className="line-rigt"></div>

        <div className="blog-cat">
          <h3>Explore More</h3>
          <Link className='blog-link' href='/about'>About Us</Link> <span> | </span> <Link href='/project' className='blog-link'>Case Study</Link>
        </div>
      </div>
    </div>
  )
}

export default BlogNav















