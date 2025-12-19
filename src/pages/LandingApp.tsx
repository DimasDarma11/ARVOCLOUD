import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

const Services = lazy(() => import("../components/Services"));
const About = React.memo(lazy(() => import('../components/About')));
const Contact = React.memo(lazy(() => import("../components/Contact")));
const WhatsAppFloatingButton = lazy(() => import("../components/WhatsAppFloatingButton"));

const Skeleton = ({ height = 20 }: { height?: number }) => (
  <div
    className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full"
    style={{ height }}
  />
);

export default function LandingApp() {
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    import("../components/WhatsAppFloatingButton");
    import("../components/About");
    import("../components/Contact");
  }, []);

  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      <Header
        onAboutClick={() => setShowAbout(true)}
        onContactClick={() => setShowContact(true)}
      />

      {/* HERO */}
      <Hero />

      {/* SERVICES / USE CASE */}
      <Suspense fallback={<Skeleton height={64} />}>
        <Services />
      </Suspense>

      {/* MODAL */}
      <Suspense fallback={<Skeleton height={16} />}>
        {showAbout && <About />}
        {showContact && <Contact />}
      </Suspense>

      <Footer />

      {/* FLOATING WA */}
      <Suspense fallback={null}>
        <WhatsAppFloatingButton />
      </Suspense>
    </div>
  );
}
