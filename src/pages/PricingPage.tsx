import React, { Suspense, lazy } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Pricing = lazy(() => import("../components/Pricing"));
const NoticeModal = lazy(() => import("../components/NoticeModal"));

const Skeleton = ({ height = 64 }) => (
  <div
    className="animate-pulse bg-gray-200 dark:bg-gray-700 w-full"
    style={{ height }}
  />
);

export default function PricingPage() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Header />

      <Suspense fallback={<Skeleton height={16} />}>
        <NoticeModal />
      </Suspense>
      
      <Suspense fallback={<Skeleton />}>
        <Pricing />
      </Suspense>

      <Footer />
    </div>
  );
}
