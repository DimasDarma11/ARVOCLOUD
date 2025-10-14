import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.tsx'; // ini router utama yg berisi LandingApp & DashboardApp
import LoginPage from './pages/LoginPage.tsx';
import Rules from './pages/Rules.tsx';
import Status from './pages/Status.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* App utama yang mengatur landing & dashboard */}
        <Route path="/*" element={<App />} />

        {/* Halaman tambahan khusus */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

