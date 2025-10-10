import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <div className="min-h-screen relative">
      <LoadingScreen />
      
      <Header />
      <Hero />
      <Services />
      <Pricing />
      <About />
      <Contact />
      <Footer />

      <a
        href="https://wa.me/6283197183724?text=Halo%20Arvocloud!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold transition-all hover:scale-105 z-50"
      >
        💬 Chat Admin
      </a>
    </div>
  );
}

export default App;

