import React, { useEffect, useState } from "react";
import supabase from "../lib/supabase";
import { useAuth } from "../contexts/AuthContext";
import { Server, FileText, CreditCard, Activity } from "lucide-react";

export const DashboardOverview: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeServers: 0,
    pendingOrders: 0,
    unpaidInvoices: 0,
    totalSpent: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  const loadStats = async () => {
    try {
      const [ordersRes, invoicesRes] = await Promise.all([
        supabase.from("orders").select("status, total_amount").eq("customer_id", user?.id),
        supabase.from("invoices").select("status, amount").eq("customer_id", user?.id),
      ]);

      const activeServers = ordersRes.data?.filter((o) => o.status === "active").length || 0;
      const pendingOrders = ordersRes.data?.filter((o) => o.status === "pending").length || 0;
      const unpaidInvoices = invoicesRes.data?.filter((i) => i.status === "unpaid").length || 0;
      const totalSpent =
        invoicesRes.data?.filter((i) => i.status === "paid").reduce((sum, i) => sum + Number(i.amount), 0) || 0;

      setStats({ activeServers, pendingOrders, unpaidInvoices, totalSpent });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Active Servers",
      value: stats.activeServers,
      icon: Server,
      color: "bg-gradient-to-br from-gray-900 to-gray-700 text-white",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: Activity,
      color: "bg-gradient-to-br from-amber-500 to-orange-400 text-white",
    },
    {
      label: "Unpaid Invoices",
      value: stats.unpaidInvoices,
      icon: FileText,
      color: "bg-gradient-to-br from-rose-500 to-pink-400 text-white",
    },
    {
      label: "Total Spent",
      value: `Rp ${stats.totalSpent.toLocaleString("id-ID")}`,
      icon: CreditCard,
      color: "bg-gradient-to-br from-emerald-500 to-green-400 text-white",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

  return (
    <div className="text-gray-800">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-1">Dashboard Overview</h1>
        <p className="text-gray-500">
          Selamat datang kembali! Berikut ringkasan akun Anda.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-md`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Server Status Section */}
      <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Server Status</h2>
        </div>

        <div className="space-y-4">
          {[
            { label: "CPU Load", value: 8, color: "bg-green-500" },
            { label: "Memory Usage", value: 48, color: "bg-blue-500" },
            { label: "Network", value: 38, color: "bg-cyan-500" },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">{item.label}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          {[
            { label: "Uptime", value: "99.8%" },
            { label: "Support", value: "24/7" },
            { label: "Clients", value: "50+" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-semibold mb-1">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
