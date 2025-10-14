import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen relative">
      <Header 
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />

      {/* Section utama */}
      <Hero />
      <Services />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300/20 to-transparent"></div>

      <Pricing />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300/20 to-transparent"></div>

      {/* Section tambahan */}
      {showAbout && <About />}
      {showContact && <Contact />}

      <Footer />

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/6283197183724?text=Halo%20ArvoCloud!"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 
                   rounded-3xl bg-gradient-to-br from-[#00ff88]/30 via-[#00aaff]/20 to-[#0066ff]/20 
                   border border-white/20 shadow-[0_0_25px_rgba(0,255,160,0.3)] 
                   backdrop-blur-2xl transition-all duration-300"
      >
        <motion.div
          animate={{ 
            boxShadow: [
              "0 0 10px rgba(0,255,160,0.2)",
              "0 0 20px rgba(0,255,160,0.4)",
              "0 0 10px rgba(0,255,160,0.2)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center justify-center"
        >
          <MessageCircle className="w-7 h-7 text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,160,0.6)]" />
        </motion.div>
      </motion.a>
    </div>
  );
}

export default App;
