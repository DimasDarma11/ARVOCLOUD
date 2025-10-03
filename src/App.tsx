import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingThemeToggle from './components/FloatingThemeToggle';

function App() {
  return (
    <div className="min-h-screen relative">
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <About />
      <Contact />
      <Footer />
      
      {/* Floating theme toggle */}
      <FloatingThemeToggle />
    </div>
  );
}

export default App;

