import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Server, Monitor, Cpu, Globe } from 'lucide-react';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<'vps' | 'rdp' | 'baremetal'>('vps');
  const [selectedCountry, setSelectedCountry] = useState('us');

  const countries = [
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'sg', name: 'Singapore', flag: '🇸🇬' },
    { code: 'id', name: 'Indonesia', flag: 'id' }
  ];

  const categories = [
    { id: 'vps', name: 'VPS Hosting', icon: Server, description: 'Virtual Private Servers' },
    { id: 'rdp', name: 'RDP Solutions', icon: Monitor, description: 'Remote Desktop Services' },
    { id: 'baremetal', name: 'Bare Metal', icon: Cpu, description: 'Dedicated Hardware' }
  ];

  const plans = {
    vps: [
      {
        name: 'VPS Starter',
        icon: Zap,
        popular: false,
        price: { monthly: 12, yearly: 120 },
        description: 'Perfect for small projects and development',
        specs: {
          cpu: '1 vCPU Core',
          ram: '2GB RAM',
          storage: '25GB NVMe SSD',
          bandwidth: '1TB Transfer',
          ip: '1 IPv4'
        },
        features: [
          'Full Root Access',
          'SSD NVMe Storage',
          'Multiple OS Options',
          '24/7 Support',
          'Free Setup',
          'DDoS Protection',
          'KVM Virtualization'
        ],
        gradient: 'from-blue-500 to-cyan-500'
      },
      {
        name: 'VPS Professional',
        icon: Star,
        popular: true,
        price: { monthly: 25, yearly: 250 },
        description: 'Ideal for growing websites and applications',
        specs: {
          cpu: '2 vCPU Cores',
          ram: '4GB RAM',
          storage: '50GB NVMe SSD',
          bandwidth: '2TB Transfer',
          ip: '1 IPv4'
        },
        features: [
          'Full Root Access',
          'SSD NVMe Storage',
          'Multiple OS Options',
          '24/7 Priority Support',
          'Free Setup & Migration',
          'Advanced DDoS Protection',
          'KVM Virtualization',
          'Weekly Backups'
        ],
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        name: 'VPS Enterprise',
        icon: Crown,
        popular: false,
        price: { monthly: 55, yearly: 550 },
        description: 'High-performance for demanding applications',
        specs: {
          cpu: '4 vCPU Cores',
          ram: '8GB RAM',
          storage: '100GB NVMe SSD',
          bandwidth: '4TB Transfer',
          ip: '2 IPv4'
        },
        features: [
          'Full Root Access',
          'Premium NVMe Storage',
          'Multiple OS Options',
          '24/7 Enterprise Support',
          'Free Setup & Migration',
          'Enterprise DDoS Protection',
          'KVM Virtualization',
          'Daily Backups',
          'Monitoring Dashboard'
        ],
        gradient: 'from-orange-500 to-red-500'
      }
    ],
    rdp: [
      {
        name: 'RDP Basic',
        icon: Zap,
        popular: false,
        price: { monthly: 18, yearly: 180 },
        description: 'Entry-level Windows RDP solution',
        specs: {
          cpu: '2 vCPU Cores',
          ram: '4GB RAM',
          storage: '50GB SSD',
          os: 'Windows Server 2019',
          users: '2 Concurrent Users'
        },
        features: [
          'Windows Server 2019/2022',
          'Admin Access',
          'High-Speed RDP',
          'Multiple Users Support',
          '24/7 Support',
          'Free Setup',
          'Remote Desktop Gateway',
          'SSL Certificate'
        ],
        gradient: 'from-blue-500 to-cyan-500'
      },
      {
        name: 'RDP Professional',
        icon: Star,
        popular: true,
        price: { monthly: 35, yearly: 350 },
        description: 'Perfect for business applications',
        specs: {
          cpu: '4 vCPU Cores',
          ram: '8GB RAM',
          storage: '100GB SSD',
          os: 'Windows Server 2022',
          users: '5 Concurrent Users'
        },
        features: [
          'Windows Server 2019/2022',
          'Admin Access',
          'High-Speed RDP',
          'GPU Acceleration',
          'Multiple Users Support',
          'Priority Support',
          'Free Migration',
          'Advanced Security',
          'Office Suite Compatible',
          'Custom Software Installation'
        ],
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        name: 'RDP Enterprise',
        icon: Crown,
        popular: false,
        price: { monthly: 75, yearly: 750 },
        description: 'High-performance RDP for teams',
        specs: {
          cpu: '8 vCPU Cores',
          ram: '16GB RAM',
          storage: '200GB SSD',
          os: 'Windows Server 2022',
          users: '10 Concurrent Users'
        },
        features: [
          'Windows Server 2019/2022',
          'Full Admin Access',
          'Ultra High-Speed RDP',
          'Dedicated GPU',
          'Unlimited Users',
          'Enterprise Support',
          'Free Migration & Setup',
          'Advanced Security Suite',
          'Office Suite Included',
          'Custom Domain Support',
          'Load Balancing'
        ],
        gradient: 'from-orange-500 to-red-500'
      }
    ],
    baremetal: [
      {
        name: 'Bare Metal Starter',
        icon: Zap,
        popular: false,
        price: { monthly: 149, yearly: 1490 },
        description: 'Entry-level dedicated server',
        specs: {
          cpu: 'Intel Xeon E3-1230',
          ram: '16GB ECC RAM',
          storage: '500GB NVMe SSD',
          bandwidth: 'Unlimited',
          network: '1Gbps Port'
        },
        features: [
          'Dedicated Hardware',
          'No Virtualization Overhead',
          'IPMI Access',
          'Custom OS Installation',
          '100% Hardware Control',
          'Enterprise Support',
          'Hardware Replacement',
          'Network Monitoring'
        ],
        gradient: 'from-blue-500 to-cyan-500'
      },
      {
        name: 'Bare Metal Professional',
        icon: Star,
        popular: true,
        price: { monthly: 299, yearly: 2990 },
        description: 'High-performance dedicated server',
        specs: {
          cpu: 'Intel Xeon E5-2670',
          ram: '32GB ECC RAM',
          storage: '1TB NVMe SSD',
          bandwidth: 'Unlimited',
          network: '10Gbps Port'
        },
        features: [
          'Dedicated Hardware',
          'No Virtualization Overhead',
          'IPMI Access',
          'Custom RAID Setup',
          '100% Hardware Control',
          'Enterprise Support',
          'Hardware Replacement',
          'Network Monitoring',
          'Custom OS Images',
          'SLA Guarantee'
        ],
        gradient: 'from-purple-500 to-pink-500'
      },
      {
        name: 'Bare Metal Enterprise',
        icon: Crown,
        popular: false,
        price: { monthly: 599, yearly: 5990 },
        description: 'Maximum performance dedicated server',
        specs: {
          cpu: 'Dual Intel Xeon Gold',
          ram: '128GB ECC RAM',
          storage: '2TB NVMe SSD',
          bandwidth: 'Unlimited',
          network: '25Gbps Port'
        },
        features: [
          'Dual CPU Configuration',
          'No Virtualization Overhead',
          'IPMI Access',
          'Custom RAID Setup',
          '100% Hardware Control',
          'Enterprise Support',
          'Hardware Replacement',
          'Network Monitoring',
          'Custom OS Images',
          'SLA Guarantee',
          'Dedicated Account Manager',
          'Priority Hardware Allocation'
        ],
        gradient: 'from-orange-500 to-red-500'
      }
    ]
  };

  const currentPlans = plans[selectedCategory];

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your needs. All plans include premium features and 24/7 support.
          </p>

          {/* Country Selection */}
          <div className="flex items-center justify-center mb-8">
            <Globe className="h-5 w-5 text-cyan-400 mr-3" />
            <span className="text-gray-300 mr-4">Select Location:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* Service Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <div className="text-left">
                  <div className="text-sm font-semibold">{category.name}</div>
                  <div className="text-xs opacity-75">{category.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <span className={`mr-3 ${billingCycle === 'monthly' ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative w-16 h-8 bg-slate-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <div className={`w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-lg transform transition-transform duration-300 ${
                billingCycle === 'yearly' ? 'translate-x-8' : 'translate-x-0'
              }`}></div>
            </button>
            <span className={`ml-3 ${billingCycle === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-green-400 text-sm">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800 rounded-2xl p-8 border transition-all duration-500 hover:transform hover:scale-105 ${
                plan.popular 
                  ? 'border-cyan-400 shadow-2xl shadow-cyan-400/20' 
                  : 'border-slate-700 hover:border-slate-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl p-4 mx-auto mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">
                    ${plan.price[billingCycle]}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8 p-6 bg-slate-900/50 rounded-xl">
                <h4 className="text-lg font-semibold text-white mb-4">Specifications</h4>
                <div className="space-y-2 text-gray-300">
                  {Object.entries(plan.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="text-cyan-400">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full bg-gradient-to-r ${plan.gradient} text-white py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Custom Solutions */}
        <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 border border-slate-700">
          <h3 className="text-3xl font-bold text-white mb-4">Need Custom Configuration?</h3>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We offer fully customizable solutions tailored to your specific requirements. 
            Contact our team for personalized pricing and configurations for any location worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition-all duration-300 hover:shadow-xl">
              Contact Sales Team
            </button>
            <button className="border border-gray-600 hover:border-cyan-400 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg">
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

