import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Services = lazy(() => import("../components/Services"));
const Pricing = lazy(() => import("../components/Pricing"));
const NoticeModal = lazy(() => import("../components/NoticeModal"));
const About = lazy(() => import('../components/About'));
const Contact = lazy(() => import('../components/Contact'));
const WhatsAppFloatingButton = lazy(() => import("../components/WhatsAppFloatingButton"));

export default function LandingApp() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <Header
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />
      <Hero />

      <Suspense fallback={null}>
        <NoticeModal />
      </Suspense>

      <Suspense fallback={null}>
        <Pricing />
      </Suspense>

      <Suspense fallback={null}>
        <Services />
      </Suspense>

      <Suspense fallback={null}>
        {showAbout && <About />}
        {showContact && <Contact />}
      </Suspense>
      
      <Footer />
      
      <Suspense fallback={null}>
        <WhatsAppFloatingButton />
      </Suspense>
    </div>
  );
}
