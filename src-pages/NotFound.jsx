"use client"
import React from "react";
import Link from "next/link";
import Nav from "../components/Navbar";
import Footer from "../components/Footer";
import "@/app/style/notFound.css";
import { motion } from "framer-motion";

const NotFound = () => {
    return (
        <div className="notfound-page">
            <Nav />
            <main className="notfound-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="notfound-glass"
                >
                    <h1 className="notfound-title">404</h1>
                    <div className="notfound-line"></div>
                    <p className="notfound-text">The page you're looking for has vanished into thin air.</p>
                    <Link href="/" className="notfound-btn">
                        Retrace Your Steps
                    </Link>
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;


























