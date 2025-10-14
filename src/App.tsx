import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingApp from './pages/LandingApp';
import DashboardApp from './pages/DashboardApp';

function App() {
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<LandingApp />} />

      {/* Dashboard system */}
      <Route path="/dashboard/*" element={<DashboardApp />} />
    </Routes>
  );
}

export default App;


