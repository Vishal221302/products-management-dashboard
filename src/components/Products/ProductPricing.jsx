import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, TrendingUp, Users, CheckCircle } from 'lucide-react';

const ProductPricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29',
      period: 'per month',
      features: [
        'Up to 10 products',
        'Basic analytics',
        'Email support',
        '1 team member',
        '500 API calls/month'
      ],
      popular: false,
      color: 'from-blue-400 to-blue-500'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$89',
      period: 'per month',
      features: [
        'Up to 100 products',
        'Advanced analytics',
        'Priority support',
        '5 team members',
        '10,000 API calls/month',
        'Custom integrations',
        'White-labeling'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$299',
      period: 'per month',
      features: [
        'Unlimited products',
        'Enterprise analytics',
        '24/7 phone support',
        'Unlimited team members',
        'Unlimited API calls',
        'Custom integrations',
        'White-labeling',
        'SLA guarantee',
        'Custom development'
      ],
      popular: false,
      color: 'from-emerald-500 to-teal-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Product Pricing</h3>
          <p className="text-gray-500 text-sm mt-0.5">Manage pricing plans and subscriptions</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-600">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">+24.7% MRR growth</span>
        </div>
      </div>

      {/* Pricing Plans */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={cardVariants}
            whileHover="hover"
            onClick={() => setSelectedPlan(plan.id)}
            className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all ${
              selectedPlan === plan.id 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Select Button */}
            <button
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                selectedPlan === plan.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {selectedPlan === plan.id ? 'Selected Plan' : 'Select Plan'}
            </button>

            {/* Stats */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>1.2K users</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span>+24% growth</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Billing Summary */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Billing Summary</h4>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-600">Monthly Billing</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Current Plan</div>
            <div className="text-lg font-bold text-gray-900">Professional</div>
            <div className="text-sm text-gray-600">$89/month</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Next Billing</div>
            <div className="text-lg font-bold text-gray-900">Dec 15, 2024</div>
            <div className="text-sm text-gray-600">Auto-renewal</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Total Revenue</div>
            <div className="text-lg font-bold text-gray-900">$45,820</div>
            <div className="text-sm text-emerald-600">+24.7% growth</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPricing;