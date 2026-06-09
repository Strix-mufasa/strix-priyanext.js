"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import "@/app/style/module.css";

const Grad = "/assets/img/design-gradient.webp";
const Icon1 = "/assets/img/design-icon1.png";
const Icon2 = "/assets/img/design-icon2.png";
const Icon3 = "/assets/img/design-icon3.png";
const Icon4 = "/assets/img/design-icon4.png";
const Icon5 = "/assets/img/design-icon5.png";
const Icon6 = "/assets/img/design-icon6.png";
const Arrow = "/assets/img/arr-left.png";
import ButtonSmall from "./btn-small";
const Mgrad = "/assets/img/design-grad-mobile.webp";

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

const DesignModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999999,
            pointerEvents: "auto",
          }}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="backdrop"
            onClick={onClose}
            variants={backdropVariants}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.5)",
              zIndex: 9999998,
            }}
          />

          {/* Modal Content */}
          <motion.div
            className="modal-content2"
            variants={modalVariants}
            style={{
              position: "relative",
              zIndex: 9999999,
              background: "white",
              borderRadius: "1rem",
            }}
          >
            <img src={Grad} alt="" className="gradient" />
            <img src={Mgrad} alt="" className="mgradient" />
            <button className="close-btnmode arr-left" onClick={onClose}>
              <img src={Arrow} alt="" />
            </button>

            <h1>Design</h1>
            <p className="mcp">
              Crafting intuitive, eye-catching designs for web, apps, and brands
              that stand out.
            </p>

           <div className="mcp-con">
  <div className="mcp-left">
    <Link href="/uiux">
      <div className="table">
        <img src={Icon1} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>UI/UX Design</h2>
          <p>Web & Mobile App Design</p>
        </div>
      </div>
    </Link>

    <Link href="/product">
      <div className="table">
        <img src={Icon2} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Product Design</h2>
          <p>Digital Product, User Experience</p>
        </div>
      </div>
    </Link>

    <Link href="/appdesign">
      <div className="table">
        <img src={Icon3} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Mobile App Design</h2>
          <p>User-Friendly Applications</p>
        </div>
      </div>
    </Link>
  </div>

  <div className="mcp-left">
    <Link href="/branding">
      <div className="table">
        <img src={Icon4} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Branding</h2>
          <p>Identity, Strategy, Guidelines</p>
        </div>
      </div>
    </Link>

    <Link href="/cdesign">
      <div className="table">
        <img src={Icon5} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Creative Design</h2>
          <p>Graphics, Thumbnails, Presentations</p>
        </div>
      </div>
    </Link>

    <Link href="/webdesign">
      <div className="table">
        <img src={Icon6} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Website Design</h2>
          <p>Custom Websites, Landing page</p>
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

  // ✅ This ensures the modal is always mounted at the <body> level (above all)
  // return ReactDOM.createPortal(modalContent, document.body);
  if (typeof window === 'undefined') return null;
 return ReactDOM.createPortal(modalContent, document.body);
};

export default DesignModal;

















