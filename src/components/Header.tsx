import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface HeaderProps {
  onAboutClick: () => void;
  onContactClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAboutClick, onContactClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Optimasi scroll listener dengan requestAnimationFrame
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Services", desc: "Solusi cloud & sistem digital modern", href: "#services" },
    { name: "Pricing", desc: "Paket fleksibel untuk setiap kebutuhan", href: "#pricing" },
    { name: "About", desc: "Cerita dan misi kami di balik Arvocloud", action: onAboutClick },
    { name: "Contact", desc: "Hubungi tim kami untuk kolaborasi", action: onContactClick },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 md:backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer select-none group">
          <img
            src="https://i.ibb.co/VYh29p8y/Arvocloud1.webp"
            alt="Arvocloud Logo"
            className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-105 will-change-transform"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => item.action ? item.action() : null}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </button>
          ))}
          <Link
            to="/rules"
            className="text-gray-700 hover:text-blue-600 transition-colors"
          >
            Aturan
          </Link>
        </nav>

        {/* Login + Hamburger */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="relative px-5 py-2.5 rounded-xl text-sm font-medium text-gray-800 
            border border-gray-200 bg-white/60 md:backdrop-blur-lg 
            shadow-sm hover:shadow-md hover:-translate-y-[1px]
            transition-all duration-300"
          >
            Login
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
          >
            {/* Hamburger animation disederhanakan */}
            <span
              className={`absolute w-6 h-[2px] bg-gray-800 rounded-full transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : "rotate-0 translate-y-0"
              }`}
            />
            <span
              className={`absolute w-6 h-[2px] bg-gray-800 rounded-full transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : "rotate-0 translate-y-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden absolute top-full left-0 w-full bg-white/90 backdrop-blur-none md:backdrop-blur-xl shadow-md border-t border-gray-100"
          >
            <div className="flex flex-col py-5 px-6 space-y-4">
              {menuItems.map((item, i) => (
                <motion.button
                  key={item.name}
                  onClick={() => {
                    setIsMenuOpen(false);
                    item.action ? item.action() : null;
                  }}
                  className="flex items-start justify-between w-full text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div>
                    <p className="text-gray-900 font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-400 mt-1"
                  />
                </motion.button>
              ))}
              <hr className="border-gray-200 my-2" />
              <Link
                to="/rules"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-800 text-sm font-medium"
              >
                Aturan Platform
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
