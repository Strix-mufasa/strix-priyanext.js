"use client"
import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import "@/app/style/ConnectModal.css";
import ButtonSmall from "./btn-small";
const Cicon = "/assets/img/c-icon.webp";
const Logo = "/assets/img/Header-s.webp";
const Shadow1 = "/assets/img/shadow1.webp";
const Shadow2 = "/assets/img/shadow2.webp";

// import BuildMVP from "../src-pages/Cs";
// import OurWork from "../src-pages/project";
// import WhoWeAre from "../src-pages/About";
// import Blog from "../src-pages/Cs";
const Modalbg = "/assets/img/menu.webp"
const Blur1 = "/assets/img/p-blur1.png"

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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
  exit: { opacity: 0, y: 10 },
};

const ConnectModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmodal"
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

          {/* 🖥️ Desktop modal */}
          <motion.div className="modal-content desktop-modal" variants={modalVariants}>

           <motion.img 
              className="modal-bgg" 
              src={Modalbg} 
              alt=""
              initial={{ scale: 0.999, filter: "blur(10px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />  

            
            <div className="modal-con">
              <button
              className="close-btn fluent--ios-arrow-24-filled"
              onClick={onClose}
            ></button>
            <div className="nav-left">
              <motion.div custom={0} variants={itemVariants}>
                <div className="nav-left-div-div">●</div>
                <p className="nav-left-div-p">Connect With Us</p>
              </motion.div>
              <motion.p custom={1} variants={itemVariants} className="nav-left-p">
                Working On Something Exciting? Let's Talk.
              </motion.p>
              <motion.div custom={2} variants={itemVariants}>
               <Link href='/contact'> <ButtonSmall text="Let's Talk" /></Link>
              </motion.div>
            </div>

            <div className="modal-links">
  {[
    { text: "Build MVP", path: "/mvp" },
    { text: "Our work", path: "/project" },
    { text: "Who we are", path: "/about" },
    { text: "Blog", path: "/blog" },
  ].map(({ text, path }, i) => (
    <motion.div key={i} custom={i + 3} variants={itemVariants}>
      <Link href={path} onClick={onClose}>
        {text}
      </Link>
    </motion.div>
  ))}
</div>
            </div>

          </motion.div>




          {/* 📱 Mobile modal */}
          <motion.div className="modal-content mobile-modal" variants={modalVariants}>
            <img className="shadow1 s-nav" src={Shadow1} />
            <img className="shadow2 s-nav" src={Shadow2} />
            <div className="mobile-header">
              <div className="left">
                <img src={Logo} alt="Strix Logo" />
                <div className="line"></div>
                <p>Strix</p>
              </div>
              <button
                className="close-btn icon-park-outline--left"
                onClick={onClose}
              ></button>
            </div>

          <div className="mobile-links">
  {[
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Services", path: "/service" },
    { text: "Projects", path: "/project" },
    { text: "Blogs", path: "/blog" },
  ].map(({ text, path }, i) => (
    <motion.div key={i} custom={i} variants={itemVariants}>
      <Link href={path} onClick={onClose}>
        {text}
      </Link>
    </motion.div>
  ))}
</div>

            <motion.div className="mobile-btn" custom={6} variants={itemVariants}>
              <Link href="/contact"><ButtonSmall text="Let's Talk" /></Link>
              
            </motion.div>

            <motion.div className="mobile-socials" custom={7} variants={itemVariants}>
              
              <a href="https://www.upwork.com/freelancers/~0156ff518eb002dd0a?companyReference=1678399476724211713&mp_source=share"><span className="bxl--upwork"></span></a>
              <a href="https://www.behance.net/strixproductions"><span className="ri--behance-fill"></span></a>
              <a href="https://dribbble.com/StrixProduction"><span className="icon-park-outline--dribble"></span></a>
              <a href="https://www.instagram.com/strix_productions"><span className="mdi--instagram"></span></a>
              <a href="https://x.com/strixproduction"><span className="ri--twitter-x-line"></span></a>
              <a href=""><span className="akar-icons--linkedin-v1-fill"></span></a>
              <a href="https://clutch.co/profile/strix-production"><img src={Cicon} className="cion" alt="cicon" /></a>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectModal;



















