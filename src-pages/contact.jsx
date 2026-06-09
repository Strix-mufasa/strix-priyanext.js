"use client"
import React from 'react'
import Nav from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import '@/app/style/contact.css';
import ContactForm from '../components/ContactForm';


const Contact = () => {
  return (
    <div>
      <SEO
        title="Contact Strix for Design & Development Services"
        description="Ready to start your next project? Connect with the Strix team for tailored design, development, and production solutions that align with your brand objectives."
        canonical="https://www.strixproduction.com/contact"
      />
      <Nav />
      <ContactForm />
      <Footer />
    </div>
  )
}

export default Contact


























