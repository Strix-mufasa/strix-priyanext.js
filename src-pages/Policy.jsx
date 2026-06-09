"use client"
import React from 'react'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import { ArrowLeft } from 'lucide-react';
const Circleblur = "/assets/img/sr-img.webp"
import Link from 'next/link';

import "@/app/style/note.css"

const Policy = () => {
  return (
    <div>
      <SEO
        title="Privacy Policy for Strix Production Services"
        description="Read the Strix Production privacy policy to understand how we collect, use, and protect your personal data in compliance with applicable digital privacy laws."
        canonical="https://www.strixproduction.com/policy"
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
                       <h1 className="slideinLoad mvp-hero-h1">Privacy Policy</h1>
                     </div>


              <section className="privacy-policy">
        <div className="privacy-header">
          <p className="date-info">Effective Date: [Insert Effective Date]</p>
          <p className="date-info">Last Updated: [Insert Last Updated Date]</p>
        </div>

        <div className="privacy-intro">
          <p>
            At Strix Production ("we", "us", or "our"), accessible from www.strixproduction.com 
            ("Website"), we value your privacy and are committed to protecting your personal data. 
            This Privacy Policy outlines how we collect, use, disclose, and safeguard your information 
            when you visit our Website or use our services.
          </p>
          <p>
            By accessing or using our Website, you agree to the terms of this Privacy Policy.
          </p>
        </div>

        <div className="privacy-section">
          <h2>1. Information We Collect</h2>
          <p>We collect the following types of information:</p>
          
          <div className="subsection">
            <h3>a. Personal Information</h3>
            <p>You may provide personal data when:</p>
            <ul>
              <li>Registering an account</li>
              <li>Making a purchase</li>
              <li>Subscribing to our newsletter</li>
              <li>Contacting us through forms or email</li>
            </ul>
            <p>This may include:</p>
            <ul>
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely via third-party providers)</li>
            </ul>
          </div>

          <div className="subsection">
            <h3>b. Non-Personal Information</h3>
            <p>We may also collect:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Referring website</li>
              <li>Pages visited and duration</li>
              <li>Cookies and usage data (see Section 5)</li>
            </ul>
          </div>
        </div>

        <div className="privacy-section">
          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, operate, and maintain our Website and services</li>
            <li>Process transactions and send order confirmations</li>
            <li>Communicate with you (customer support, updates, promotions)</li>
            <li>Improve our Website based on usage patterns</li>
            <li>Comply with legal obligations</li>
            <li>Prevent fraud or misuse of our services</li>
          </ul>
          <div className="highlight-box">
            <p>We do not sell or rent your personal information to third parties.</p>
          </div>
        </div>

        <div className="privacy-section">
          <h2>3. Sharing Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers (e.g., payment processors, shipping partners, analytics tools) only 
            to the extent necessary to provide our services</li>
            <li>Legal authorities if required to comply with laws or respond to valid legal requests</li>
            <li>Business transfers, such as in a merger or acquisition, where your information may be 
            transferred as part of company assets</li>
          </ul>
          <p>
            All third parties are obligated to handle your data securely and in accordance with 
            applicable privacy laws.
          </p>
        </div>

        <div className="privacy-section">
          <h2>4. Data Retention</h2>
          <p>
            We retain your personal data only as long as necessary to fulfill the purposes for which 
            we collected it, including legal, accounting, or reporting obligations.
          </p>
          <p>
            When no longer needed, your data will be deleted or anonymized.
          </p>
        </div>

        <div className="privacy-section">
          <h2>5. Cookies and Tracking Technologies</h2>
          <p>Our Website uses cookies and similar technologies to:</p>
          <ul>
            <li>Recognize returning visitors</li>
            <li>Store user preferences</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Enable secure login and shopping cart functionality</li>
          </ul>
          <div className="info-box">
            <p>
              You can manage or disable cookies via your browser settings, but doing so may affect 
              the Website's performance or features.
            </p>
          </div>
        </div>

        <div className="privacy-section">
          <h2>6. Your Rights</h2>
          <p>Depending on your location, you may have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Correct inaccurate or incomplete information</li>
            <li>Request deletion of your data</li>
            <li>Object to or restrict certain data processing</li>
            <li>Withdraw consent at any time (where applicable)</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information in Section 10.
          </p>
        </div>

        <div className="privacy-section">
          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your data from 
            unauthorized access, alteration, disclosure, or destruction. These include:
          </p>
          <ul>
            <li>SSL encryption</li>
            <li>Firewalls and access controls</li>
            <li>Regular monitoring and security updates</li>
          </ul>
          <div className="info-box">
            <p>
              However, no method of transmission over the internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>
          </div>
        </div>

        <div className="privacy-section">
          <h2>8. Children's Privacy</h2>
          <p>
            Our Website is not intended for children under the age of 13, and we do not knowingly 
            collect data from children. If we become aware that we have collected personal data from 
            a child without parental consent, we will take steps to delete it.
          </p>
        </div>

        <div className="privacy-section">
          <h2>9. Third-Party Links</h2>
          <p>
            Our Website may contain links to third-party sites. We are not responsible for their 
            privacy practices. We encourage you to review the privacy policies of any external websites 
            you visit.
          </p>
        </div>

        <div className="privacy-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions, requests, or concerns regarding this Privacy Policy or how we 
            handle your personal data, please contact us:
          </p>
          <div className="contact-info">
            <p><strong>Strix production</strong></p>
            <p>Email: [Insert Email Address]</p>
            <p>Phone: [Insert Phone Number]</p>
            <p>Address: [Insert Physical Address]</p>
          </div>
        </div>

        <div className="privacy-section">
          <h2>11. Changes to This Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on 
            this page with the revised "Last Updated" date. We recommend reviewing this policy 
            periodically to stay informed.
          </p>
        </div>

        <div className="privacy-footer">
          <p>
            By using www.strixproduction.com, you consent to the collection and use of your information 
            as described in this Privacy Policy.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Policy


























