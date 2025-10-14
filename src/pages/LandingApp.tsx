import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function LandingApp() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Header 
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />

      <Hero />
      <Services />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300/20 to-transparent" />
      <Pricing />
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300/20 to-transparent" />

      {showAbout && <About />}
      {showContact && <Contact />}

      <Footer />

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.a
          href="https://wa.me/6283197183724?text=Halo%20ArvoCloud!"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-7 h-7 text-green-500" />
        </motion.a>
      </motion.div>
    </div>
  );
}
