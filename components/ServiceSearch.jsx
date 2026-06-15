"use client"
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";

// ── All service pages with their routes, categories and keywords ──
const SERVICES = [
    // DESIGN SERVICES
    {
        name: "Web Design",
        route: "/webdesign",
        category: "Design",
        keywords: ["website design", "website designer", "ui design for website", "landing page design", "custom website design", "responsive web design", "redesign website", "modern website", "corporate website design", "startup website design"]
    },
    {
        name: "UI/UX Design",
        route: "/uiux",
        category: "Design",
        keywords: ["ux design", "ui design", "user experience design", "user interface design", "app ui", "product interface", "wireframing", "prototyping", "figma design", "mobile ui", "saas design"]
    },
    {
        name: "Product Design",
        route: "/product",
        category: "Design",
        keywords: ["digital product design", "saas design", "software design", "app product design", "platform design", "user journey design", "product strategy", "mvp design", "startup product"]
    },
    {
        name: "Branding",
        route: "/branding",
        category: "Design",
        keywords: ["brand identity", "logo design", "brand strategy", "visual identity", "brand guidelines", "brand kit", "company branding", "rebranding", "corporate identity"]
    },
    {
        name: "Creative Design",
        route: "/cdesign",
        category: "Design",
        keywords: ["graphic design", "graphics design", "graphic designer", "social media design", "ad creatives", "thumbnails", "presentation design", "pitch deck design", "marketing creatives", "carousel design", "posters", "banners"]
    },
    {
        name: "Mobile App Design",
        route: "/appdesign",
        category: "Design",
        keywords: ["app design", "ios design", "android design", "mobile ui", "mobile ux", "application design", "cross platform app design", "startup app design"]
    },

    // DEVELOPMENT SERVICES
    {
        name: "Web Applications",
        route: "/webapp",
        category: "Development",
        keywords: ["web app", "web application development", "saas development", "dashboard development", "admin panel", "crm development", "custom platform", "portal development", "internal tools"]
    },
    {
        name: "Website Development",
        route: "/webdev",
        category: "Development",
        keywords: ["web development", "website developer", "frontend development", "backend development", "full stack development", "custom website", "business website", "coding website", "dynamic website"]
    },
    {
        name: "Mobile App Development",
        route: "/appdev",
        category: "Development",
        keywords: ["app development", "ios app development", "android app development", "react native app", "cross platform app", "flutter development", "mobile software development"]
    },
    {
        name: "Interactive Websites",
        route: "/intaweb",
        category: "Development",
        keywords: ["animated website", "interactive web design", "web animations", "immersive website", "scroll animation website", "motion website", "gsap website", "webgl website"]
    },
    {
        name: "E-Commerce",
        route: "/ecommerce",
        category: "Development",
        keywords: ["ecommerce website", "online store", "shopify development", "woocommerce", "product store", "dropshipping website", "custom ecommerce", "shopping cart website"]
    },
    {
        name: "Maintenance & Hosting",
        route: "/softwaredev", // Reusing softwaredev for maintenance/hosting if that's the closest existing route
        category: "Development",
        keywords: ["website maintenance", "website support", "hosting", "server setup", "performance optimization", "speed optimization", "technical support", "bug fixing"]
    },

    // PRODUCTION SERVICES
    {
        name: "Commercials",
        route: "/commercials",
        category: "Production",
        keywords: ["video editing", "promo video", "product video", "ad video", "advertisement editing", "marketing video", "brand video", "commercial production"]
    },
    {
        name: "Long Format Content",
        route: "/longform",
        category: "Production",
        keywords: ["youtube video editing", "podcast editing", "documentary editing", "vlog editing", "long form video", "corporate video", "interview video"]
    },
    {
        name: "Reels & Shorts",
        route: "/reel",
        category: "Production",
        keywords: ["short video editing", "reels editing", "instagram reels", "youtube shorts", "tiktok video", "short form content", "viral video editing"]
    },
    {
        name: "Motion Graphics",
        route: "/motion",
        category: "Production",
        keywords: ["motion design", "animation", "after effects", "animated explainer", "2d animation", "animated ads", "typography animation", "logo animation"]
    },
    {
        name: "3D Animations",
        route: "/threed",
        category: "Production",
        keywords: ["3d animation", "3d video", "3d rendering", "product 3d", "3d commercial", "cinematic 3d", "3d motion graphics"]
    },

    // MVP
    {
        name: "MVP Development",
        route: "/mvp",
        category: "Product & Strategy",
        keywords: ["mvp", "minimum viable product", "startup mvp", "saas mvp", "build mvp", "prototype development", "rapid product development", "launch product fast", "beta product development", "startup tech development", "early stage product", "proof of concept", "poc development"]
    },
];

const INTENT_MAP = [
    { triggers: ["edit", "video", "production", "youtube", "reels", "shorts", "animation", "3d"], category: "Production" },
    { triggers: ["design", "ui", "ux", "brand", "logo", "creative", "figma", "visual"], category: "Design" },
    { triggers: ["develop", "build", "code", "dev", "web app", "software", "app", "mobile", "backend", "frontend"], category: "Development" },
    { triggers: ["mvp", "startup", "beta", "launch", "prototype", "poc", "strategy"], category: "Product & Strategy" }
];

const ServiceSearch = ({ variants, isMotion = true }) => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isListening, setIsListening] = useState(false);
    const wrapperRef = useRef(null);
    const inputRef = useRef(null);
    const recognitionRef = useRef(null);
    const navigate = useRouter();

    // ── Advanced Search Logic ──
    const searchResult = (() => {
        const q = query.trim().toLowerCase();
        if (!q) return { exactMatches: [], suggestions: [], intentCategory: null };

        // 1. Check for intent first
        const intent = INTENT_MAP.find(i => i.triggers.some(t => q.includes(t)));
        const intentCategory = intent ? intent.category : null;

        // 2. Filter services based on exact matches or keywords
        const exactMatches = SERVICES.filter((s) =>
            s.name.toLowerCase().includes(q) ||
            s.category.toLowerCase().includes(q) ||
            s.keywords.some(k => k.toLowerCase().includes(q))
        );

        // 3. Suggestions (if no exact matches, or for intent discovery)
        let suggestions = [];
        if (exactMatches.length === 0 && intentCategory) {
            suggestions = SERVICES.filter(s => s.category === intentCategory);
        }

        return { exactMatches, suggestions, intentCategory };
    })();

    const filtered = searchResult.exactMatches.length > 0 ? searchResult.exactMatches : searchResult.suggestions;

    // ── Group filtered results by category ──
    const grouped = filtered.reduce((acc, service) => {
        if (!acc[service.category]) acc[service.category] = [];
        acc[service.category].push(service);
        return acc;
    }, {});

    // Flat list for keyboard navigation
    const flatResults = Object.values(grouped).flat();

    // ── Close dropdown on outside click ──
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // ── Navigate to a service ──
    const goToService = useCallback(
        (route) => {
            setQuery("");
            setIsOpen(false);
            setActiveIndex(-1);
            navigate(route);
        },
        [navigate]
    );

    // ── Keyboard navigation ──
    const handleKeyDown = (e) => {
        if (!isOpen || flatResults.length === 0) {
            if (e.key === "Escape") setIsOpen(false);
            return;
        }

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev < flatResults.length - 1 ? prev + 1 : 0
                );
                break;
            case "ArrowUp":
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : flatResults.length - 1
                );
                break;
            case "Enter":
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < flatResults.length) {
                    goToService(flatResults[activeIndex].route);
                }
                break;
            case "Escape":
                setIsOpen(false);
                setActiveIndex(-1);
                break;
            default:
                break;
        }
    };

    // ── Handle input change ──
    const handleChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setIsOpen(val.trim().length > 0);
        setActiveIndex(-1);
    };

    // ── Voice Search (Web Speech API) ──
    const startVoiceSearch = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Voice search is not supported in this browser.");
            return;
        }

        if (isListening) {
            // Stop listening
            recognitionRef.current?.abort();
            setIsListening(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript);
            setIsOpen(transcript.trim().length > 0);
            setActiveIndex(-1);
            setIsListening(false);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognition.start();
    };

    // ── Dropdown animation variants ──
    const dropdownVariants = {
        hidden: { opacity: 0, y: -8, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
        exit: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.15 } },
    };

    // ── Choose wrapper element ──
    const Wrapper = isMotion ? motion.div : "div";
    const wrapperProps = isMotion ? { variants, className: "service-search-wrapper" } : { className: "service-search-wrapper" };

    return (
        <Wrapper {...wrapperProps} ref={wrapperRef}>
            <div className="blur-box">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for design, dev, or video services..."
                    suppressHydrationWarning={true}
                    value={query}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => query.trim() && setIsOpen(true)}
                />
            </div>
            <div
                className={`image-box${isListening ? " mic-listening" : ""}`}
                onClick={startVoiceSearch}
                title={isListening ? "Stop listening" : "Voice search"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && startVoiceSearch()}
            >
                <p></p>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="search-dropdown"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {searchResult.suggestions.length > 0 && searchResult.exactMatches.length === 0 && (
                            <div className="search-dropdown-hint">
                                Showing suggested {searchResult.intentCategory} services:
                            </div>
                        )}

                        {flatResults.length > 0 ? (
                            Object.entries(grouped).map(([category, services]) => (
                                <div key={category} className="search-dropdown-group">
                                    <div className="search-dropdown-category">{category}</div>
                                    {services.map((service) => {
                                        const flatIdx = flatResults.indexOf(service);
                                        return (
                                            <div
                                                key={service.route}
                                                className={`search-dropdown-item${flatIdx === activeIndex ? " active" : ""
                                                    }`}
                                                onClick={() => goToService(service.route)}
                                                onMouseEnter={() => setActiveIndex(flatIdx)}
                                            >
                                                <span className="search-item-name">{service.name}</span>
                                                <span className="search-item-arrow">→</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))
                        ) : (
                            <div className="search-dropdown-empty">
                                <p>No exact match found.</p>
                                <span>Try searching for "design", "development", or "video editing"</span>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </Wrapper>
    );
};

export default ServiceSearch;
















