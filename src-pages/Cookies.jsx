"use client"
import React from 'react'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowLeft } from 'lucide-react';
const Circleblur = "/assets/img/sr-img.webp"
import Link from 'next/link';

import "@/app/style/note.css"

const Cookies = () => {
  return (
    <div>
            <Nav />
            



        <div className="blog-top note-return">
               <Link href='/' className="back-button">
                  <ArrowLeft size={16} /> Return to Blog
                </Link>
             </div>


              <div className="sh-top uiux-hero note-hero">
                       <img src={Circleblur} alt="" />
                       <h1 className="slideinLoad mvp-hero-h1">Cookie Policy</h1>
                     </div>


             <section className="cookie-policy">
      <div className="policy-header">
        <p className="effective-date">Effective Date: [Insert Effective Date]</p>
        <p className="last-updated">Last Updated: [Insert Last Updated Date]</p>
      </div>

      <div className="policy-intro">
        <p>
          This Cookie Policy explains how Strix Production ("we", "our", or "us") uses cookies 
          and similar technologies on our website www.abhiwan.com ("Website"). By continuing to 
          use our Website, you consent to our use of cookies in accordance with this policy.
        </p>
      </div>

      <div className="policy-section">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your device (computer, smartphone, or 
          tablet) when you visit a website. They help the site remember your actions and preferences 
          (like login details, language, and other settings) over a period of time.
        </p>
        <p>Cookies can be:</p>
        <ul>
          <li>First-party cookies – set by us</li>
          <li>Third-party cookies – set by other services or websites integrated into our site 
          (e.g., Google Analytics, social media, advertising platforms)</li>
        </ul>
      </div>

      <div className="policy-section">
        <h2>2. Types of Cookies We Use</h2>
        
        <div className="subsection">
          <h3>a. Essential Cookies</h3>
          <p>
            These cookies are necessary for the Website to function properly and cannot be disabled 
            in our systems. They include:
          </p>
          <ul>
            <li>Login authentication</li>
            <li>Shopping cart functionality</li>
            <li>Security-related features</li>
          </ul>
        </div>

        <div className="subsection">
          <h3>b. Performance & Analytics Cookies</h3>
          <p>
            These cookies help us understand how users interact with the Website by collecting 
            anonymous data. We use tools like:
          </p>
          <ul>
            <li>Google Analytics</li>
            <li>Hotjar (if applicable)</li>
          </ul>
          <p>They help us improve Website speed, usability, and overall user experience.</p>
        </div>

        <div className="subsection">
          <h3>c. Functional Cookies</h3>
          <p>These allow the Website to remember choices you make, such as:</p>
          <ul>
            <li>Language preferences</li>
            <li>Region selection</li>
            <li>Custom settings</li>
          </ul>
        </div>

        <div className="subsection">
          <h3>d. Advertising & Targeting Cookies</h3>
          <p>
            These cookies are used to deliver relevant advertisements based on your interests and 
            browsing behavior. They may also limit the number of times you see an ad and help measure 
            the effectiveness of campaigns.
          </p>
          <p>Common providers include:</p>
          <ul>
            <li>Google Ads</li>
            <li>Facebook Pixel</li>
            <li>Instagram and other social media platforms</li>
          </ul>
        </div>
      </div>

      <div className="policy-section">
        <h2>3. How We Use Cookies</h2>
        <p>We use cookies to:</p>
        <ul>
          <li>Maintain secure sessions for logged-in users</li>
          <li>Analyze site traffic and usage patterns</li>
          <li>Enhance user experience and interface personalization</li>
          <li>Deliver relevant advertisements</li>
        </ul>
        <p>
          Cookies do not give us access to your computer or any personally identifiable information, 
          unless you choose to share it with us.
        </p>
      </div>

      <div className="policy-section">
        <h2>4. Your Cookie Choices</h2>
        <p>You can control and manage cookies in several ways:</p>
        
        <div className="subsection">
          <h3>a. Browser Settings</h3>
          <p>Most browsers allow you to:</p>
          <ul>
            <li>See what cookies are installed</li>
            <li>Delete specific cookies</li>
            <li>Block all or selected cookies</li>
          </ul>
          <p>Instructions vary by browser, so refer to your browser's help section.</p>
        </div>

        <div className="subsection">
          <h3>b. Cookie Consent Banner</h3>
          <p>
            When you first visit our Website, a banner will ask for your consent to use non-essential 
            cookies. You may:
          </p>
          <ul>
            <li>Accept all cookies</li>
            <li>Reject non-essential cookies</li>
            <li>Customize your preferences</li>
          </ul>
          <p>
            You can change or withdraw your consent at any time via the cookie settings at the bottom 
            of our site (if enabled).
          </p>
        </div>

        <div className="subsection">
          <h3>c. Opt-Out Tools</h3>
          <p>You may also opt out of targeted advertising using tools such as:</p>
          <ul>
            <li>Google Ad Settings</li>
            <li>Your Online Choices (EU)</li>
            <li>Network Advertising Initiative (US)</li>
          </ul>
        </div>
      </div>

      <div className="policy-section">
        <h2>5. Third-Party Cookies</h2>
        <p>
          Third-party services may place their own cookies on your device when you use our Website. 
          These services include:
        </p>
        <ul>
          <li>Analytics providers (e.g., Google Analytics)</li>
          <li>Advertising networks (e.g., Google Ads, Facebook Ads)</li>
          <li>Embedded content from YouTube, Instagram, etc.</li>
        </ul>
        <p>
          We do not control the use of these cookies. Please review the respective policies of these 
          third parties for more details.
        </p>
      </div>

      <div className="policy-section">
        <h2>6. Updates to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, legal 
          requirements, or our practices. Updates will be posted on this page with a revised "Last 
          Updated" date.
        </p>
      </div>

      <div className="policy-section">
        <h2>7. Contact Us</h2>
        <p>If you have questions or concerns about our use of cookies, please contact us:</p>
        <div className="contact-info">
          <p><strong>Strix Production</strong></p>
          <p>Email: [Insert Email Address]</p>
          <p>Phone: [Insert Phone Number]</p>
          <p>Address: [Insert Physical Address]</p>
        </div>
      </div>

      <div className="policy-footer">
        <p>
          By continuing to use www.strixproduction.com, you agree to our use of cookies as described 
          in this policy.
        </p>
      </div>
    </section>

      <Footer />
    </div>
  )
}

export default Cookies


























