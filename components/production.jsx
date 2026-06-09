"use client"
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import "@/app/style/module.css";
import Link from "next/link";
const Grad = "/assets/img/pro-gradient.webp";
const Icon1 = "/assets/img/pro-icon1.png";
const Icon2 = "/assets/img/pro-icon2.png";
const Icon3 = "/assets/img/pro-icon3.png";
const Icon4 = "/assets/img/pro-icon4.png";
const Icon5 = "/assets/img/pro-icon5.png";
const Arrow = "/assets/img/arr-left.png";
import ButtonSmall from "./btn-small";
const Mgrad = "/assets/img/pro-gradient.webp";

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

const ResearchModal = ({ isOpen, onClose }) => {
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

            <h1>Production</h1>
            <p className="mcp">
              Creating engaging video content and motion graphics that tell your
              story powerfully.
            </p>

          <div className="mcp-con">
  <div className="mcp-left">
    <Link href="/commercials">
      <div className="table">
        <img src={Icon1} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Commercials</h2>
          <p>Product promos, ads, teasers</p>
        </div>
      </div>
    </Link>

    <Link href="/reel">
      <div className="table">
        <img src={Icon2} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Reels & Shorts</h2>
          <p>Engaging short format content</p>
        </div>
      </div>
    </Link>
  </div>

  <div className="mcp-left">
    <Link href="/longform">
      <div className="table">
        <img src={Icon3} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Long Format Content</h2>
          <p>Vlogs, Documentaries, Podcasts etc.</p>
        </div>
      </div>
    </Link>

    <Link href="/motion">
      <div className="table">
        <img src={Icon4} alt="" className="t-icon" />
        <div className="t-txt">
          <h2>Motion Graphics</h2>
          <p>High quality After Effects animations</p>
        </div>
      </div>
    </Link>
  </div>
</div>

<Link href="/threed">
  <div className="table threed">
    <img src={Icon5} alt="" className="t-icon" />
    <div className="t-txt">
      <h2>3D Animations</h2>
      <p>Pixar level visuals and rendering</p>
    </div>
  </div>
</Link>

            {/* <div className="table threed">
              <img src={Icon5} alt="" className="t-icon" />
              <div className="t-txt">
                <h2>3D Animations</h2>
                <p>Pixar level visuals and rendering</p>
              </div>
            </div> */}

            <ButtonSmall text="Portfolio" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // ✅ Mount modal directly in the <body> for top-level stacking
  // return ReactDOM.createPortal(modalContent, document.body);
  if (typeof window === "undefined") return null;
  return ReactDOM.createPortal(modalContent, document.body);  
};

export default ResearchModal;

















