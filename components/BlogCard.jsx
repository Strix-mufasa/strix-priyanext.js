"use client"
import React from 'react'

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="blog-card-wrapper scrollReveal">
      <div className="blog-card-image-container">
        <img 
          src={blog.image || '/placeholder.png'} 
          alt={blog.topic}
          className="blog-card-image"
          onError={(e) => {
            e.target.src = '/placeholder.png';
          }}
        />
        {/* Optional: Add overlay for hover effect */}
        <div className="blog-card-overlay"></div>
      </div>
      
      <div className="blog-card-content">
        <div className="blog-card-meta">
          <span className="blog-card-tag">{blog.tag || 'General'}</span>
          <span className="blog-card-date">{formatDate(blog.date || blog.createdAt)}</span>
        </div>
        
        <h3 className="blog-card-title">{blog.topic}</h3>
      </div>
    </div>
  )
}

export default BlogCard