"use client"
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import "@/app/style/module.css";
const Grad = "/assets/img/dev-gradient.webp";
const Icon1 = "/assets/img/dev-icon1.png";
const Icon2 = "/assets/img/dev-icon2.png";
const Icon3 = "/assets/img/dev-icon3.png";
const Icon4 = "/assets/img/dev-icon4.png";
const Icon5 = "/assets/img/dev-icon5.png";
const Icon6 = "/assets/img/dev-icon6.png";
const Arrow = "/assets/img/arr-left.png";
import ButtonSmall from "./btn-small";
const Mgrad = "/assets/img/dev-grad-mobile.webp";
import Link from "next/link";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const DevelopmentModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          style={{ zIndex: 9999999, position: "fixed", inset: 0 }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="backdrop"
            onClick={onClose}
            variants={backdropVariants}
          />
          <motion.div className="modal-content2" variants={modalVariants}>
            <img src={Grad} className="gradient" alt="" />
            <img src={Mgrad} alt="" className="mgradient" />
            <button className="close-btnmode" onClick={onClose}>
              <img src={Arrow} alt="" />
            </button>
            <h1>Development</h1>
            <p className="mcp">
              Building fast, functional, and scalable digital experiences across
              platforms.
            </p>
           <div className="mcp-con">
  <div className="mcp-left">
    <Link href="/webapp">
      <div className="table">
        <img src={Icon1} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Web Applications</h2>
          <p>Site builder solutions</p>
        </div>
      </div>
    </Link>

    <Link href="/intaweb">
      <div className="table">
        <img src={Icon2} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Interactive Websites</h2>
          <p>Real-time interactions</p>
        </div>
      </div>
    </Link>

    <Link href="/webdev">
      <div className="table">
        <img src={Icon3} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Website Development</h2>
          <p>Front-End & Back-End Development</p>
        </div>
      </div>
    </Link>
  </div>

  <div className="mcp-left">
    <Link href="/appdev">
      <div className="table">
        <img src={Icon4} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Mobile App Development</h2>
          <p>IOS, Android, Cross-platform</p>
        </div>
      </div>
    </Link>

    <Link href="/ecommerce">
      <div className="table">
        <img src={Icon5} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>E-Commerce</h2>
          <p>Custom e-commerce platforms</p>
        </div>
      </div>
    </Link>

    <Link href="/softwaredev">
      <div className="table">
        <img src={Icon6} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Maintenance & Hosting</h2>
          <p>Performance optimization, Setup</p>
        </div>
      </div>
    </Link>
  </div>
</div>
            <ButtonSmall text="Portfolio" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // return ReactDOM.createPortal(modalContent, document.body);
  if (typeof window === 'undefined') return null;
  return ReactDOM.createPortal(modalContent, document.body);
};

export default DevelopmentModal;

















