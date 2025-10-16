import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  ShoppingBag,
  FileText,
  Server,
  Settings,
  CheckCircle,
  PlusCircle,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

// ====================== INTERFACES ======================
interface Order {
  id: string;
  user_id: string;
  status: string;
  created_at: string;
  expires_at: string | null;
  profiles: { full_name: string; whatsapp_number: string };
  products: { name: string };
  os_choice: string;
  total_price: number;
}

interface Invoice {
  id: string;
  invoice_number: string;
  status: string;
  amount: number;
  created_at: string;
  profiles: { full_name: string };
  order_id: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  specs: any;
  is_active: boolean;
  created_at?: string;
}

interface TelegramConfig {
  id?: string;
  bot_token: string;
  chat_id: string;
  expiry_warning_days: number;
  is_active: boolean;
}

// ====================== ADMIN COMPONENT ======================
export function Admin() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'orders' | 'invoices' | 'products' | 'telegram'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>({
    bot_token: '',
    chat_id: '',
    expiry_warning_days: 7,
    is_active: true,
  });
  const [loading, setLoading] = useState(true);

  // ====================== FETCH DATA ======================
  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'invoices') fetchInvoices();
    if (activeTab === 'products') fetchProducts();
    if (activeTab === 'telegram') fetchTelegramConfig();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, profiles(full_name, whatsapp_number), products(name)')
      .order('created_at', { ascending: false });
    if (error) console.error('Orders fetch error:', error.message);
    if (data) setOrders(data);
    setLoading(false);
  };

  const fetchInvoices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('invoices')
      .select('*, profiles(full_name)')
      .order('created_at', { ascending: false });
    if (error) console.error('Invoices fetch error:', error.message);
    if (data) setInvoices(data);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) console.error('Products fetch error:', error.message);
    if (data) setProducts(data);
  };

  const fetchTelegramConfig = async () => {
    const { data } = await supabase.from('telegram_config').select('*').maybeSingle();
    if (data) setTelegramConfig(data);
  };

  // ====================== INVOICE HANDLER ======================
  const handleVerifyPayment = async (invoiceId: string) => {
    const { data: inv } = await supabase.from('invoices').select('order_id').eq('id', invoiceId).single();
    const orderId = inv?.order_id;

    await supabase.from('invoices').update({ status: 'paid', paid_at: new Date() }).eq('id', invoiceId);
    await supabase.from('orders').update({ status: 'provisioning' }).eq('id', orderId);
    alert('✅ Payment verified and order provisioning!');
    fetchInvoices();
  };

  // ====================== PRODUCT HANDLERS ======================
  const handleAddProduct = async () => {
    const newProduct = {
      category: 'vps',
      name: 'New Product',
      description: 'Edit me',
      price: 10000,
      specs: {},
      is_active: true,
    };
    const { error } = await supabase.from('products').insert([newProduct]);
    if (error) alert('❌ ' + error.message);
    else {
      alert('✅ Product added!');
      fetchProducts();
    }
  };

  const handleUpdateProduct = async (id: string, field: keyof Product, value: any) => {
    const { error } = await supabase.from('products').update({ [field]: value }).eq('id', id);
    if (error) alert('❌ Failed: ' + error.message);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Hapus produk ini?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  // ====================== TELEGRAM HANDLER ======================
  const handleSaveTelegramConfig = async () => {
    const { data } = await supabase.from('telegram_config').select('id').maybeSingle();
    if (data) {
      await supabase.from('telegram_config').update(telegramConfig).eq('id', data.id);
    } else {
      await supabase.from('telegram_config').insert([telegramConfig]);
    }
    alert('✅ Telegram configuration saved!');
    fetchTelegramConfig();
  };

  // ====================== ACCESS CHECK ======================
  if (!profile?.is_admin) {
    return (
      <Layout>
        <div className="text-center py-12 text-red-600 font-semibold">
          Access Denied — Admin Only
        </div>
      </Layout>
    );
  }

  // ====================== UI ======================
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage orders, invoices, products, and Telegram settings</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200">
          {[
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'invoices', label: 'Invoices', icon: FileText },
            { id: 'products', label: 'Products', icon: Server },
            { id: 'telegram', label: 'Telegram', icon: Settings },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-3 font-medium border-b-2 ${
                activeTab === id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
          </div>
        ) : (
          <>
            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Order ID', 'Customer', 'Product', 'Status', 'Created'].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium text-gray-800">{o.id}</td>
                        <td className="px-6 py-3">{o.profiles?.full_name || '—'}</td>
                        <td className="px-6 py-3">{o.products?.name || '—'}</td>
                        <td className="px-6 py-3">{o.status}</td>
                        <td className="px-6 py-3 text-sm">
                          {new Date(o.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* INVOICES TAB */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {['Invoice #', 'Customer', 'Amount', 'Status', 'Date', 'Actions'].map((h) => (
                        <th
                          key={h}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((i) => (
                      <tr key={i.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 font-medium">{i.invoice_number}</td>
                        <td className="px-6 py-3">{i.profiles?.full_name}</td>
                        <td className="px-6 py-3 font-semibold text-gray-800">
                          Rp {i.amount?.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              i.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {i.status}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm">
                          {new Date(i.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3">
                          {i.status === 'pending_verification' && (
                            <Button
                              onClick={() => handleVerifyPayment(i.id)}
                              className="bg-green-600 hover:bg-green-700 text-white text-xs"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Verify
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Product Management</h3>
                  <Button onClick={handleAddProduct} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <PlusCircle className="w-4 h-4 mr-1" /> Add Product
                  </Button>
                </div>

                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Price (Rp)</th>
                      <th className="px-4 py-2 text-left">Active</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b">
                        <td className="px-4 py-2">
                          <Input
                            value={p.name}
                            onChange={(e) => handleUpdateProduct(p.id, 'name', e.target.value)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            type="number"
                            value={p.price ?? 0}
                            onChange={(e) => handleUpdateProduct(p.id, 'price', Number(e.target.value))}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Switch
                            checked={p.is_active}
                            onCheckedChange={(v) => handleUpdateProduct(p.id, 'is_active', v)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TELEGRAM TAB */}
            {activeTab === 'telegram' && (
              <div className="bg-white rounded-xl shadow-sm p-6 space-y-4 max-w-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Telegram Configuration</h3>
                <Input
                  placeholder="Bot Token"
                  value={telegramConfig.bot_token}
                  onChange={(e) => setTelegramConfig({ ...telegramConfig, bot_token: e.target.value })}
                />
                <Input
                  placeholder="Chat ID"
                  value={telegramConfig.chat_id}
                  onChange={(e) => setTelegramConfig({ ...telegramConfig, chat_id: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Expiry Warning Days"
                  value={telegramConfig.expiry_warning_days}
                  onChange={(e) =>
                    setTelegramConfig({ ...telegramConfig, expiry_warning_days: Number(e.target.value) })
                  }
                />
                <div className="flex items-center justify-between">
                  <span>Active</span>
                  <Switch
                    checked={telegramConfig.is_active}
                    onCheckedChange={(v) => setTelegramConfig({ ...telegramConfig, is_active: v })}
                  />
                </div>
                <Button onClick={handleSaveTelegramConfig} className="bg-blue-600 text-white w-full">
                  Save Configuration
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
