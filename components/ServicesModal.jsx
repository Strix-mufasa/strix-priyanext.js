"use client"
// components/ServicesModal.jsx
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/app/style/ConnectModal.css"; // reuse same styles

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

const ServicesModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="backdrop"
            onClick={onClose}
            variants={backdropVariants}
          />

          {/* Modal content */}
          <motion.div className="modal-content" variants={modalVariants}>
            <button className="close-btn" onClick={onClose}>X</button>
            <h2>Our Services</h2>
            <p>Here’s where you can showcase your services.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServicesModal;
















