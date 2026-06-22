"use client"
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X, LogOut, Check } from 'lucide-react';
import { auth, db } from './firebaseconfig';
import { uploadImage } from './storage';
import { setLogLevel } from "firebase/firestore";
setLogLevel('debug');

// import '@/app/style/admin.css';
import './style/admin.css';

const FILTERS = {
  Design: ['UI/UX', 'Graphics', 'Branding', 'App Design', 'Web Design'],
  Development: ['Website', 'Web-app', 'Application', 'E-commerce', 'Landing page'],
  Production: ['3D', 'Promos', 'Long Format', 'Reels/shorts', 'Motion Graphics']
};

const INDUSTRIES = ['SaaS', 'FinTech', 'Gaming', 'AI', 'Enterprise', 'Startups'];
const getDataSize = (data) => {
  return new Blob([JSON.stringify(data)]).size;
};

const TECHNOLOGY_OPTIONS = {
  design: [
    { name: 'Figma' },
    { name: 'Illustrator' },
    { name: 'Photoshop' }
  ],
  development: [
    { name: 'HTML5' },
    { name: 'CSS3' },
    { name: 'React' },
    { name: 'Next.js' },
    { name: 'JavaScript' }
  ],
  production: [
    { name: 'After Effects' },
    { name: 'Blender' },
    { name: 'Premiere Pro' }
  ]
};


const splitSectionData = (sectionName, sectionData) => {
  const result = { main: {}, chunks: {} };
  const dataSize = getDataSize(sectionData);

  console.log(`Section ${sectionName} size: ${dataSize} bytes`);

  if (dataSize < 150000) {
    result.main = sectionData;
    return result;
  }

  switch (sectionName) {
    case 'hero':
      result.main = { heroVideo: sectionData.heroVideo };
      if (sectionData.heroThumbnail) {
        result.chunks['hero_thumbnail'] = { heroThumbnail: sectionData.heroThumbnail };
      }
      break;

    case 'client':
      result.main = {
        client: {
          name: sectionData.client?.name || '',
          industry: sectionData.client?.industry || '',
          country: sectionData.client?.country || '',
          services: sectionData.client?.services || ''
        }
      };
      if (sectionData.client?.logo) {
        result.chunks['client_logo'] = { logo: sectionData.client.logo };
      }
      break;

    case 'about':
      result.main = {
        aboutProject: {
          description: sectionData.aboutProject?.description || '',
          experienceLink: sectionData.aboutProject?.experienceLink || ''
        }
      };
      const aboutImages = sectionData.aboutProject?.images || [];
      if (Array.isArray(aboutImages)) {
        aboutImages.forEach((img, index) => {
          if (img) {
            result.chunks[`about_image_${index}`] = { image: img, index };
          }
        });
      }
      break;

    case 'process':
      result.main = { processCards: [] };
      const processCards = sectionData.processCards || [];
      processCards.forEach((card, index) => {
        result.chunks[`process_card_${index}`] = { card, index };
      });
      break;

    case 'concepts':
      result.main = { conceptSlides: [] };
      const conceptSlides = sectionData.conceptSlides || [];
      conceptSlides.forEach((slide, index) => {
        if (slide) {
          result.chunks[`concept_slide_${index}`] = { slide, index };
        }
      });
      break;

    case 'design':
      result.main = { designSystemImage: '' };
      if (sectionData.designSystemImage) {
        result.chunks['design_image'] = { designSystemImage: sectionData.designSystemImage };
      }
      break;

    case 'responsive':
      result.main = { responsiveImages: [] };
      const responsiveImages = sectionData.responsiveImages || [];
      responsiveImages.forEach((img, index) => {
        if (img) {
          result.chunks[`responsive_image_${index}`] = { image: img, index };
        }
      });
      break;

    default:
      result.main = sectionData;
  }

  return result;
};

const reconstructSectionData = (mainData, chunks) => {
  const reconstructed = { ...mainData };

  chunks.forEach(chunk => {
    const { sectionName, data } = chunk;

    if (sectionName === 'hero_thumbnail') {
      reconstructed.heroThumbnail = data.heroThumbnail;
    }
    else if (sectionName === 'client_logo') {
      if (!reconstructed.client) reconstructed.client = {};
      reconstructed.client.logo = data.logo;
    }
    else if (sectionName.startsWith('about_image_')) {
      if (!reconstructed.aboutProject) {
        reconstructed.aboutProject = {
          description: '',
          experienceLink: '',
          images: []
        };
      }
      if (!Array.isArray(reconstructed.aboutProject.images)) {
        reconstructed.aboutProject.images = [];
      }
      // Preserve experienceLink from main data if it exists
      if (reconstructed.aboutProject.experienceLink === '' && mainData.aboutProject?.experienceLink) {
        reconstructed.aboutProject.experienceLink = mainData.aboutProject.experienceLink;
      }
      reconstructed.aboutProject.images[data.index] = data.image;
    }
    else if (sectionName.startsWith('process_card_')) {
      if (!Array.isArray(reconstructed.processCards)) {
        reconstructed.processCards = [];
      }
      reconstructed.processCards[data.index] = data.card;
    }
    else if (sectionName.startsWith('concept_slide_')) {
      if (!Array.isArray(reconstructed.conceptSlides)) {
        reconstructed.conceptSlides = Array(9).fill('');
      }
      reconstructed.conceptSlides[data.index] = data.slide;
    }
    else if (sectionName === 'design_image') {
      reconstructed.designSystemImage = data.designSystemImage;
    }
    else if (sectionName.startsWith('responsive_image_')) {
      if (!Array.isArray(reconstructed.responsiveImages)) {
        reconstructed.responsiveImages = Array(8).fill('');
      }
      reconstructed.responsiveImages[data.index] = data.image;
    }
  });

  return reconstructed;
};

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        loadData();
      }
    });
    return unsubscribe;
  }, []);

  const loadData = async () => {
    try {
      const projectsSnap = await getDocs(query(collection(db, 'projects'), orderBy('createdAt', 'desc')));
      setProjects(projectsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const blogsSnap = await getDocs(query(collection(db, 'blogs'), orderBy('createdAt', 'desc')));
      setBlogs(blogsSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const caseSnap = await getDocs(query(collection(db, 'caseStudies'), orderBy('createdAt', 'desc')));

      const caseStudiesWithChunks = await Promise.all(
        caseSnap.docs.map(async (caseDoc) => {
          const mainData = { id: caseDoc.id, ...caseDoc.data() };
          const chunksSnap = await getDocs(collection(db, `caseStudies/${caseDoc.id}/chunks`));
          const chunks = chunksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Add defensive check
          const reconstructed = reconstructSectionData(mainData, chunks);

          // Ensure all arrays exist with default values
          return {
            ...reconstructed,
            aboutProject: {
              description: reconstructed.aboutProject?.description || '',
              images: Array.isArray(reconstructed.aboutProject?.images)
                ? reconstructed.aboutProject.images
                : ['', '', '']
            },
            processCards: Array.isArray(reconstructed.processCards)
              ? reconstructed.processCards
              : Array(3).fill(null).map(() => ({ icon: '', hours: '', title: '', details: ['', '', ''] })),
            conceptSlides: Array.isArray(reconstructed.conceptSlides)
              ? reconstructed.conceptSlides
              : Array(9).fill(''),
            responsiveImages: Array.isArray(reconstructed.responsiveImages)
              ? reconstructed.responsiveImages
              : Array(8).fill(''),
            technologies: reconstructed.technologies || { design: [], development: [], production: [] },
            results: Array.isArray(reconstructed.results)
              ? reconstructed.results
              : Array(4).fill(null).map(() => ({ title: '', description: '' }))
          };
        })
      );

      setCaseStudies(caseStudiesWithChunks);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="admin-loading">Loading...</div>;
  }

  if (!user) {
    return <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleLogin={handleLogin} />;
  }

  return (
    <div className="admin-panel">
      <Header user={user} handleLogout={handleLogout} />
      <div className="admin-container">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} setShowForm={setShowForm} setEditingItem={setEditingItem} />

        {showForm ? (
          activeTab === 'projects' ? (
            <ProjectForm
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              setShowForm={setShowForm}
              loadData={loadData}
            />
          ) : activeTab === 'caseStudies' ? (
            <CaseStudyForm
              projects={projects}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              setShowForm={setShowForm}
              loadData={loadData}
            />
          ) : (
            <BlogForm
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              setShowForm={setShowForm}
              loadData={loadData}
            />
          )
        ) : (
          <DataTable
            activeTab={activeTab}
            items={activeTab === 'projects' ? projects : activeTab === 'caseStudies' ? caseStudies : blogs}
            setShowForm={setShowForm}
            setEditingItem={setEditingItem}
            loadData={loadData}
          />
        )}
      </div>
    </div>
  );
};

const LoginForm = ({ email, setEmail, password, setPassword, handleLogin }) => (
  <div className="login-wrapper">
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          required
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  </div>
);

const Header = ({ user, handleLogout }) => (
  <header className="admin-header">
    <div className="header-content">
      <h1 className="header-title">Admin Panel</h1>
      <div className="header-actions">
        <span className="header-email">{user.email}</span>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  </header>
);

const Tabs = ({ activeTab, setActiveTab, setShowForm, setEditingItem }) => (
  <div className="tabs-container">
    <div className="tabs">
      <button
        onClick={() => { setActiveTab('projects'); setShowForm(false); setEditingItem(null); }}
        className={`tab ${activeTab === 'projects' ? 'tab-active' : ''}`}
      >
        Project Cards
      </button>
      <button
        onClick={() => { setActiveTab('caseStudies'); setShowForm(false); setEditingItem(null); }}
        className={`tab ${activeTab === 'caseStudies' ? 'tab-active' : ''}`}
      >
        Case Studies
      </button>
      <button
        onClick={() => { setActiveTab('blogs'); setShowForm(false); setEditingItem(null); }}
        className={`tab ${activeTab === 'blogs' ? 'tab-active' : ''}`}
      >
        Blogs
      </button>
    </div>
    <button onClick={() => { setShowForm(true); setEditingItem(null); }} className="add-new-button">
      <Plus size={20} /> Add New
    </button>
  </div>
);

const ProjectForm = ({ editingItem, setEditingItem, setShowForm, loadData }) => {
  const [formData, setFormData] = useState({
    title: '',
    categoryText: '',
    link: '',
    externalLink: '',
    image: '',
    filters: { Design: [], Development: [], Production: [] },
    industry: [],
    status: 'draft'
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        title: '',
        categoryText: '',
        link: '',
        externalLink: '',
        image: '',
        filters: { Design: [], Development: [], Production: [] },
        industry: [],
        status: 'draft'
      });
    }
  }, [editingItem]);

  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        setSaving(true);
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (error) {
          alert("Image upload failed: " + error.message);
          setSaving(false);
          return;
        }
      }

      const data = { ...formData, image: imageUrl, updatedAt: new Date().toISOString() };

      if (editingItem) {
        await updateDoc(doc(db, 'projects', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'projects'), { ...data, createdAt: new Date().toISOString() });
      }

      await loadData('projects');
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      alert('Error saving project: ' + error.message);
    }
    setSaving(false);
  };

  const toggleFilter = (category, value) => {
    setFormData(prev => {
      const filters = { ...prev.filters };
      const index = filters[category].indexOf(value);
      if (index > -1) {
        filters[category] = filters[category].filter(v => v !== value);
      } else {
        filters[category] = [...filters[category], value];
      }
      return { ...prev, filters };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-header">
        <h2 className="form-title">{editingItem ? 'Edit' : 'Add'} Project Card</h2>
        <button type="button" onClick={() => setShowForm(false)} className="close-button">
          <X size={24} />
        </button>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => {
              const title = e.target.value;
              const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              setFormData({ 
                ...formData, 
                title: title, 
                link: editingItem ? formData.link : `/case-study/${slug}`
              });
            }}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category Text (e.g., "UI/UX Design, Development")</label>
          <input
            type="text"
            value={formData.categoryText}
            onChange={(e) => setFormData({ ...formData, categoryText: e.target.value })}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Link/Slug (Internal)</label>
          <input
            type="text"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            className="form-input"
            placeholder="e.g., /case-study/project-name"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Experiment / External Link</label>
          <input
            type="url"
            value={formData.externalLink || ''}
            onChange={(e) => setFormData({ ...formData, externalLink: e.target.value })}
            className="form-input"
            placeholder="https://example.com/experiment"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Project Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="form-input-file"
          />
          {formData.image && <img src={formData.image} alt="Preview" className="image-preview" />}
        </div>

        <div className="filters-section">
          <h3 className="section-title">Filters (Select Multiple)</h3>
          {Object.entries(FILTERS).map(([category, options]) => (
            <div key={category} className="filter-category">
              <h4 className="filter-category-title">{category}</h4>
              <div className="filter-options">
                {options.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleFilter(category, option)}
                    className={`filter-option ${formData.filters[category].includes(option) ? 'filter-option-active' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="filters-section">
          <h3 className="section-title">Industry (Select Multiple)</h3>
          <div className="filter-options">
            {INDUSTRIES.map(industry => (
              <button
                key={industry}
                type="button"
                onClick={() => {
                  setFormData(prev => {
                    const list = prev.industry || [];
                    return {
                      ...prev,
                      industry: list.includes(industry)
                        ? list.filter(i => i !== industry)
                        : [...list, industry]
                    };
                  });
                }}
                className={`filter-option ${(formData.industry || []).includes(industry) ? 'filter-option-active' : ''}`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>






        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="form-select"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={saving} className="submit-button">
        <Save size={20} /> {saving ? 'Saving...' : 'Save Project'}
      </button>
    </form>
  );
};

const CaseStudyForm = ({ projects, editingItem, setEditingItem, setShowForm, loadData }) => {
  const [caseStudyId, setCaseStudyId] = useState(null);
  const [formData, setFormData] = useState({
    projectId: '',
    heroVideo: '',
    heroThumbnail: '',
    projectTitle: '',
    client: { name: '', logo: '', industry: '', country: '', services: '' },
    aboutProject: { description: '', experienceLink: '', images: ['', '', ''] },
    processCards: Array(3).fill(null).map(() => ({ icon: '', hours: '', title: '', details: ['', '', ''] })),
    conceptSlides: Array(9).fill(''),
    designSystemImage: '',
    responsiveImages: Array(8).fill(''),
    technologies: { design: [], development: [], production: [] },
    results: Array(4).fill(null).map(() => ({ title: '', description: '' }))
  });

  const [savedSections, setSavedSections] = useState({
    basic: false,
    hero: false,
    client: false,
    about: false,
    process: false,
    concepts: false,
    design: false,
    responsive: false,
    tech: false,
    results: false
  });

  useEffect(() => {
    if (editingItem) {
      setCaseStudyId(editingItem.id);
      setFormData({
        projectId: editingItem.projectId || '',
        heroVideo: editingItem.heroVideo || '',
        heroThumbnail: editingItem.heroThumbnail || '',
        projectTitle: editingItem.projectTitle || '',
        client: editingItem.client || { name: '', logo: '', industry: '', country: '', services: '' },
        aboutProject: editingItem.aboutProject || { description: '', experienceLink: '', images: ['', '', ''] },
        processCards: editingItem.processCards || Array(3).fill(null).map(() => ({ icon: '', hours: '', title: '', details: ['', '', ''] })),
        conceptSlides: editingItem.conceptSlides || Array(9).fill(''),
        designSystemImage: editingItem.designSystemImage || '',
        responsiveImages: editingItem.responsiveImages || Array(8).fill(''),
        technologies: editingItem.technologies || { design: [], development: [], production: [] },
        results: editingItem.results || Array(4).fill(null).map(() => ({ title: '', description: '' }))
      });
      setSavedSections({
        basic: true,
        hero: true,
        client: true,
        about: true,
        process: true,
        concepts: true,
        design: true,
        responsive: true,
        tech: true,
        results: true
      });
    } else {
      setCaseStudyId(null);
      setFormData({
        projectId: '',
        heroVideo: '',
        heroThumbnail: '',
        projectTitle: '',
        client: { name: '', logo: '', industry: '', country: '', services: '' },
        aboutProject: { description: '', experienceLink: '', images: ['', '', ''] },
        processCards: Array(3).fill(null).map(() => ({ icon: '', hours: '', title: '', details: ['', '', ''] })),
        conceptSlides: Array(9).fill(''),
        designSystemImage: '',
        responsiveImages: Array(8).fill(''),
        technologies: { design: [], development: [], production: [] },
        results: Array(4).fill(null).map(() => ({ title: '', description: '' }))
      });
      setSavedSections({
        basic: false,
        hero: false,
        client: false,
        about: false,
        process: false,
        concepts: false,
        design: false,
        responsive: false,
        tech: false,
        results: false
      });
    }
  }, [editingItem]);

  /* New upload handler using Cloudinary */
  const handleFileUpload = async (e, field, index = null, subfield = null) => {
    const file = e.target.files[0];
    if (!file) return;

    // Optional: show a loading toast or small indicator if desired
    // For now we'll just await the upload

    try {
      const imageUrl = await uploadImage(file);

      if (index !== null && subfield) {
        setFormData(prev => {
          const updated = { ...prev };
          if (!updated[field]) updated[field] = [];
          if (!updated[field][index]) updated[field][index] = {};
          updated[field][index][subfield] = imageUrl;
          return updated;
        });
      } else if (index !== null) {
        setFormData(prev => {
          const updated = { ...prev };
          let arr = Array.isArray(updated[field]) ? [...updated[field]] : [];
          if (field === 'responsiveImages' && arr.length < 8) {
            arr = Array(8).fill('');
          } else if (field === 'conceptSlides' && arr.length < 9) {
            arr = Array(9).fill('');
          }
          arr[index] = imageUrl;
          updated[field] = arr;
          return updated;
        });
      } else if (subfield) {
        setFormData(prev => ({
          ...prev,
          [field]: { ...prev[field], [subfield]: imageUrl }
        }));
      } else {
        setFormData(prev => ({ ...prev, [field]: imageUrl }));
      }
    } catch (error) {
      alert('Error uploading file to Cloudinary: ' + error.message);
    }
  };

  const saveSection = async (sectionName, sectionData) => {
    try {
      const timestamp = new Date().toISOString();
      const { main, chunks } = splitSectionData(sectionName, sectionData);

      console.log(`Saving section ${sectionName}:`, {
        mainSize: getDataSize(main),
        chunksCount: Object.keys(chunks).length
      });

      if (!caseStudyId) {
        const docRef = await addDoc(collection(db, 'caseStudies'), {
          ...main,
          createdAt: timestamp,
          updatedAt: timestamp
        });

        const newId = docRef.id;
        setCaseStudyId(newId);

        for (const [chunkName, chunkData] of Object.entries(chunks)) {
          await addDoc(collection(db, `caseStudies/${newId}/chunks`), {
            sectionName: chunkName,
            data: chunkData,
            createdAt: timestamp
          });
        }

        setSavedSections(prev => ({ ...prev, [sectionName]: true }));
        alert(`✅ ${sectionName} section saved successfully!`);
      } else {
        await updateDoc(doc(db, 'caseStudies', caseStudyId), {
          ...main,
          updatedAt: timestamp
        });

        const chunksRef = collection(db, `caseStudies/${caseStudyId}/chunks`);
        const existingChunksSnap = await getDocs(chunksRef);

        const deletePromises = [];
        existingChunksSnap.forEach(chunkDoc => {
          const data = chunkDoc.data();
          if (data.sectionName &&
            (data.sectionName.startsWith(`${sectionName}_`) ||
              data.sectionName === sectionName)) {
            deletePromises.push(deleteDoc(doc(db, `caseStudies/${caseStudyId}/chunks`, chunkDoc.id)));
          }
        });
        await Promise.all(deletePromises);

        for (const [chunkName, chunkData] of Object.entries(chunks)) {
          await addDoc(collection(db, `caseStudies/${caseStudyId}/chunks`), {
            sectionName: chunkName,
            data: chunkData,
            createdAt: timestamp,
            updatedAt: timestamp
          });
        }

        setSavedSections(prev => ({ ...prev, [sectionName]: true }));
        alert(`✅ ${sectionName} section updated successfully!`);
      }

      await loadData();
    } catch (error) {
      console.error(`Error saving ${sectionName}:`, error);
      alert(`Error saving ${sectionName}: ${error.message}`);
    }
  };

  const toggleTechnology = (category, value) => {
    console.log('🔥 Toggle clicked!', category, value);
    console.log('Current technologies:', formData.technologies);

    setFormData(prev => {
      const technologies = { ...prev.technologies };
      console.log('Before toggle:', technologies[category]);

      const index = technologies[category].indexOf(value);
      console.log('Index found:', index);

      if (index > -1) {
        technologies[category] = technologies[category].filter(v => v !== value);
        console.log('Removed:', value);
      } else {
        technologies[category] = [...technologies[category], value];
        console.log('Added:', value);
      }

      console.log('After toggle:', technologies[category]);
      return { ...prev, technologies };
    });
  };

  return (
    <div className="form-container case-study-form">
      <div className="form-header">
        <h2 className="form-title">{editingItem ? 'Edit' : 'Add'} Case Study</h2>
        <button type="button" onClick={() => setShowForm(false)} className="close-button">
          <X size={24} />
        </button>
      </div>

      <div className="form-content">
        {/* SECTION 1: Basic Info */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">1. Basic Information</h3>
            <div className="button-group">
              {!savedSections.basic ? (
                <button
                  type="button"
                  onClick={() => saveSection('basic', {
                    projectId: formData.projectId,
                    projectTitle: formData.projectTitle
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.basic && (
                <button
                  type="button"
                  onClick={() => saveSection('basic', {
                    projectId: formData.projectId,
                    projectTitle: formData.projectTitle
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Select Project</label>
            <select
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>{project.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              value={formData.projectTitle}
              onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
              className="form-input"
              required
            />
          </div>
        </div>

        {/* SECTION 2: Hero Section */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">2. Hero Section</h3>
            <div className="button-group">
              {!savedSections.hero ? (
                <button
                  type="button"
                  onClick={() => saveSection('hero', {
                    heroVideo: formData.heroVideo,
                    heroThumbnail: formData.heroThumbnail
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.hero && (
                <button
                  type="button"
                  onClick={() => saveSection('hero', {
                    heroVideo: formData.heroVideo,
                    heroThumbnail: formData.heroThumbnail
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Hero Video URL (YouTube embed)</label>
            <input
              type="text"
              value={formData.heroVideo}
              onChange={(e) => setFormData({ ...formData, heroVideo: e.target.value })}
              className="form-input"
              placeholder="https://www.youtube.com/embed/zk0mGoyUrLo"
            />
            <p style={{
              fontSize: '13px',
              color: '#666',
              marginTop: '8px',
              background: '#f0f0f0',
              padding: '12px',
              borderRadius: '6px',
              lineHeight: '1.6'
            }}>
              ⚠️ <strong>Important:</strong> Use the <strong>embed URL</strong> format:<br />
              ✅ Correct: <code style={{ background: '#e0e0e0', padding: '2px 6px', borderRadius: '3px' }}>https://www.youtube.com/embed/VIDEO_ID</code><br />
              ❌ Wrong: <code style={{ background: '#ffe0e0', padding: '2px 6px', borderRadius: '3px' }}>https://www.youtube.com/watch?v=VIDEO_ID</code><br />
              <br />
              <strong>How to get embed URL:</strong><br />
              1. Go to your YouTube video<br />
              2. Click "Share" → "Embed"<br />
              3. Copy the URL from the src attribute
            </p>
            {formData.heroVideo && (
              <div className="video-preview-container" style={{ marginTop: '16px' }}>
                <iframe
                  src={formData.heroVideo}
                  title="Hero Video Preview"
                  className="video-preview"
                  style={{ width: '100%', height: '400px', border: 'none', borderRadius: '8px' }}
                  allowFullScreen
                />
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Hero Thumbnail</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'heroThumbnail')} className="form-input-file" />
            {formData.heroThumbnail && <img src={formData.heroThumbnail} className="image-preview" alt="Hero" />}
          </div>
        </div>

        {/* SECTION 3: Client Details */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">3. Client Details</h3>
            <div className="button-group">
              {!savedSections.client ? (
                <button
                  type="button"
                  onClick={() => saveSection('client', {
                    client: formData.client
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.client && (
                <button
                  type="button"
                  onClick={() => saveSection('client', {
                    client: formData.client
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Client Name"
              value={formData.client.name}
              onChange={(e) => setFormData({ ...formData, client: { ...formData.client, name: e.target.value } })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Industry"
              value={formData.client.industry}
              onChange={(e) => setFormData({ ...formData, client: { ...formData.client, industry: e.target.value } })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Country"
              value={formData.client.country}
              onChange={(e) => setFormData({ ...formData, client: { ...formData.client, country: e.target.value } })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Services"
              value={formData.client.services}
              onChange={(e) => setFormData({ ...formData, client: { ...formData.client, services: e.target.value } })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Client Logo</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'client', null, 'logo')} className="form-input-file" />
            {formData.client.logo && <img src={formData.client.logo} className="logo-preview" alt="Logo" />}
          </div>
        </div>

        {/* SECTION 4: About Project */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">4. About Project</h3>
            <div className="button-group">
              {!savedSections.about ? (
                <button
                  type="button"
                  onClick={() => saveSection('about', {
                    aboutProject: formData.aboutProject
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.about && (
                <button
                  type="button"
                  onClick={() => saveSection('about', {
                    aboutProject: formData.aboutProject
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <textarea
            value={formData.aboutProject.description}
            onChange={(e) => setFormData({ ...formData, aboutProject: { ...formData.aboutProject, description: e.target.value } })}
            className="form-textarea"
            placeholder="Project description"
          />

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Experience Button Link</label>
            <input
              type="url"
              value={formData.aboutProject.experienceLink || ''}
              onChange={(e) => setFormData({
                ...formData,
                aboutProject: {
                  ...formData.aboutProject,
                  experienceLink: e.target.value
                }
              })}
              className="form-input"
              placeholder="https://example.com or /page-slug"
            />
          </div>


          <div className="image-grid">
            {[0, 1, 2].map(i => (
              <div key={i} className="image-upload-box">
                <label className="form-label-small">Image {i + 1}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    try {
                      const imageUrl = await uploadImage(file);
                      setFormData(prev => {
                        const currentImages = prev.aboutProject?.images || ['', '', ''];
                        const images = [...currentImages];
                        images[i] = imageUrl;
                        return {
                          ...prev,
                          aboutProject: {
                            ...prev.aboutProject,
                            description: prev.aboutProject?.description || '',
                            experienceLink: prev.aboutProject?.experienceLink || '',
                            images
                          }
                        };
                      });
                    } catch (error) {
                      alert('Error uploading image: ' + error.message);
                    }
                  }}
                  className="form-input-file-small"
                />
                {formData.aboutProject?.images?.[i] && (
                  <img src={formData.aboutProject.images[i]} className="grid-image-preview" alt={`About ${i + 1}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Process Cards */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">5. Process Cards</h3>
            <div className="button-group">
              {!savedSections.process ? (
                <button
                  type="button"
                  onClick={() => saveSection('process', {
                    processCards: formData.processCards
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.process && (
                <button
                  type="button"
                  onClick={() => saveSection('process', {
                    processCards: formData.processCards
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          {formData.processCards.map((card, i) => (
            <div key={i} className="card-input-box">
              <h4 className="card-title">Card {i + 1}</h4>
              <div className="card-inputs">
                <input
                  type="text"
                  placeholder="Title"
                  value={card.title}
                  onChange={(e) => {
                    const updated = [...formData.processCards];
                    updated[i] = { ...updated[i], title: e.target.value };
                    setFormData({ ...formData, processCards: updated });
                  }}
                  className="form-input"
                />
                <input
                  type="text"
                  placeholder="Hours (e.g., 10 Hours)"
                  value={card.hours}
                  onChange={(e) => {
                    const updated = [...formData.processCards];
                    updated[i] = { ...updated[i], hours: e.target.value };
                    setFormData({ ...formData, processCards: updated });
                  }}
                  className="form-input"
                />
                <div className="form-group">
                  <label className="form-label-small">Icon</label>
                  <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'processCards', i, 'icon')} className="form-input-file-small" />
                  {card.icon && <img src={card.icon} className="icon-preview" alt="Icon" />}
                </div>
                {[0, 1, 2].map(j => (
                  <input
                    key={j}
                    type="text"
                    placeholder={`Detail ${j + 1}`}
                    value={card.details[j]}
                    onChange={(e) => {
                      const updated = [...formData.processCards];
                      updated[i].details[j] = e.target.value;
                      setFormData({ ...formData, processCards: updated });
                    }}
                    className="form-input-small"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 6: Initial Concepts */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">6. Initial Concepts (9 slides)</h3>
            <div className="button-group">
              {!savedSections.concepts ? (
                <button
                  type="button"
                  onClick={() => saveSection('concepts', {
                    conceptSlides: formData.conceptSlides
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.concepts && (
                <button
                  type="button"
                  onClick={() => saveSection('concepts', {
                    conceptSlides: formData.conceptSlides
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <div className="slides-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="slide-upload-box">
                <label className="form-label-small">Slide {i + 1}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'conceptSlides', i)}
                  className="form-input-file-small"
                />
                {formData.conceptSlides[i] && (
                  <img src={formData.conceptSlides[i]} className="slide-preview" alt={`Slide ${i + 1}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 7: Design System */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">7. Design System</h3>
            <div className="button-group">
              {!savedSections.design ? (
                <button
                  type="button"
                  onClick={() => saveSection('design', {
                    designSystemImage: formData.designSystemImage
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.design && (
                <button
                  type="button"
                  onClick={() => saveSection('design', {
                    designSystemImage: formData.designSystemImage
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'designSystemImage')} className="form-input-file" />
          {formData.designSystemImage && <img src={formData.designSystemImage} className="design-system-preview" alt="Design System" />}
        </div>

        {/* SECTION 8: Responsive Images */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">8. Responsive Carousel (8 images)</h3>
            <div className="button-group">
              {!savedSections.responsive ? (
                <button
                  type="button"
                  onClick={() => saveSection('responsive', {
                    responsiveImages: formData.responsiveImages
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.responsive && (
                <button
                  type="button"
                  onClick={() => saveSection('responsive', {
                    responsiveImages: formData.responsiveImages
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          <div className="responsive-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="responsive-upload-box">
                <label className="form-label-small">Image {i + 1}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'responsiveImages', i)}
                  className="form-input-file-small"
                />
                {formData.responsiveImages[i] && (
                  <img src={formData.responsiveImages[i]} className="responsive-preview" alt={`Responsive ${i + 1}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 9: Technologies */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">9. Technologies</h3>
            <div className="button-group">
              {!savedSections.tech ? (
                <button
                  type="button"
                  onClick={() => saveSection('tech', {
                    technologies: formData.technologies
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.tech && (
                <button
                  type="button"
                  onClick={() => saveSection('tech', {
                    technologies: formData.technologies
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          {['design', 'development', 'production'].map(category => (
            <div key={category} className="tech-category">
              <h4 className="filter-category-title">{category.charAt(0).toUpperCase() + category.slice(1)} Tools</h4>
              <div className="tech-grid">
                {TECHNOLOGY_OPTIONS[category].map(tech => {
                  const isSelected = formData.technologies[category].includes(tech.name);

                  return (
                    <button
                      key={tech.name}
                      type="button"
                      onClick={() => {
                        console.log('Button clicked:', category, tech.name);
                        toggleTechnology(category, tech.name);
                      }}
                      className={`tech-option ${isSelected ? 'tech-option-selected' : ''}`}
                    >
                      <span className="tech-icon">{tech.icon}</span>
                      <span className="tech-name">{tech.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 10: Results */}
        <div className="form-section chunked-section">
          <div className="section-header-with-save">
            <h3 className="section-title">10. Results (4 cards)</h3>
            <div className="button-group">
              {!savedSections.results ? (
                <button
                  type="button"
                  onClick={() => saveSection('results', {
                    results: formData.results
                  })}
                  className="save-section-button"
                >
                  <Save size={16} /> Save Section
                </button>
              ) : (
                <button className="save-section-button saved">
                  <Check size={16} /> Saved
                </button>
              )}
              {savedSections.results && (
                <button
                  type="button"
                  onClick={() => saveSection('results', {
                    results: formData.results
                  })}
                  className="update-section-button"
                >
                  <Save size={16} /> Update
                </button>
              )}
            </div>
          </div>

          {formData.results.map((result, i) => (
            <div key={i} className="result-input-box">
              <input
                type="text"
                placeholder="Title"
                value={result.title}
                onChange={(e) => {
                  const updated = [...formData.results];
                  updated[i] = { ...updated[i], title: e.target.value };
                  setFormData({ ...formData, results: updated });
                }}
                className="form-input"
              />
              <textarea
                placeholder="Description"
                value={result.description}
                onChange={(e) => {
                  const updated = [...formData.results];
                  updated[i] = { ...updated[i], description: e.target.value };
                  setFormData({ ...formData, results: updated });
                }}
                className="form-textarea-small"
              />
            </div>
          ))}
        </div>

        <div className="save-instructions">
          <h4>📌 Save Instructions:</h4>
          <ol>
            <li>Start by saving <strong>Section 1 (Basic Information)</strong> first to create the case study</li>
            <li>Then save each subsequent section individually using their respective "Save Section" buttons</li>
            <li>Large images are automatically split across multiple documents to avoid size limits</li>
            <li>Sections will show a green checkmark (✓) when saved successfully</li>
            <li>You can edit and re-save any section at any time</li>
          </ol>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setShowForm(false);
          setEditingItem(null);
        }}
        className="submit-button"
        style={{ marginTop: '20px' }}
      >
        <Check size={20} /> Done Editing
      </button>
    </div>
  );
};

const BlogForm = ({ editingItem, setEditingItem, setShowForm, loadData }) => {
  const [formData, setFormData] = useState({
    image: '', // Card image
    tag: '',
    date: new Date().toISOString().split('T')[0],
    topic: '', // Card title
    detailsImage: '', // Main header image for details page
    headerText: '', // Main header text for details page
    content: [], // Array of content blocks
    status: 'draft'
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem);
    } else {
      setFormData({
        image: '',
        tag: '',
        date: new Date().toISOString().split('T')[0],
        topic: '',
        detailsImage: '',
        headerText: '',
        content: [],
        status: 'draft'
      });
    }
  }, [editingItem]);

  const [imageFile, setImageFile] = useState(null);
  const [detailsImageFile, setDetailsImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const addContentBlock = (type) => {
    const newBlock = {
      id: Date.now(),
      type: type, // 'paragraph', 'image', 'subheading', 'keypoints', 'quote', 'callout', 'numberedlist'
      content: (type === 'keypoints' || type === 'numberedlist') ? [''] : '',
      ...(type === 'image' ? { caption: '' } : {})
    };
    setFormData(prev => ({
      ...prev,
      content: [...prev.content, newBlock]
    }));
  };

  const updateContentBlock = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.map(block =>
        block.id === id ? { ...block, [field]: value } : block
      )
    }));
  };

  const deleteContentBlock = (id) => {
    setFormData(prev => ({
      ...prev,
      content: prev.content.filter(block => block.id !== id)
    }));
  };

  const moveContentBlock = (id, direction) => {
    const index = formData.content.findIndex(block => block.id === id);
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === formData.content.length - 1)
    ) return;

    const newContent = [...formData.content];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];

    setFormData(prev => ({ ...prev, content: newContent }));
  };

  const handleContentImageUpload = async (e, blockId) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);
      updateContentBlock(blockId, 'content', imageUrl);
    } catch (error) {
      alert('Error uploading image to Cloudinary: ' + error.message);
    }
  };

  const addKeyPoint = (blockId) => {
    const block = formData.content.find(b => b.id === blockId);
    if (block) {
      updateContentBlock(blockId, 'content', [...block.content, '']);
    }
  };

  const updateKeyPoint = (blockId, index, value) => {
    const block = formData.content.find(b => b.id === blockId);
    if (block) {
      const newPoints = [...block.content];
      newPoints[index] = value;
      updateContentBlock(blockId, 'content', newPoints);
    }
  };

  const deleteKeyPoint = (blockId, index) => {
    const block = formData.content.find(b => b.id === blockId);
    if (block) {
      const newPoints = block.content.filter((_, i) => i !== index);
      updateContentBlock(blockId, 'content', newPoints);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl = formData.image;
      let detailsImageUrl = formData.detailsImage;

      if (imageFile) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (error) {
          alert("Card image upload failed: " + error.message);
          setSaving(false);
          return;
        }
      }
      if (detailsImageFile) {
        try {
          detailsImageUrl = await uploadImage(detailsImageFile);
        } catch (error) {
          alert("Header image upload failed: " + error.message);
          setSaving(false);
          return;
        }
      }

      const data = {
        ...formData,
        image: imageUrl,
        detailsImage: detailsImageUrl,
        updatedAt: new Date().toISOString()
      };

      if (editingItem) {
        await updateDoc(doc(db, 'blogs', editingItem.id), data);
      } else {
        await addDoc(collection(db, 'blogs'), { ...data, createdAt: new Date().toISOString() });
      }

      await loadData();
      setShowForm(false);
      setEditingItem(null);
    } catch (error) {
      alert('Error saving blog: ' + error.message);
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container blog-form">
      <div className="form-header">
        <h2 className="form-title">{editingItem ? 'Edit' : 'Add'} Blog Post</h2>
        <button type="button" onClick={() => setShowForm(false)} className="close-button">
          <X size={24} />
        </button>
      </div>

      <div className="form-content">
        {/* Blog Card Information */}
        <div className="form-section">
          <h3 className="section-title">Blog Card Information</h3>

          <div className="form-group">
            <label className="form-label">Card Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="form-input-file"
            />
            {formData.image && <img src={formData.image} className="image-preview" alt="Card" />}
          </div>

          <div className="form-group">
            <label className="form-label">Tag</label>
            <input
              type="text"
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="form-input"
              placeholder="e.g., Tips, News, Design"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Card Title</label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="form-input"
              placeholder="Title shown on blog card"
              required
            />
          </div>
        </div>

        {/* Blog Details Page Header */}
        <div className="form-section">
          <h3 className="section-title">Blog Details Page Header</h3>

          <div className="form-group">
            <label className="form-label">Header Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setDetailsImageFile(e.target.files[0])}
              className="form-input-file"
            />
            {formData.detailsImage && <img src={formData.detailsImage} className="details-image-preview" alt="Details" />}
          </div>

          <div className="form-group">
            <label className="form-label">Header Text</label>
            <input
              type="text"
              value={formData.headerText}
              onChange={(e) => setFormData({ ...formData, headerText: e.target.value })}
              className="form-input"
              placeholder="Main title for the blog details page"
              required
            />
          </div>
        </div>

        {/* Content Builder */}
        <div className="form-section">
          <h3 className="section-title">Blog Content</h3>

          <div className="content-builder">
            {formData.content.map((block, index) => (
              <div key={block.id} className="content-block">
                <div className="content-block-header">
                  <span className="content-block-type">
                    {block.type === 'paragraph' && '📝 Paragraph'}
                    {block.type === 'image' && '🖼️ Image'}
                    {block.type === 'subheading' && '📌 Subheading'}
                    {block.type === 'keypoints' && '📋 Key Points'}
                    {block.type === 'numberedlist' && '🔢 Numbered List'}
                    {block.type === 'quote' && '💬 Quote'}
                    {block.type === 'callout' && '💡 Tip / Callout'}
                  </span>
                  <div className="content-block-actions">
                    <button type="button" onClick={() => moveContentBlock(block.id, 'up')} disabled={index === 0}>
                      ↑
                    </button>
                    <button type="button" onClick={() => moveContentBlock(block.id, 'down')} disabled={index === formData.content.length - 1}>
                      ↓
                    </button>
                    <button type="button" onClick={() => deleteContentBlock(block.id)} className="delete-block-btn">
                      🗑️
                    </button>
                  </div>
                </div>

                {block.type === 'paragraph' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateContentBlock(block.id, 'content', e.target.value)}
                    className="form-textarea"
                    placeholder="Enter paragraph text..."
                    rows={4}
                  />
                )}

                {block.type === 'image' && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleContentImageUpload(e, block.id)}
                      className="form-input-file-small"
                    />
                    {block.content && <img src={block.content} className="content-image-preview" alt="Content" />}
                    <input
                      type="text"
                      value={block.caption || ''}
                      onChange={(e) => updateContentBlock(block.id, 'caption', e.target.value)}
                      className="form-input"
                      placeholder="Optional caption (shown below image)"
                      style={{ marginTop: '0.5rem' }}
                    />
                  </div>
                )}

                {block.type === 'subheading' && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateContentBlock(block.id, 'content', e.target.value)}
                    className="form-input"
                    placeholder="Enter subheading text..."
                  />
                )}

                {block.type === 'quote' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateContentBlock(block.id, 'content', e.target.value)}
                    className="form-textarea"
                    placeholder="Enter quote text..."
                    rows={3}
                  />
                )}

                {block.type === 'callout' && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateContentBlock(block.id, 'content', e.target.value)}
                    className="form-textarea"
                    placeholder="Enter tip / callout text..."
                    rows={3}
                  />
                )}

                {(block.type === 'keypoints' || block.type === 'numberedlist') && (
                  <div className="keypoints-container">
                    {block.content.map((point, i) => (
                      <div key={i} className="keypoint-item">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => updateKeyPoint(block.id, i, e.target.value)}
                          className="form-input"
                          placeholder={block.type === 'numberedlist' ? `Step ${i + 1}` : `Key point ${i + 1}`}
                        />
                        <button type="button" onClick={() => deleteKeyPoint(block.id, i)} className="delete-keypoint-btn">
                          ✕
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => addKeyPoint(block.id)} className="add-keypoint-btn">
                      {block.type === 'numberedlist' ? '+ Add Step' : '+ Add Point'}
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="add-content-buttons">
              <button type="button" onClick={() => addContentBlock('paragraph')} className="add-content-btn">
                Add Paragraph
              </button>
              <button type="button" onClick={() => addContentBlock('image')} className="add-content-btn">
                Add Image
              </button>
              <button type="button" onClick={() => addContentBlock('subheading')} className="add-content-btn">
                Add Subheading
              </button>
              <button type="button" onClick={() => addContentBlock('keypoints')} className="add-content-btn">
                Add Key Points
              </button>
              <button type="button" onClick={() => addContentBlock('numberedlist')} className="add-content-btn">
                Add Numbered List
              </button>
              <button type="button" onClick={() => addContentBlock('quote')} className="add-content-btn">
                Add Quote
              </button>
              <button type="button" onClick={() => addContentBlock('callout')} className="add-content-btn">
                Add Tip / Callout
              </button>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="form-select"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <button type="submit" disabled={saving} className="submit-button">
        <Save size={20} /> {saving ? 'Saving...' : 'Save Blog Post'}
      </button>
    </form>
  );
};
const DataTable = ({ activeTab, items, setShowForm, setEditingItem, loadData }) => {
  const handleDelete = async (id, collectionName) => {
    if (typeof window !== 'undefined' && !window.confirm('Are you sure?')) return;

    try {
      if (collectionName === 'caseStudies') {
        const chunksSnap = await getDocs(collection(db, `caseStudies/${id}/chunks`));
        const deletePromises = chunksSnap.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
      }

      await deleteDoc(doc(db, collectionName, id));
      await loadData();
    } catch (error) {
      alert('Error deleting item: ' + error.message);
    }
  };

  const toggleStatus = async (item, collectionName) => {
    try {
      const newStatus = item.status === 'published' ? 'draft' : 'published';
      await updateDoc(doc(db, collectionName, item.id), { status: newStatus });
      await loadData();
    } catch (error) {
      alert('Error updating status: ' + error.message);
    }
  };

  const collectionName = activeTab === 'projects' ? 'projects' : activeTab === 'caseStudies' ? 'caseStudies' : 'blogs';

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <p>No {activeTab} found. Click "Add New" to create one.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            {activeTab === 'projects' && <th>Filters</th>}
            {activeTab === 'blogs' && (
              <>
                <th>Tag</th>
                <th>Date</th>
              </>
            )}
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image || item.heroThumbnail || '/placeholder.png'}
                  alt={item.title || item.projectTitle || item.topic}
                  className="table-image"
                />
              </td>
              <td className="table-title">
                {item.title || item.projectTitle || item.topic}
              </td>
              {activeTab === 'projects' && (
                <td>
                  <div className="filter-badges">
                    {Object.values(item.filters || {}).flat().slice(0, 3).map((filter, i) => (
                      <span key={i} className="filter-badge">{filter}</span>
                    ))}
                    {Object.values(item.filters || {}).flat().length > 3 && (
                      <span className="filter-badge-more">
                        +{Object.values(item.filters || {}).flat().length - 3}
                      </span>
                    )}
                  </div>
                </td>
              )}
              {activeTab === 'blogs' && (
                <>
                  <td>
                    <span className="tag-badge">{item.tag}</span>
                  </td>
                  <td className="table-date">{item.date}</td>
                </>
              )}
              <td>
                <button
                  onClick={() => toggleStatus(item, collectionName)}
                  className={`status-button ${item.status === 'published' ? 'status-published' : 'status-draft'}`}
                >
                  {item.status === 'published' ? <Eye size={14} /> : <EyeOff size={14} />}
                  {item.status === 'published' ? 'Published' : 'Draft'}
                </button>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(true);
                    }}
                    className="action-button action-edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, collectionName)}
                    className="action-button action-delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default AdminPanel;