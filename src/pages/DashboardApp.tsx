import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Login } from './Login';
import { Signup } from './Signup';
import { CustomerDashboard } from './CustomerDashboard';
import { OrderServer } from './OrderServer';
import { Checkout } from './Checkout';
import { Invoices } from './Invoices';
import { Admin } from './Admin';
import { Profile } from './Profile';

function DashboardApp() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Semua halaman dalam /app/ */}
        <Route path="/app/*" element={
          <ProtectedRoute>
            <Routes>
              <Route path="dashboard" element={<CustomerDashboard />} />
              <Route path="order" element={<OrderServer />} />
              <Route path="checkout/:invoiceId" element={<Checkout />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="profile" element={<Profile />} />
              <Route path="admin" element={<Admin />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Routes>
          </ProtectedRoute>
        }/>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/app/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default DashboardApp;
