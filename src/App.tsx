import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LandingApp = lazy(() => import("./pages/LandingApp"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingApp />} />

        {/* Email Verification */}
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Suspense>
  );
}
