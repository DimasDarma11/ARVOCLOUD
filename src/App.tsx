import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const LandingApp = lazy(() => import("./pages/LandingApp"));
const DashboardApp = lazy(() => import("./pages/DashboardApp"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingApp />} />

        {/* Dashboard System */}
        <Route path="/app/*" element={<DashboardApp />} />

        {/* Email Verification */}
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
    </Suspense>
  );
}
