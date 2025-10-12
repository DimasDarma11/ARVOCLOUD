import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const menuItems = ["Services", "Pricing", "About", "Contact"];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 select-none group">
          <img
            src="https://i.ibb.co/VWzggVqJ/Arvocloud1.png"
            alt="Arvocloud Logo"
            className="h-8 w-auto transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              {item}
            </a>
          ))}
          <Link
            to="/rules"
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            Aturan
          </Link>
        </nav>

        {/* Login + Hamburger */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="hidden md:inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg shadow-md transition-all"
          >
            Login
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center group"
          >
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-900 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: 45, y: 6, backgroundColor: "#2563EB" }
                  : { rotate: 0, y: -6 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
            <motion.span
              className="absolute w-6 h-[2px] bg-gray-900 rounded-full"
              animate={
                isMenuOpen
                  ? { rotate: -45, y: -6, backgroundColor: "#2563EB" }
                  : { rotate: 0, y: 6 }
              }
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </button>
        </div>
      </div>

      {/* Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-white/80 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-2xl text-gray-800 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                {item}
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/rules"
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-gray-800 hover:text-blue-600 font-medium transition-colors"
              >
                Aturan
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="mt-8 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
