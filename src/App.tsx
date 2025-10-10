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
        href="https://wa.me/6283197183724?text=Halo%20ArvoCloud!"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-lg bg-blue-500/20 border border-blue-400/30 shadow-md hover:bg-blue-500/30 transition-all duration-300"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          alt="WhatsApp"
          className="w-6 h-6 opacity-90 hover:opacity-100 transition-opacity"
        />
      </a>

    </div>
  );
}

export default App;

