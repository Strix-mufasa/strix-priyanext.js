"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import Nav from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import BlogNav from '../components/BlogNav';
import { ArrowLeft } from 'lucide-react';
import '@/app/style/blog.css';

import { collection, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../admin/firebaseconfig';

const Shadow1 = "/assets/img/shadow1.webp";
const Shadow2 = "/assets/img/shadow2.webp";
const Love   = "/assets/img/love.svg";
const Save   = "/assets/img/save.svg";
const Share  = "/assets/img/share.svg";

/* ─── helpers ─────────────────────────────────────────────── */

/** Pull every subheading block out of content and build a TOC list */
const buildTOC = (content = []) =>
  content
    .filter(b => b.type === 'subheading' && b.content?.trim())
    .map(b => ({
      id:    `sh-${b.id}`,
      label: b.content.trim(),
    }));

/** Slugify a subheading id so we can scroll to it */
const headingId = (blockId) => `sh-${blockId}`;

/* ─── content renderer ────────────────────────────────────── */

const renderContent = (block) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="blog-writeup" key={block.id}>
          {block.content}
        </p>
      );

    case 'image':
      return (
        <React.Fragment key={block.id}>
          <img
            className="blog-content-image"
            src={block.content}
            alt={block.caption || 'Blog content'}
          />
          {block.caption && (
            <p className="blog-image-caption">{block.caption}</p>
          )}
        </React.Fragment>
      );

    case 'subheading':
      return (
        <h2
          id={headingId(block.id)}
          className="blog-subheading"
          key={block.id}
        >
          {block.content}
        </h2>
      );

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

/* ─── main component ──────────────────────────────────────── */

const BlogDetails = () => {
  const { id } = useParams();
  const [blog,       setBlog]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [liked,      setLiked]      = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount,  setLikeCount]  = useState(0);
  const [activeId,   setActiveId]   = useState('');
  const articleRef = useRef(null);

  /* ── load ── */
  useEffect(() => {
    loadBlogDetails();
    setLiked(localStorage.getItem(`blog_liked_${id}`) === 'true');
    setBookmarked(localStorage.getItem(`blog_bookmarked_${id}`) === 'true');
  }, [id]);

  /* ── TOC active highlight on scroll ── */
  useEffect(() => {
    if (!blog?.content) return;
    const toc = buildTOC(blog.content);
    if (!toc.length) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
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
      const blogData = snap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .find(b => b.id === id);
      setBlog(blogData);
      setLikeCount(blogData?.likes || 0);
    } catch (err) {
      console.error('Error loading blog details:', err);
    } finally {
      setLoading(false);
    }
  };

  /* ── interactions ── */
  const handleLike = async () => {
    if (!blog) return;
    const next = !liked;
    setLiked(next);
    localStorage.setItem(`blog_liked_${id}`, next);
    setLikeCount(c => next ? c + 1 : c - 1);
    try {
      await updateDoc(doc(db, 'blogs', id), {
        likes: increment(next ? 1 : -1),
      });
    } catch (err) {
      console.error('Error updating likes:', err);
    }
  };

  const handleBookmark = () => {
    const next = !bookmarked;
    setBookmarked(next);
    localStorage.setItem(`blog_bookmarked_${id}`, next);
    if (next) alert('Post bookmarked! 📌');
  };

  const handleShare = async () => {
    const shareData = {
      title: blog?.headerText || blog?.topic,
      text:  'Check out this blog post!',
      url:   window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! 📋');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  /* ── loading / not found states ── */
  if (loading) {
    return (
      <div>
        <Nav />
        <img src={Shadow1} alt="" className="shadow1 absolute top-10 left-0 w-40" />
        <img src={Shadow2} alt="" className="shadow2 absolute bottom-0 right-0 w-40" />
        <div className="blog">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            Loading blog details...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div>
        <Nav />
        <div className="blog">
          <div style={{ padding: '40px', textAlign: 'center' }}>Blog not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const toc = buildTOC(blog.content || []);

  /* ── render ── */
  return (
    <div>
      <SEO
        title={blog?.headerText || blog?.topic || 'Blog Post'}
        description={blog?.excerpt || blog?.summary || 'Read this Strix Production blog post.'}
        canonical={`https://www.strixproduction.com/blog/${id}`}
      />
      <Nav />

      <div className="blog blog-detail-page">

        {/* ── back button ── */}
        <div className="blog-top">
          <Link href="/blog">
            <button className="back-button">
              <ArrowLeft size={16} /> Return to Blog
            </button>
          </Link>
        </div>

        {/* ── full-width hero image ── */}
        {blog.detailsImage && (
          <div className="bd-hero-image-wrap">
            <img
              className="bd-hero-image"
              src={blog.detailsImage}
              alt={blog.headerText || blog.topic}
            />
          </div>
        )}

        {/* ── two-column body ── */}
        <div className="bd-body">

          {/* ── LEFT SIDEBAR ── */}
          <aside className="bd-sidebar">

            {/* Tag + date */}
            <div className="bd-meta">
              {blog.tag && <span className="blog-tag">{blog.tag}</span>}
              {blog.date && <span className="bd-date">{blog.date}</span>}
            </div>

            {/* Social actions */}
            <div className="bd-actions">
              <button
                className={`bd-action-btn ${liked ? 'active' : ''}`}
                onClick={handleLike}
                title="Like"
              >
                <img className="reaction" src={Love} alt="Like" />
                {likeCount > 0 && <span className="bd-like-count">{likeCount}</span>}
              </button>

              <button
                className={`bd-action-btn ${bookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
                title="Bookmark"
              >
                <img className="reaction" src={Save} alt="Bookmark" />
              </button>

              <button
                className="bd-action-btn"
                onClick={handleShare}
                title="Share"
              >
                <img className="reaction" src={Share} alt="Share" />
              </button>
            </div>

            {/* Table of contents */}
            {toc.length > 0 && (
              <nav className="bd-toc">
                <p className="bd-toc-title">Table of Contents</p>
                <ul className="bd-toc-list">
                  {toc.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`bd-toc-link ${activeId === item.id ? 'bd-toc-link--active' : ''}`}
                        onClick={e => {
                          e.preventDefault();
                          document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </aside>

          {/* ── RIGHT ARTICLE CONTENT ── */}
          <article className="bd-article" ref={articleRef}>
            {/* Title */}
            <h1 className="bd-article-title">
              {blog.headerText || blog.topic}
            </h1>

            {/* All content blocks in order */}
            {blog.content && blog.content.length > 0 ? (
              blog.content.map(block => (
                <div key={block.id}>
                  {renderContent(block)}
                </div>
              ))
            ) : (
              <p className="blog-writeup">No content available.</p>
            )}
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetails;



