import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingApp from './pages/LandingApp';
import DashboardApp from './pages/DashboardApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingApp />} />

        {/* Dashboard system */}
        <Route path="/app/*" element={<DashboardApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


