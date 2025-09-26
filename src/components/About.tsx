import React from 'react';
import { Award, Users, Clock, Headphones, Shield, Globe } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: <Users className="h-8 w-8" />, number: "1000+", label: "Happy Clients" },
    { icon: <Clock className="h-8 w-8" />, number: "99.9%", label: "Uptime Guarantee" },
    { icon: <Award className="h-8 w-8" />, number: "5+", label: "Years Experience" },
    { icon: <Globe className="h-8 w-8" />, number: "10+", label: "Data Centers" }
  ];

  const features = [
    {
      icon: <Shield className="h-12 w-12" />,
      title: "Enterprise Security",
      description: "Multi-layered security with DDoS protection, firewalls, and continuous monitoring to keep your data safe."
    },
    {
      icon: <Headphones className="h-12 w-12" />,
      title: "24/7 Expert Support",
      description: "Our technical support team is available around the clock to help you with any issues or questions."
    },
    {
      icon: <Globe className="h-12 w-12" />,
      title: "Global Infrastructure",
      description: "Multiple data centers worldwide ensuring low latency and high availability for your applications."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ARVOCLOUD</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're not just another hosting provider. ARVOCLOUD delivers enterprise-grade cloud infrastructure 
              with unmatched performance, security, and support to power your business growth.
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-3 rounded-xl flex-shrink-0">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To provide reliable, secure, and high-performance cloud infrastructure solutions 
                  that empower businesses to achieve their digital transformation goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Reliability</h4>
              <p className="text-gray-600">We guarantee 99.9% uptime with redundant systems and proactive monitoring.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Customer First</h4>
              <p className="text-gray-600">Your success is our priority. We provide personalized support and solutions.</p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">Innovation</h4>
              <p className="text-gray-600">We continuously invest in cutting-edge technology and infrastructure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
