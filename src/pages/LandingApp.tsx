import React, { useState, Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import NoticeModal from '../components/NoticeModal';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const About = lazy(() => import('../components/About'));
const Contact = lazy(() => import('../components/Contact'));

export default function LandingApp() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <NoticeModal />
      <Header
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />
      <Hero />
      <Pricing />
      <Services />

      <Suspense fallback={null}>
        {showAbout && <About />}
        {showContact && <Contact />}
      </Suspense>

      <Footer />
      {/* PENTING: Render Floating WA di dalam return */}
      <WhatsAppFloatingButton />
    </div>
  );
}

// =====================================================
// Floating WA Component 
// =====================================================
function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.a
          href="https://wa.me/6283197183724?text=Halo%20ArvoCloud!%20Saya%20ingin%20konsultasi%20tentang%20paket%20VPS%20dan%20RDP"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi ArvoCloud via WhatsApp untuk konsultasi VPS & RDP"
          title="Chat WhatsApp - Konsultasi VPS & RDP Gratis"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative block"
        >
          {/* Pulse */}
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-green-500"
          />

          {/* Button */}
          <div className="relative w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transition-shadow">
            <MessageCircle className="w-8 h-8 sm:w-9 sm:h-9 text-white" strokeWidth={2.5} />
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
            />
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-1/2 translate-y-1/2 right-full mr-4 hidden sm:block pointer-events-none"
              >
                <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-3 rounded-xl shadow-2xl whitespace-nowrap">
                  <p className="font-semibold text-sm">Konsultasi Gratis</p>
                  <p className="text-xs opacity-90 mt-0.5">VPS • RDP • Server</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SEO Text */}
          <span className="sr-only">
            Hubungi customer service ArvoCloud melalui WhatsApp untuk konsultasi VPS, RDP, Server, Proxy dengan support 24/7 dan garansi uptime 99.8%.
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
