"use client"
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import Link from 'next/link'
import "@/app/style/Project.css"
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import Carousel from '../components/carousel'
const ProjectCircle = "/assets/img/project-circle.webp"
import BtnNormsall from '../components/normSmall-btn'
const Connect = "/assets/img/connect.svg"
import SlideInFramerOnLoad from '../animations/SlideInFramerOnLoad'
const Arrow = "/assets/img/arrow-right.svg"
import Loop from '../components/Loop'
const BookBg = "/assets/img/book-con.webp"
const BookTxt = "/assets/img/Book-txt.png"
const Blur1 = "/assets/img/p-blur2.png"
const Blur2 = "/assets/img/p-blur1.png"
const Blur3 = "/assets/img/p-blur3.png"
const Blur4 = "/assets/img/p-blur4.png"
const Blur5 = "/assets/img/p-blur3.png"
const Blur6 = "/assets/img/p-blur4.png"
const Blur7 = "/assets/img/blur5.png"
const Blur8 = "/assets/img/p-blur6.png"

import RotateCardsScroll from '../animations/RotateCardsScroll'
import SlideInFramerAuto from '../animations/SlideInFramer'
import ScaleInLoad from '../animations/ScaleInLoad'
import SplitTextOnLoad from '../animations/SplitTextOnLoad'
import StaggerOnScroll from '../animations/StaggerOnScroll'
import SmoothScrollGSAP from '../animations/SmoothScrollGSAP'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB3i7GvHlnib2GCCyR37H5XC7aANbPMVIc",
  authDomain: "strix-production-402d4.firebaseapp.com",
  projectId: "strix-production-402d4",
  storageBucket: "strix-production-402d4.firebasestorage.app",
  messagingSenderId: "207095143719",
  appId: "1:207095143719:web:ef9c4d4a3482131da5dd02",
  measurementId: "G-0MVYMSZCWX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FILTERS = {
  Design: ['UI/UX', 'Graphics', 'Branding', 'App Design', 'Web Design'],
  Development: ['Website', 'Web-app', 'Application', 'E-commerce', 'Landing page'],
  Production: ['3D', 'Promos', 'Long Format', 'Reels/shorts', 'Motion Graphics']
};

// Filter Modal Component
const FilterModal = ({ category, activeSubFilter, onClose, onFilterSelect, onCategorySelect }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className={`filter-modal-item ${!activeSubFilter ? 'active' : ''}`}
          onClick={() => onCategorySelect(category)}
        >
          All {category}
        </button>
        {FILTERS[category].map((subFilter) => (
          <button
            key={subFilter}
            className={`filter-modal-item ${activeSubFilter === subFilter ? 'active' : ''}`}
            onClick={() => onFilterSelect(category, subFilter)}
          >
            {subFilter}
          </button>
        ))}
      </div>
    </div>
  );
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSubFilter, setActiveSubFilter] = useState('');
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);    /*new*/
  const searchParams = useSearchParams()
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  
  useEffect(() => {
    if (projects.length === 0) return
    const filter = searchParams.get('filter')
    if (!filter) return

    for (const [category, options] of Object.entries(FILTERS)) {
      if (options.includes(filter)) {
        handleSubFilterClick(category, filter)
        break
      }
    }
  }, [searchParams, projects])

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const q = query(
        collection(db, 'projects'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      );

      // Safety timeout: if Firestore takes too long, stop loading spinner
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 10000);

      const querySnapshot = await getDocs(q);
      clearTimeout(timeout);

      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
      setFilteredProjects(projectsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading projects:', error);
      setLoading(false);
    }
  };

  const handleFilterClick = (category) => {
    if (category === 'All') {
      setActiveFilter('All');
      setActiveSubFilter('');
      setFilteredProjects(projects);
      setOpenModal(null);
    } else {
      setOpenModal(category);
    }
  };

  const handleSubFilterClick = (category, subFilter) => {
    setActiveFilter(category);
    setActiveSubFilter(subFilter);
    setOpenModal(null);

    const filtered = projects.filter(project => {
      const filters = project.filters || {};
      const categoryFilters = filters[category] || [];
      return categoryFilters.includes(subFilter);
    });

    setFilteredProjects(filtered);
  };

  const handleCategoryFilterClick = (category) => {
    setActiveFilter(category);
    setActiveSubFilter('');
    setOpenModal(null);

    const filtered = projects.filter(project => {
      const filters = project.filters || {};
      return filters[category] && filters[category].length > 0;
    });

    setFilteredProjects(filtered);
  };

  const closeModal = () => {
    setOpenModal(null);
  };

  return (
    <div>
      <SEO
        title="Our Creative Portfolio & Client Work Showcase"
        description="Browse Strix's portfolio of completed projects spanning UI/UX design, web development, software solutions, and commercial video production for global brands."
        canonical="https://www.strixproduction.com/Project"
      />
      <Nav />
      {/* <SmoothScrollGSAP/> */}
      <RotateCardsScroll />
      <SlideInFramerAuto />
      <SlideInFramerOnLoad />
      <ScaleInLoad />
      <SplitTextOnLoad />
      <StaggerOnScroll />

      <div className="project-hero">
        <h1 className='project-hero-h1 slideinLoad'>Projects</h1>
        <p className='project-hero-p slideinLoad'>Explore how we craft experiences that work and wow - one project at a time</p>
        <div className='project-carousel-con'>
          <img src={ProjectCircle} className='ProjectCircle scaleLoad' alt="Project Circle" />
          <h2>Latest Projects</h2>
          <Carousel />
        </div>
        <img src={Blur1} className='p-blur1' alt="Blur" />
        <img src={Blur2} className='p-blur2' alt="Blur" />
      </div>

      <div className='project-p-btn'>
        <p onClick={() => handleFilterClick('All')}
          className={activeFilter === 'All' ? 'active link-button-all' : ''}  >All projects</p>
      </div>

      {/* =============================section 2========= */}
      <div className="section2">
        <div className="sec2-btn-con stagger">
          {/* <BtnNormsall 
            text="All" 
            onClick={() => handleFilterClick('All')}
            className={activeFilter === 'All' ? 'active' : ''}
          /> */}
          <BtnNormsall
            text="Design"
            onClick={() => handleFilterClick('Design')}
            className={activeFilter === 'Design' ? 'active' : ''}
          />
          <BtnNormsall
            text="Development"
            onClick={() => handleFilterClick('Development')}
            className={activeFilter === 'Development' ? 'active' : ''}
          />
          <BtnNormsall
            text="Production"
            onClick={() => handleFilterClick('Production')}
            className={activeFilter === 'Production' ? 'active' : ''}
          />
        </div>

        <p className='sec2-p slidein'>
          Explore our work across categories - each project designed to make an impact
          {activeSubFilter && ` • Filtered by: ${activeSubFilter}`}
        </p>

        <div className="p-card-con">
          {loading ? (
            <div className="loading-state">
              <p>Loading projects...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-state">
              <p>No projects found for this {activeSubFilter ? 'filter' : 'category'}.</p>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`p-sec2-card ${index % 2 === 0 ? 'p-sec2-card1' : 'p-sec2-card2'}`}
              >
                <img
                  className='p-sec2-card-img'
                  src={project.image}
                  alt={project.title}
                />
                <p>{project.categoryText}</p>
                <Link className='linkkk' href={project.link || `/case-study/${project.id}`}>
                  <div>
                    <h2>{project.title}</h2>
                    <img src={Arrow} className='icon' alt="Arrow" />
                  </div>
                </Link>
              </div>
            ))
          )}

          <img src={Blur3} className='p-blur3' alt="Blur" />
          <img src={Blur4} className='p-blur4' alt="Blur" />
          <img src={Blur5} className='p-blur5' alt="Blur" />
          <img src={Blur6} className='p-blur6' alt="Blur" />
        </div>

        <p className='sec2-ptxt'>Projects tailored to your industry or need are available on request.</p>
        <BtnNormsall text="Know More" />
      </div>

      <div className="project-logo-loop smoothsection">
        <Loop />
      </div>

      {/* ===============================Book Call================= */}
      <div className="smoothsection book-container">
        <div className="bool-container-card">
          <img src={BookBg} className='bookbg' alt="Book Background" />
          <div className="book-ab">
            <h2 className='delay2'>Turn Your Vision Into an Experience That Lasts</h2>
            <p className='delay3'>You have a story worth sharing — we help you tell it in a way that's impossible to ignore.</p>

            <div className="logo-slider">
              <div className="logo-track">
                {[...Array(2)].map((_, i) => (
                  <React.Fragment key={i}>
                    <img src={BookTxt} alt="" className="loop-img" />
                    <img src={BookTxt} alt="" className="loop-img" />
                    <img src={BookTxt} alt="" className="loop-img" />
                    <img src={BookTxt} alt="" className="loop-img" />
                    <img src={BookTxt} alt="" className="loop-img" />
                    <img src={BookTxt} alt="" className="loop-img" />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        <img src={Blur7} className='blur7' alt="Blur" />
        <img src={Blur8} className='blur8' alt="Blur" />
      </div>

      {/* Filter Modal */}
      {openModal && (
        <FilterModal
          category={openModal}
          activeSubFilter={activeSubFilter}
          onClose={closeModal}
          onFilterSelect={handleSubFilterClick}
          onCategorySelect={handleCategoryFilterClick}
        />
      )}
    </div>
  )
}

export default Project;

























