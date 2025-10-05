import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx"; 
import Rules from "./pages/Rules.tsx"; 
import Status from "./pages/Status.tsx"; 
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

