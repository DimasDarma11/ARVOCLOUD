import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '../components/LoginPage';
import { DashboardLayout } from '../components/DashboardLayout';
import { DashboardOverview } from '../components/DashboardOverview';
import { OrderServer } from '../components/OrderServer';
import { InvoiceList } from '../components/InvoiceList';
import { InvoiceDetail } from '../components/InvoiceDetail';
import { PaymentPage } from '../components/PaymentPage';
import { MyServers } from '../components/MyServers';

function DashboardContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('overview');
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [paymentInvoice, setPaymentInvoice] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user) return <LoginPage />;

  const handleOrderComplete = () => setCurrentPage('invoices');
  const handlePayInvoice = (invoiceId: string) => setPaymentInvoice(invoiceId);
  const handleViewInvoice = (invoiceId: string) => setSelectedInvoice(invoiceId);
  const handlePaymentComplete = () => {
    setPaymentInvoice(null);
    setCurrentPage('overview');
  };

  const renderPage = () => {
    if (paymentInvoice)
      return <PaymentPage invoiceId={paymentInvoice} onBack={() => setPaymentInvoice(null)} onPaymentComplete={handlePaymentComplete} />;
    if (selectedInvoice)
      return <InvoiceDetail invoiceId={selectedInvoice} onBack={() => setSelectedInvoice(null)} />;

    switch (currentPage) {
      case 'overview': return <DashboardOverview />;
      case 'servers': return <MyServers />;
      case 'order': return <OrderServer onOrderComplete={handleOrderComplete} />;
      case 'invoices': return <InvoiceList onPayInvoice={handlePayInvoice} onViewInvoice={handleViewInvoice} />;
      default: return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}

export default function DashboardApp() {
  return (
    <AuthProvider>
      <DashboardContent />
    </AuthProvider>
  );
}
