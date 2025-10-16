import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingApp from './pages/LandingApp';
import DashboardApp from './pages/DashboardApp';
import { VerifyEmail } from './pages/VerifyEmail';

function App() {
  return (
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingApp />} />

        {/* Dashboard system */}
        <Route path="/app/*" element={<DashboardApp />} />

        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
  );
}

export default App;


