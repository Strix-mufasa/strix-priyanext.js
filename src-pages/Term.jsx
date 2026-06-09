"use client"
import React from 'react'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { ArrowLeft } from 'lucide-react';
const Circleblur = "/assets/img/sr-img.webp"
import Link from 'next/link';

import "@/app/style/note.css"

const Term = () => {
  return (
    <div>
      <SEO
        title="Terms and Conditions for Using Strix Services"
        description="Review the terms and conditions governing the use of Strix Production's website, creative services, and digital solutions before engaging with our studio."
        canonical="https://www.strixproduction.com/term"
      />
            <Nav />
            {/* <SlideInFramerOnLoad />
            <ScrollAnimation />
            <RotateCardsScroll />
            <ScrollSlideAnimations />
            <Stagger /> */}



        <div className="blog-top note-return">
               <Link href='/' className="back-button">
                 
                   <ArrowLeft size={16} /> Return to Blog
                 
               </Link>
             </div>


              <div className="sh-top uiux-hero note-hero">
                       <img src={Circleblur} alt="" />
                       <h1 className="slideinLoad mvp-hero-h1">Terms of Service</h1>
                     </div>

      <section className="terms-of-service">
        <div className="terms-header">
          <p className="date-info">Effective Date: [Insert Effective Date]</p>
          <p className="date-info">Last Updated: [Insert Last Updated Date]</p>
        </div>

        <div className="terms-intro">
          <p>
            Welcome to www.strixproduction.com ("we", "our", "us", or "Abhiwan"). These Terms of 
            Service ("Terms") govern your access to and use of our website, content, products, and 
            services (collectively, the "Service"). By accessing or using our Service, you agree to 
            be bound by these Terms. If you do not agree to all of these Terms, please do not use 
            our Service.
          </p>
        </div>

        <div className="terms-section">
          <h2>1. Eligibility</h2>
          <p>By using our Service, you represent and warrant that:</p>
          <ul>
            <li>You are at least 18 years old or the age of majority in your jurisdiction.</li>
            <li>You have the full power and authority to enter into these Terms.</li>
            <li>You will comply with all applicable laws and regulations.</li>
          </ul>
          <p>
            If you are using the Service on behalf of an organization, you agree to these Terms on 
            behalf of that organization and confirm that you have the authority to do so.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. User Accounts</h2>
          <p>To access certain features, you may be required to create an account. You agree to:</p>
          <ul>
            <li>Provide accurate and complete information when creating your account.</li>
            <li>Keep your login credentials confidential.</li>
            <li>Notify us immediately of any unauthorized use of your account.</li>
          </ul>
          <div className="highlight-box">
            <p><strong>You are solely responsible for all activities that occur under your account.</strong></p>
          </div>
        </div>

        <div className="terms-section">
          <h2>3. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for any unlawful purpose.</li>
            <li>Post or transmit any content that is harmful, abusive, defamatory, vulgar, obscene, 
            or otherwise objectionable.</li>
            <li>Interfere with or disrupt the Service or servers.</li>
            <li>Attempt to gain unauthorized access to any part of the Service or other users' accounts.</li>
          </ul>
          <div className="highlight-box">
            <p><strong>We reserve the right to suspend or terminate your access if you violate these Terms.</strong></p>
          </div>
        </div>

        <div className="terms-section">
          <h2>4. Intellectual Property</h2>
          <p>
            All content on www.abhiwan.com, including text, graphics, logos, images, audio, video, 
            software, and the compilation thereof, is the property of Abhiwan or its content suppliers 
            and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may not copy, reproduce, distribute, modify, or create derivative works from any content 
            on our Service without prior written consent.
          </p>
        </div>

        <div className="terms-section">
          <h2>5. Purchases and Payments</h2>
          <p>If you purchase products or services through our website:</p>
          <ul>
            <li>You agree to provide accurate billing information.</li>
            <li>You authorize us to charge the payment method you provide.</li>
            <li>All sales are subject to our return, refund, and cancellation policies, available on 
            the relevant product or service page.</li>
          </ul>
          <p>Prices and availability of products/services are subject to change without notice.</p>
        </div>

        <div className="terms-section">
          <h2>6. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We do not endorse, control, or 
            assume responsibility for any content or practices of these third-party websites. Accessing 
            third-party sites is at your own risk.
          </p>
        </div>

        <div className="terms-section">
          <h2>7. Disclaimer of Warranties</h2>
          <p>
            Our Service is provided "as is" and "as available." We make no warranties, express or 
            implied, regarding the operation, reliability, availability, or suitability of our Service.
          </p>
          <p>
            To the fullest extent permitted by law, we disclaim all warranties, including but not 
            limited to implied warranties of merchantability, fitness for a particular purpose, and 
            non-infringement.
          </p>
        </div>

        <div className="terms-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Abhiwan shall not be liable for any indirect, 
            incidental, special, or consequential damages arising out of or related to your use of 
            the Service, even if we were advised of the possibility of such damages.
          </p>
          <p>
            Our total liability for any claim arising from your use of the Service shall not exceed 
            the amount you paid to us (if any) in the 12 months preceding the claim.
          </p>
        </div>

        <div className="terms-section">
          <h2>9. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless Abhiwan, its affiliates, directors, 
            employees, and agents from and against any claims, liabilities, damages, losses, or 
            expenses (including legal fees) arising out of or in any way connected with:
          </p>
          <ul>
            <li>Your use or misuse of the Service.</li>
            <li>Your violation of these Terms.</li>
            <li>Your violation of any law or rights of a third party.</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>10. Termination</h2>
          <p>
            We may suspend or terminate your access to the Service at any time, without notice or 
            liability, for any reason, including violation of these Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. Sections that by 
            their nature should survive termination (e.g., Intellectual Property, Disclaimer of 
            Warranties, Limitation of Liability) will remain in effect.
          </p>
        </div>

        <div className="terms-section">
          <h2>11. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms at any time. We will notify users of 
            significant changes by posting an updated version on this page with a new "Last Updated" 
            date. Your continued use of the Service constitutes acceptance of the revised Terms.
          </p>
        </div>

        <div className="terms-section">
          <h2>12. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of [Insert Country/State], 
            without regard to conflict of law principles. Any disputes arising under these Terms shall be 
            resolved exclusively in the courts of [Insert Jurisdiction].
          </p>
        </div>

        <div className="terms-section">
          <h2>13. Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <div className="contact-info">
            <p><strong>Strix production</strong></p>
            <p>Email: [Insert Email Address]</p>
            <p>Phone: [Insert Phone Number]</p>
            <p>Address: [Insert Business Address]</p>
          </div>
        </div>

        <div className="terms-footer">
          <p>
            By using www.strixproduction.com, you acknowledge that you have read, understood, and agree 
            to be bound by these Terms of Service.
          </p>
        </div>
      </section>


      <Footer />
    </div>
  )
}

export default Term


























