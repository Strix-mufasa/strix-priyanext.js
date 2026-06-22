// "use client"
// import React, { useState, useEffect } from 'react'


// import Link from 'next/link'
// import Nav from '../components/Navbar'
// import Footer from '../components/Footer'
// import SEO from '../components/SEO'
// import BlogNav from '../components/BlogNav'
// import { ArrowLeft } from 'lucide-react';
// import '@/app/style/blog.css'
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../admin/firebaseconfig'; // Adjust path as needed
// const Shadow1 = "/assets/img/shadow1.webp";
// const Shadow2 = "/assets/img/shadow2.webp";



// const Blog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [filteredBlogs, setFilteredBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All Topics');

//   useEffect(() => {
//     loadBlogs();
//   }, []);

//   useEffect(() => {
//     filterBlogs();
//   }, [searchTerm, selectedCategory, blogs]);

//   const loadBlogs = async () => {
//     try {
//       setLoading(true);
//       const blogsSnap = await getDocs(
//         query(
//           collection(db, 'blogs'),
//           where('status', '==', 'published')
//         )
//       );
//       const blogsData = blogsSnap.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
      
//       // Sort in memory to avoid index requirement
//       blogsData.sort((a, b) => {
//         const dateA = new Date(a.createdAt || 0);
//         const dateB = new Date(b.createdAt || 0);
//         return dateB - dateA;
//       });
      
//       setBlogs(blogsData);
//       setFilteredBlogs(blogsData);
//     } catch (error) {
//       console.error('Error loading blogs:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterBlogs = () => {
//     let filtered = [...blogs];

//     if (selectedCategory !== 'All Topics') {
//       filtered = filtered.filter(blog => 
//         blog.tag?.toLowerCase() === selectedCategory.toLowerCase()
//       );
//     }

//     if (searchTerm.trim()) {
//       const search = searchTerm.toLowerCase();
//       filtered = filtered.filter(blog =>
//         blog.topic?.toLowerCase().includes(search) ||
//         blog.tag?.toLowerCase().includes(search) ||
//         blog.paragraphs?.some(p => p.text?.toLowerCase().includes(search))
//       );
//     }

//     setFilteredBlogs(filtered);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       month: 'numeric', 
//       day: 'numeric', 
//       year: 'numeric' 
//     });
//   };

//   return (
//     <div>
//       <SEO
//         title="Design, Tech & Creative Strategy Insights"
//         description="Read expert articles on UI/UX design, web development, branding, and digital marketing trends from the creative minds at Strix Production."
//         canonical="https://www.strixproduction.com/blog"
//       />
//         <Nav />
//           {/* <ScrollAnimation /> */}
//            {/* <SlideInFramerOnLoad /> */}
//         <div className="blog">
//             <img
//             src={Shadow1}
//             alt=""
//             className="shadow1 absolute top-10 left-0 w-40"
//           />
//           <img
//             src={Shadow2}
//             alt=""
//             className="shadow2 bgsha absolute bottom-0 right-0 w-40"
//           />
//           <div className="blog-top">
//              <Link href='/' className="back-button">
//                 <ArrowLeft size={16} /> Return to Homepage
//               </Link>
//           </div>

//           <h1 className='blog-header slideinLoad'>Our Space to Think and Share</h1>

//             <div className="blog-con">
//                 <div className="blog-nav slideInLeft">
//                   <BlogNav
//                     searchTerm={searchTerm}
//                     setSearchTerm={setSearchTerm}
//                     selectedCategory={selectedCategory}
//                     setSelectedCategory={setSelectedCategory}
//                   />
//                 </div>

//                 <div className="blogcards">
//                   {loading ? (
//                     <div style={{ padding: '40px', textAlign: 'center' }}>
//                       Loading blogs...
//                     </div>
//                   ) : filteredBlogs.length === 0 ? (
//                     <div style={{ padding: '40px', textAlign: 'center' }}>
//                       No blogs found
//                     </div>
//                   ) : (
//                     filteredBlogs.map(blog => (
//                       <Link 
//                         key={blog.id} 
//                         href={`/blog/${blog.id}`}
//                         style={{ textDecoration: 'none', color: 'inherit' }}
//                       >
//                         <div className="blogcard scrollReveal">
//                           <div className="blog-card">
//                             <img 
//                               src={blog.image || '/placeholder.png'} 
//                               alt={blog.topic}
//                               onError={(e) => {
//                                 e.target.src = '/placeholder.png';
//                               }}
//                             />
//                           </div>
//                           <div className="blog-details">
//                             <p className='blog-tag'>{blog.tag || 'General'}</p>
//                             <p className="blog-date">{formatDate(blog.date)}</p>
//                             <p className="description-blog">{blog.topic}</p>
//                           </div>
//                         </div>
//                       </Link>
//                     ))
//                   )}
//                 </div>
//             </div>
//         </div>
//         <Footer /> 
//     </div>
//   )
// }

// export default Blog

"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import BlogNav from '../components/BlogNav'
import BlogCard from '../components/BlogCard'
import { ArrowLeft } from 'lucide-react';
import '@/app/style/blog.css'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../admin/firebaseconfig';

const Shadow1 = "/assets/img/shadow1.webp";
const Shadow2 = "/assets/img/shadow2.webp";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Topics');

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [searchTerm, selectedCategory, blogs]);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      const blogsSnap = await getDocs(
        query(
          collection(db, 'blogs'),
          where('status', '==', 'published')
        )
      );
      const blogsData = blogsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by date (newest first)
      blogsData.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date || 0);
        const dateB = new Date(b.createdAt || b.date || 0);
        return dateB - dateA;
      });
      
      setBlogs(blogsData);
      setFilteredBlogs(blogsData);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = () => {
    let filtered = [...blogs];

    // Filter by category
    if (selectedCategory !== 'All Topics') {
      filtered = filtered.filter(blog => 
        blog.tag?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.topic?.toLowerCase().includes(search) ||
        blog.tag?.toLowerCase().includes(search) ||
        blog.headerText?.toLowerCase().includes(search)
      );
    }

    setFilteredBlogs(filtered);
  };

  return (
    <div>
      <SEO
        title="Design, Tech & Creative Strategy Insights"
        description="Read expert articles on UI/UX design, web development, branding, and digital marketing trends from the creative minds at Strix Production."
        canonical="https://www.strixproduction.com/blog"
      />
      <Nav />
      
      <div className="blog">
        {/* Background shadows */}
        <img
          src={Shadow1}
          alt=""
          className="shadow1 absolute top-10 left-0 w-40"
        />
        <img
          src={Shadow2}
          alt=""
          className="shadow2 bgsha absolute bottom-0 right-0 w-40"
        />

        {/* Back button */}
        <div className="blog-top">
          <Link href='/' className="back-button">
            <ArrowLeft size={16} /> Return to Homepage
          </Link>
        </div>

        {/* Main heading */}
        <h1 className='blog-header slideinLoad'>Our Space to Think and Share</h1>
        <p className='blog-subheader slideinLoad'>Expert Perspectives on Design, Development & Product Strategy</p>

        {/* Blog container with sidebar and grid */}
        <div className="blog-con">
          {/* Sidebar with search and filters */}
          <div className="blog-nav slideInLeft">
            <BlogNav
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Blog grid */}
          <div className="blog-grid-container">
            {loading ? (
              <div className="loading-state">
                <p>Loading blogs...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div className="empty-state">
                <p>No blogs found. Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="blog-grid">
                {filteredBlogs.map(blog => (
                  <Link 
                    key={blog.id} 
                    href={`/blog/${blog.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <BlogCard blog={blog} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer /> 
    </div>
  )
}

export default Blog






















