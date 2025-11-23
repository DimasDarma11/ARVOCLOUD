import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

const App = lazy(() => import("./App.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const Rules = lazy(() => import("./components/Rules.tsx"));
const Status = lazy(() => import("./pages/Status.tsx"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
