import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LandingApp = lazy(() => import("./pages/LandingApp"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<LandingApp />} />

        {/* Pricing Page */}
        <Route path="/pricing" element={<PricingPage />} />

        {/* Email Verification */}
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Suspense>
  );
}
