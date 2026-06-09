"use client"
import '@/app/style/nav.css'
const Logo = "/assets/img/Header-s.webp"
import Link from "next/link";
import React, { useState } from "react";
import ConnectModal from './ConnectModal';


const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="containerNav">
      <div className="nav animate-nav">
        <Link href="/" className="left">
          <img src={Logo} alt="Strix Logo" />
          <div className="linenav"></div>
          <p>Strix</p>
        </Link>

        <div className="mid">
          <div><Link className="nav-link link-button" href="/">Home</Link></div>
          <div><Link className="nav-link link-button" href="/service">Services</Link></div>
          <div><Link className="nav-link link-button" href="/project">Projects</Link></div>
        </div>

        <button className="hamburger" onClick={openModal}>
          <div className="linenav top"></div>
          <div className="linenav bottom"></div>
        </button>
      </div>

      <ConnectModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Nav;




