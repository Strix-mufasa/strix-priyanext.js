"use client"
import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowLeft } from 'lucide-react';
import '@/app/style/contact.css';
const Blur1 = "/assets/img/conb1.webp";
const Blur2 = "/assets/img/conb2.webp";
const Connect = "/assets/img/connect.svg"
const Blur3 = "/assets/img/conb3.webp";

const USER_ID = '8APvl15ZOGswhSl3A'; // keep your user id here
const SERVICE_ID = 'default_service';
const TEMPLATE_ID = 'template_djpi0dt';

const ContactForm = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    want: '',
    project: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    agreedToTerms: false
  });
  const [modal, setModal] = useState({ visible: false, success: false, message: '' });
  const [sending, setSending] = useState(false);

  const sectionRef = useRef(null);

  useEffect(() => {
    emailjs.init(USER_ID);
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.opacity = '0';
      sectionRef.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (!sectionRef.current) return;
        sectionRef.current.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionRef.current.style.opacity = '1';
        sectionRef.current.style.transform = 'translateY(0)';
      }, 50);
    }
  }, [currentSection]);

  const handleNext = () => {
    if (currentSection < 5) setCurrentSection(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentSection > 1) setCurrentSection(prev => prev - 1);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleOptionClick = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => handleNext(), 300);
  };

  const [showPopup, setShowPopup] = useState(false);

// Check if all required fields are filled
const isFormComplete = ['firstName', 'lastName', 'email', 'phone', 'country'].every(
  field => formData[field] && formData[field].trim() !== ''
);

const handleNextWithValidation = () => {
  if (!isFormComplete) {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
    return;
  }
  handleNext();
};

  const openModal = (success, message) => {
    setModal({ visible: true, success, message });
    // auto close after 2.4s
    setTimeout(() => setModal({ visible: false, success: false, message: '' }), 2400);
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.agreedToTerms) return;
    if (sending) return;

    const templateParams = {
      name: formData.firstName || '-',
      last_name: formData.lastName || '-',
      want: formData.want || '-',
      project: formData.project || '-',
      email: formData.email || '-',
      phone: formData.phone || '-',
      country: formData.country || '-',
      message: formData.message || '-'
    };

    try {
      setSending(true);
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID);
      openModal(true, 'Email sent successfully!');
      setCurrentSection(5);
      // optionally reset form here
      setFormData({ want: '', project: '', firstName: '', lastName: '', email: '', phone: '', country: '', message: '', agreedToTerms: false });
    } catch (err) {
      console.error('Failed to send email:', err);
      openModal(false, 'Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="contact-container">
      <button className="back-button" onClick={() => window.history.back()}>
        <ArrowLeft size={16} /> Return to Homepage
      </button>

      <div className="form-content" ref={sectionRef}>
        {/* Section 1 */}
        {currentSection === 1 && (
          <div className="section">
            <div className="section-hflex">
              <div className="diamond-icon">◇</div>
              <h1 className="ct-section-title">Contact</h1>
            </div>
            <h2 className="question">What are you searching for?</h2>
            <div className="options-list">
              <button className="option-item" onClick={() => handleOptionClick('want', 'Start a project')}><span className="diamond-icon">◇</span>Start a project</button>
              <button className="option-item" onClick={() => handleOptionClick('want', 'Say hello')}><span className="diamond-icon">◇</span>Say hello</button>
              <button className="option-item" onClick={() => handleOptionClick('want', 'Apply')}><span className="diamond-icon">◇</span>Apply</button>
            </div>
            <div className="progress">01 ———— 04</div>
            <img src={Blur1} className='sectsion1-blur1' alt="" />
          </div>
        )}

        {/* Section 2 */}
        {currentSection === 2 && (
          <div className="section">
            <h2 className="question centered">Type of Project</h2>
            <div className="options-grid">
              <div className="grid-column">
                {['UI/UX Design', 'Application Development', 'Graphics Design', 'Web Application'].map((proj, i) => (
                  <button key={i} className="option-item" onClick={() => handleOptionClick('project', proj)}><span className="diamond-icon">◇</span>{proj}</button>
                ))}
              </div>
              <div className="grid-column">
                {['Branding & Identity', 'Website Development', 'Media Productivity', 'Motion Graphics'].map((proj, i) => (
                  <button key={i} className="option-item" onClick={() => handleOptionClick('project', proj)}><span className="diamond-icon">◇</span>{proj}</button>
                ))}
              </div>
            </div>
            <button className="option-item centered-option" onClick={() => handleOptionClick('project', 'Other')}><span className="diamond-icon">◇</span>Other</button>
            <div className="progress">02 ———— 04</div>
            <img src={Blur1} className='sectsion1-blur1' alt="" />
            <img src={Blur2} className='sectsion1-blur2' alt="" />
          </div>
        )}

        {/* Section 3 */}
        {currentSection === 3 && (
         <div className="section">
  <div className="form-grid">
    {['firstName', 'lastName', 'email', 'phone', 'country'].map((field, i) => (
      <div key={i} className={`form-group ${field === 'country' ? 'full-width' : ''}`}>
        <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
        <input 
          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} 
          name={field} 
          value={formData[field]} 
          onChange={handleInputChange} 
          className="form-inputc" 
          required 
        />
      </div>
    ))}
  </div>
  
  {showPopup && (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ff4444',
      color: 'white',
      padding: '20px 40px',
      borderRadius: '8px',
      zIndex: 1000,
      fontSize: '16px',
      fontWeight: '500',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      Complete Form
    </div>
  )}
  
  <div className="flex-con-btn">
    <div 
      className={`right-booking right-booking2 ${!isFormComplete ? 'disabled' : ''}`} 
      onClick={handleNextWithValidation}
      style={{ opacity: !isFormComplete ? 0.5 : 1, cursor: !isFormComplete ? 'not-allowed' : 'pointer' }}
    >
      <img className="right-booking-img" src={Connect} alt="" />
      <p>Next</p>
    </div>
    <div className="progress">03 ———— 04</div>
    <div 
      className={`right-booking ${!isFormComplete ? 'disabled' : ''}`} 
      onClick={handleNextWithValidation}
      style={{ opacity: !isFormComplete ? 0.5 : 1, cursor: !isFormComplete ? 'not-allowed' : 'pointer' }}
    >
      <img className="right-booking-img" src={Connect} alt="" />
      <p>Next</p>
    </div>
  </div>
  <img src={Blur1} className='sectsion1-blur1' alt="" />
  <img src={Blur2} className='sectsion1-blur2' alt="" />
</div>
        )}

        {/* Section 4 */}
        {currentSection === 4 && (
          <div className="section">
            <div className="section-hflex"><div className="diamond-icon">◇</div><h1 className="mess-section-title">Your Message</h1></div>
            <textarea name="message" placeholder='Ask you query....' value={formData.message} onChange={handleInputChange} className="message-textarea" />

            <div className="checkbox-container">
              <label className="container-toggle">
                <input type="checkbox" id="terms" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleInputChange} />
                <svg viewBox="0 0 64 64" height="1.3em" width="1.3em"><path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="path"></path></svg>
              </label>

              <p>I agree with terms conditions and privacy policy</p>
            </div>

            <div className="flex-con-btn">
              <div onClick={handleSubmit} className="right-booking right-booking2" disabled={!formData.agreedToTerms || sending}><img className="right-booking-img" src={Connect} alt="" /><p>{sending ? 'Sending...' : 'Send'}</p></div>
              <div className="progress">04 ———— 04</div>
              <div onClick={handleSubmit} className="right-booking" disabled={!formData.agreedToTerms || sending}><img className="right-booking-img" src={Connect} alt="" /><p>{sending ? 'Sending...' : 'Send'}</p></div>
            </div>
            <img src={Blur3} className='sectsion1-blur3' alt="" />
          </div>
        )}

        {/* Section 5 */}
        {currentSection === 5 && (
          <div className="section thank-you">
            <div className="right-booking"><img className="right-booking-img" src={Connect} alt="" /><p>Explore <br /> More</p></div>
            <div className="right-booking right-booking2"><img className="right-booking-img" src={Connect} alt="" /><p>Explore <br /> More</p></div>
            <h1 className="thank-you-title section-hflex2">Thank you for contacting us.<br />We will come back to you as soon as possible.</h1>
            <img src={Blur3} className='sectsion1-blur4' alt="" />
          </div>
        )}
      </div>

      {/* Modal (dark center with blurred background) */}
      {modal.visible && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className={`modal-content ${modal.success ? 'success' : 'error'}`}>
            <h3>{modal.success ? 'Success' : 'Oops'}</h3>
            <p>{modal.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
















