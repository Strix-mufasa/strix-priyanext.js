"use client"
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import "@/app/style/faq.css";

const FAQ = ({
  faqData = [],
  title = "Frequently Asked Questions",
  subtitle = "",
  className = "",
  itemClassName = "",
  containerVariants = null,
  itemVariants = null,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Default animation variants
  const defaultContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const defaultItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        height: {
          duration: 0.4,
          ease: "easeInOut",
        },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      overflow: "hidden",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        height: {
          duration: 0.3,
          ease: "easeInOut",
        },
      },
    },
  };

  if (!faqData || faqData.length === 0) {
    return <div className="faq-empty">No FAQ data provided</div>;
  }

  return (
    <motion.div
      className={`faq-container ${className}`}
      variants={containerVariants || defaultContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Header Section */}
      {title && (
        <motion.div className="faq-header" variants={itemVariants || defaultItemVariants}>
          <h2 className="faq-title">{title}</h2>
          {subtitle && <p className="faq-subtitle">{subtitle}</p>}
        </motion.div>
      )}

      {/* FAQ Items */}
      <motion.div
        className="faq-items"
        variants={containerVariants || defaultContainerVariants}
      >
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            className={`faq-item ${expandedIndex === index ? "active" : ""} ${itemClassName}`}
            variants={itemVariants || defaultItemVariants}
          >
            <motion.button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="faq-question-text">{item.question}</span>
              <motion.div
                className="faq-icon"
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  className="faq-content-wrapper"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="faq-answer">
                    {typeof item.answer === "string" ? (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{item.answer}</p>
                    ) : (
                      item.answer
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FAQ;
















