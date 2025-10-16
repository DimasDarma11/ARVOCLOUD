import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Server, Cpu, HardDrive, Zap, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price_per_month: number;
  specs: {
    cpu?: string;
    ram?: string;
    storage?: string;
    bandwidth?: string;
  };
}

const OS_OPTIONS = {
  VPS: ['Ubuntu 22.04', 'Ubuntu 24.04', 'Debian 12', 'Debian 14'],
  RDP: ['Windows 10 Ghost Spectre', 'Windows 11 Ghost Spectre'],
  Baremetal: ['Windows 10 Ghost Spectre', 'Windows 11 Ghost Spectre'],
};

export function OrderServer() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'VPS' | 'RDP' | 'Baremetal'>('VPS');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOS, setSelectedOS] = useState('');
  const [duration, setDuration] = useState({ value: 1, unit: 'months' });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', selectedCategory)
      .eq('is_active', true)
      .order('price_per_month', { ascending: true });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const calculateTotalPrice = () => {
    if (!selectedProduct) return 0;

    const monthlyPrice = selectedProduct.price_per_month;
    let multiplier = duration.value;

    if (duration.unit === 'days') {
      multiplier = duration.value / 30;
    } else if (duration.unit === 'years') {
      multiplier = duration.value * 12;
    }

    return monthlyPrice * multiplier;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !selectedOS || !user) return;

    setSubmitting(true);

    try {
      const totalPrice = calculateTotalPrice();
      const whatsappContact = profile?.whatsapp_number || '';

      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          product_id: selectedProduct.id,
          os_choice: selectedOS,
          duration_value: duration.value,
          duration_unit: duration.unit,
          total_price: totalPrice,
          status: 'pending',
          whatsapp_contact: whatsappContact,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const { data: expiryData } = await supabase.rpc('calculate_expiry_date', {
        duration_val: duration.value,
        duration_unit: duration.unit,
      });

      await supabase
        .from('orders')
        .update({ expires_at: expiryData })
        .eq('id', orderData.id);

      const invoiceNumber = `INV-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .insert({
          invoice_number: invoiceNumber,
          order_id: orderData.id,
          user_id: user.id,
          amount: Number(totalPrice),
          status: 'unpaid',
        })
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const { error: credError } = await supabase
        .from('server_credentials')
        .insert({
          order_id: orderData.id,
        });

      if (credError) throw credError;

      try {
        const notifyUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-notify`;
        await fetch(notifyUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'new_order',
            data: {
              order_id: orderData.id,
              customer_name: profile?.full_name,
              product_name: selectedProduct.name,
              amount: totalPrice,
              whatsapp: whatsappContact,
            },
          }),
        });
      } catch (notifyError) {
        console.error('Failed to send Telegram notification:', notifyError);
      }

      navigate(`/app/checkout/${invoiceData.id}`);
    } catch (error: any) {
      alert('Failed to create order: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order Server</h1>
          <p className="text-gray-600 mt-2">Choose your cloud solution</p>
        </div>

        <div className="flex space-x-4 border-b border-gray-200">
          {(['VPS', 'RDP', 'Baremetal'] as const).map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedProduct(null);
                setSelectedOS('');
              }}
              className={`px-6 py-3 font-medium transition-colors border-b-2 ${
                selectedCategory === category
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all cursor-pointer ${
                  selectedProduct?.id === product.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Server className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                )}

                <div className="space-y-2 mb-4">
                  {product.specs.cpu && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Cpu className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{product.specs.cpu}</span>
                    </div>
                  )}
                  {product.specs.ram && (
                    <div className="flex items-center space-x-2 text-sm">
                      <Zap className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{product.specs.ram}</span>
                    </div>
                  )}
                  {product.specs.storage && (
                    <div className="flex items-center space-x-2 text-sm">
                      <HardDrive className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{product.specs.storage}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price_per_month.toLocaleString('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0,
                      })}
                    </span>
                    <span className="text-gray-500">/bulan</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedProduct && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Configure Your Order</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Operating System
              </label>
              <select
                value={selectedOS}
                onChange={(e) => setSelectedOS(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select OS</option>
                {OS_OPTIONS[selectedCategory].map((os) => (
                  <option key={os} value={os}>
                    {os}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <input
                  type="number"
                  min="1"
                  value={duration.value}
                  onChange={(e) => setDuration({ ...duration, value: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={duration.unit}
                  onChange={(e) => setDuration({ ...duration, unit: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Selected Product:</span>
                <span className="font-semibold text-gray-900">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Duration:</span>
                <span className="font-semibold text-gray-900">
                  {duration.value} {duration.unit}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-blue-200">
                <span className="text-lg font-semibold text-gray-900">Total Price:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {calculateTotalPrice().toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting || !selectedOS}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{submitting ? 'Creating Order...' : 'Proceed to Payment'}</span>
            </button>
          </form>
        )}
      </div>
    </Layout>
  );
}
