import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Services = lazy(() => import("../components/Services"));
const Pricing = lazy(() => import("../components/Pricing"));
const NoticeModal = lazy(() => import("../components/NoticeModal"));
const About = React.memo(lazy(() => import('../components/About')));
const Contact = React.memo(lazy(() => import("../components/Contact")));
const WhatsAppFloatingButton = lazy(() => import("../components/WhatsAppFloatingButton"));

export default function LandingApp() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    import("../components/WhatsAppFloatingButton");
  }, []);


  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <Header
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />
      <Hero />

      <Suspense fallback={<div className="h-4"></div>}>
        <NoticeModal />
      </Suspense>

      <Suspense fallback={<div className="h-8"></div>}>
        <Pricing />
      </Suspense>

      <Suspense fallback={<div className="h-8"></div>}>
        <Services />
      </Suspense>

      <Suspense fallback={<div className="h-4"></div>}>
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
