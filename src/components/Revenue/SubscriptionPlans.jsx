// components/revenue/SubscriptionPlans.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Crown,
  Zap,
  Star,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const subscriptionPlans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: Star,
      price: '$9.99',
      period: '/month',
      users: '1,245',
      growth: '+12.5%',
      revenue: '$12,430',
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      features: ['Up to 5 projects', 'Basic analytics', 'Email support', '1GB storage']
    },
    {
      id: 'pro',
      name: 'Professional',
      icon: Zap,
      price: '$29.99',
      period: '/month',
      users: '892',
      growth: '+18.3%',
      revenue: '$26,750',
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '10GB storage', 'Team collaboration']
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Crown,
      price: '$99.99',
      period: '/month',
      users: '345',
      growth: '+8.2%',
      revenue: '$34,500',
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      border: 'border-purple-200',
      features: ['Everything in Pro', 'Custom integrations', '24/7 phone support', '100GB storage', 'Dedicated account manager', 'API access']
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Users,
      price: 'Custom',
      period: '/year',
      users: '48',
      growth: '+25.7%',
      revenue: '$156,800',
      color: 'from-amber-500 to-orange-500',
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      border: 'border-amber-200',
      features: ['Custom everything', 'Unlimited storage', 'SLA 99.9%', 'On-premise deployment', 'Training & onboarding', 'Custom contracts']
    }
  ];

  const selectedPlanData = subscriptionPlans.find(plan => plan.id === selectedPlan);

  const planMetrics = [
    { label: 'Total Subscribers', value: '2,530', change: '+15.3%' },
    { label: 'Monthly Recurring', value: '$73,480', change: '+12.8%' },
    { label: 'Churn Rate', value: '2.3%', change: '-0.8%' },
    { label: 'Avg. Lifetime', value: '18 months', change: '+2.1%' }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Subscription Plans</h2>
            <p className="text-gray-500 text-sm mt-1">Pricing tiers and subscriber analytics</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Plan Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {planMetrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200"
            >
              <div className="text-sm text-gray-600 mb-2">{metric.label}</div>
              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
              <div className="flex items-center gap-1 mt-2">
                {metric.change.startsWith('+') ? (
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-rose-500" />
                )}
                <span className={`text-xs font-semibold ${
                  metric.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {subscriptionPlans.map((plan) => (
            <motion.button
              key={plan.id}
              variants={itemVariants}
              onClick={() => setSelectedPlan(plan.id)}
              whileHover={{ y: -4 }}
              className={`p-5 rounded-2xl border text-left transition-all ${
                selectedPlan === plan.id
                  ? `${plan.bg} ${plan.border} ring-2 ring-opacity-50 ${plan.color.replace('from-', 'ring-').split(' ')[0]}`
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${plan.color}`}>
                  <plan.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-semibold">{plan.growth}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                {plan.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 3 && (
                  <div className="text-sm text-gray-500">+{plan.features.length - 3} more features</div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Subscribers</div>
                    <div className="text-lg font-bold text-gray-900">{plan.users}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Revenue</div>
                    <div className="text-lg font-bold text-gray-900">{plan.revenue}</div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Selected Plan Details */}
        {selectedPlanData && (
          <motion.div 
            variants={itemVariants}
            className="p-6 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${selectedPlanData.color}`}>
                  <selectedPlanData.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedPlanData.name} Plan Details</h3>
                  <p className="text-gray-500 text-sm mt-1">Performance and subscriber analytics</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{selectedPlanData.revenue}</div>
                <div className="text-sm text-gray-500">Monthly Revenue</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Features */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Plan Features</h4>
                <div className="space-y-3">
                  {selectedPlanData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subscriber Analytics */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Subscriber Analytics</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Active Subscribers', value: selectedPlanData.users, change: selectedPlanData.growth },
                    { label: 'Monthly Growth', value: selectedPlanData.growth, change: '+2.1%' },
                    { label: 'Renewal Rate', value: '94.5%', change: '+1.3%' },
                    { label: 'Avg. Revenue', value: `$${parseFloat(selectedPlanData.revenue.replace('$', '').replace(',', '')) / parseInt(selectedPlanData.users.replace(',', '')).toFixed(2)}`, change: '+5.7%' }
                  ].map((metric, index) => (
                    <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-sm text-gray-600">{metric.label}</div>
                        <div className="flex items-center gap-1">
                          {metric.change.startsWith('+') ? (
                            <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                          ) : (
                            <ArrowDownRight className="w-3 h-3 text-rose-500" />
                          )}
                          <span className={`text-xs font-semibold ${
                            metric.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            {metric.change}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-gray-900">{metric.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Trend */}
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">Revenue Trend</h4>
                <div className="h-48 bg-white rounded-xl border border-gray-200 p-4">
                  <div className="h-full flex items-end gap-1">
                    {[40, 55, 65, 60, 75, 80, 85, 90, 88, 92, 95, 100].map((height, index) => (
                      <motion.div
                        key={index}
                        className="flex-1"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <div className={`h-full rounded-t-lg bg-gradient-to-t ${selectedPlanData.color}`} />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, i) => (
                      <span key={i}>{month}</span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
                  <div className="text-sm text-gray-600 mb-1">Projected Next Month</div>
                  <div className="text-lg font-bold text-gray-900">
                    ${(parseFloat(selectedPlanData.revenue.replace('$', '').replace(',', '')) * 1.12).toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-600 mt-1">+12% estimated growth</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SubscriptionPlans;