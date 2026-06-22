"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Nav from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SEO from '../../../components/SEO';
import { ArrowLeft } from 'lucide-react';
import '@/app/style/blog.css';
import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../../../admin/firebaseconfig';

const Love  = "/assets/img/love.svg";
const Save  = "/assets/img/save.svg";

const buildTOC = (content = []) =>
  content
    .filter(b => b.type === 'subheading' && b.content?.trim())
    .map(b => ({ id: `sh-${b.id}`, label: b.content.trim() }));

const renderContent = (block) => {
  switch (block.type) {
    case 'paragraph':
      return <p className="blog-writeup" key={block.id}>{block.content}</p>;
    case 'image':
      return (
        <React.Fragment key={block.id}>
          <img className="blog-content-image" src={block.content} alt={block.caption || 'Blog content'} />
          {block.caption && <p className="blog-image-caption">{block.caption}</p>}
        </React.Fragment>
      );
    case 'subheading':
      return <h2 id={`sh-${block.id}`} className="blog-subheading" key={block.id}>{block.content}</h2>;
    case 'keypoints':
      return (
        <ul className="blog-keypoints" key={block.id}>
          {block.content.map((pt, i) => <li key={i}>{pt}</li>)}
        </ul>
      );
    case 'numberedlist':
      return (
        <ol className="blog-numbered-list" key={block.id}>
          {block.content.map((pt, i) => <li key={i}>{pt}</li>)}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="blog-quote" key={block.id}>
          <p>"{block.content}"</p>
        </blockquote>
      );
    case 'callout':
      return (
        <div className="blog-callout" key={block.id}>
          <span className="blog-callout-icon">💡</span>
          <p>{block.content}</p>
        </div>
      );
    default:
      return null;
  }
};

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeId, setActiveId] = useState('');
  const articleRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    loadBlogDetails();
    setLiked(localStorage.getItem(`blog_liked_${id}`) === 'true');
    setBookmarked(localStorage.getItem(`blog_bookmarked_${id}`) === 'true');
  }, [id]);

  useEffect(() => {
    if (!blog?.content) return;
    const toc = buildTOC(blog.content);
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    toc.forEach(({ id: hid }) => {
      const el = document.getElementById(hid);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [blog]);

  const loadBlogDetails = async () => {
    try {
      setLoading(true);
      const snap = await getDocs(collection(db, 'blogs'));
      const blogData = snap.docs.map(d => ({ id: d.id, ...d.data() })).find(b => b.id === id);
      setBlog(blogData);
      setLikeCount(blogData?.likes || 0);
    } catch (err) {
      console.error('Error loading blog details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!blog) return;
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`blog_liked_${id}`, next);
    setLikeCount(c => next ? c + 1 : c - 1);
    try {
      await updateDoc(doc(db, 'blogs', id), { likes: increment(next ? 1 : -1) });
    } catch (err) { console.error(err); }
  };

  const handleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(`blog_bookmarked_${id}`, next);
    if (next) alert('Post bookmarked! 📌');
  };

  if (loading) {
    return (
      <div>
        <Nav />
        <div className="bd-page">
          <div className="bd-loading">Loading blog...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Nav />
        <div className="bd-page">
          <div className="bd-loading">Blog not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const toc = buildTOC(blog.content || []);
  const blogText = (blog.content || [])
    .filter(b => b.type === 'paragraph')
    .map(b => b.content)
    .join(' ')
    .slice(0, 1000);
  const encodedText = encodeURIComponent(`Summarise this blog for me: ${blogText}`);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div>
      <SEO
        title={blog?.headerText || blog?.topic || 'Blog Post'}
        description={blog?.excerpt || blog?.summary || 'Read this Strix Production blog post.'}
        canonical={`https://www.strixproduction.com/blog/${id}`}
      />
      <Nav />

      <div className="bd-page">

        {/* 1. back button */}
        <div className="bd-back-row">
          <Link href="/blog" className="back-button">
            <ArrowLeft size={16} /> Return to Blog
          </Link>
        </div>

        {/* 2. title — centered */}
        <div className="bd-hero-title-block">
          <h1 className="bd-hero-heading">{blog.headerText || blog.topic}</h1>
        </div>

        {/* 3. AI summarise bar */}
        <div className="bd-ai-bar-wrapper">
          <div className="bd-ai-bar-line"></div>
          <div className="bd-ai-bar">
            <span className="bd-ai-text">Summarises with</span>
            <a href={`https://chat.openai.com/?q=${encodedText}`} target="_blank" rel="noopener noreferrer" className="bd-ai-icon-btn" title="Summarise with ChatGPT">
              <img src="/assets/img/chatgpt.svg" className="bd-ai-icon" alt="ChatGPT" />
            </a>
            <a href={`https://claude.ai/new?q=${encodedText}`} target="_blank" rel="noopener noreferrer" className="bd-ai-icon-btn" title="Summarise with Claude">
              <img src="/assets/img/claude.svg" className="bd-ai-icon" alt="Claude" />
            </a>
            <a href={`https://gemini.google.com/app?q=${encodedText}`} target="_blank" rel="noopener noreferrer" className="bd-ai-icon-btn" title="Summarise with Gemini">
              <img src="/assets/img/gemini.svg" className="bd-ai-icon" alt="Gemini" />
            </a>
          </div>
          <div className="bd-ai-bar-line"></div>
        </div>

        {/* 4. hero image */}
        {blog.detailsImage && (
          <div className="bd-hero-wrap">
            <img className="bd-hero-img" src={blog.detailsImage} alt={blog.headerText || blog.topic} />
          </div>
        )}

        {/* 5. three-column content */}
        <div className="bd-columns">

          {/* LEFT sidebar — share + actions */}
          <aside className="bd-sidebar-left">
            <p className="bd-posted">Posted: {blog.date || ''}</p>

            <div className="bd-share-block">
              <p className="bd-share-label">SHARE</p>
              <div className="bd-social-icons">
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="bd-social-btn" title="LinkedIn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="bd-social-btn" title="Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(blog.headerText || blog.topic || '')}`} target="_blank" rel="noopener noreferrer" className="bd-social-btn" title="X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <button className="bd-social-btn" title="Copy link" onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied! 📋'); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* <div className="bd-actions">
              <button className={`bd-action-btn ${liked ? 'bd-action-btn--active' : ''}`} onClick={handleLike} title="Like">
                <img className="reaction" src={Love} alt="Like" />
                {likeCount > 0 && <span className="bd-like-count">{likeCount}</span>}
              </button>
              <button className={`bd-action-btn ${bookmarked ? 'bd-action-btn--active' : ''}`} onClick={handleBookmark} title="Bookmark">
                <img className="reaction" src={Save} alt="Bookmark" />
              </button>
            </div> */}
          </aside>

          {/* MIDDLE article */}
          <article className="bd-article" ref={articleRef}>
            {/* <h1 className="bd-title">{blog.headerText || blog.topic}</h1> */}
            {blog.content && blog.content.length > 0 ? (
              blog.content.map(block => (
                <React.Fragment key={block.id}>
                  {renderContent(block)}
                </React.Fragment>
              ))
            ) : (
              <p className="blog-writeup">No content available.</p>
            )}
          </article>

          {/* RIGHT sidebar — TOC */}
          {toc.length > 0 && (
            <aside className="bd-sidebar-right">
              <nav className="bd-toc-card">
                <p className="bd-toc-title">Table of contents</p>
                <ul className="bd-toc-list">
                  {toc.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`bd-toc-link ${activeId === item.id ? 'bd-toc-link--active' : ''}`}
                        onClick={e => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        <span className="bd-toc-num">{index + 1}.</span> {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="/contact" className="bd-toc-cta">Book a free call ↗</a>
              </nav>
            </aside>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;