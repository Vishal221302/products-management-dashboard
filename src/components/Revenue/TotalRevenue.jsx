// components/revenue/TotalRevenue.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Target,
  PieChart,
  BarChart3,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import axios from 'axios';

const TotalRevenue = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [revenueData, setRevenueData] = useState({
    total: 0,
    monthly: 0,
    growth: 0,
    targets: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, [timeRange]);

  const fetchRevenueData = async () => {
    try {
      setLoading(true);
      // Fetch carts data to simulate revenue
      const response = await axios.get('https://fakestoreapi.com/carts');
      const carts = response.data;
      
      // Calculate revenue from carts
      let totalRevenue = 0;
      carts.forEach(cart => {
        cart.products?.forEach(product => {
          totalRevenue += product.quantity * product.price;
        });
      });
      
      // Generate realistic revenue data
      const monthlyRevenue = totalRevenue * 12;
      const growth = Math.random() * 25 + 5; // 5-30% growth
      
      setRevenueData({
        total: totalRevenue.toFixed(2),
        monthly: monthlyRevenue.toFixed(2),
        growth: growth.toFixed(1),
        targets: {
          monthly: (monthlyRevenue * 1.15).toFixed(2),
          quarterly: (monthlyRevenue * 3 * 1.1).toFixed(2),
          annual: (monthlyRevenue * 12 * 1.08).toFixed(2)
        }
      });
      
    } catch (error) {
      console.error('Error fetching revenue data:', error);
      // Fallback data
      setRevenueData({
        total: '124,850.75',
        monthly: '45,280.50',
        growth: '18.3',
        targets: {
          monthly: '52,072.58',
          quarterly: '149,425.65',
          annual: '587,420.10'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const timeRanges = [
    { id: 'week', label: 'Week', revenue: '$8,450' },
    { id: 'month', label: 'Month', revenue: '$45,280' },
    { id: 'quarter', label: 'Quarter', revenue: '$136,840' },
    { id: 'year', label: 'Year', revenue: '$587,420' }
  ];

  const revenueSources = [
    { name: 'Product Sales', value: 65, color: 'from-blue-500 to-cyan-500' },
    { name: 'Subscriptions', value: 25, color: 'from-emerald-500 to-teal-500' },
    { name: 'Services', value: 7, color: 'from-purple-500 to-pink-500' },
    { name: 'Other', value: 3, color: 'from-amber-500 to-orange-500' }
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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Total Revenue</h2>
              <p className="text-gray-500 text-sm mt-1">Overall revenue performance and trends</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Time Range Selector */}
        <div className="mb-8">
          <div className="flex items-center gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Revenue Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Revenue Overview */}
          <div className="space-y-6">
            {/* Main Revenue Card */}
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <DollarSign className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm text-emerald-600 font-medium">Total Revenue</div>
                    <div className="text-3xl font-bold text-gray-900 mt-1">
                      ${parseFloat(revenueData.total).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-emerald-600">
                    +{revenueData.growth}%
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Monthly Target</span>
                  <span>${parseFloat(revenueData.targets.monthly).toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(revenueData.total / revenueData.targets.monthly * 100).toFixed(0)}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Revenue Growth */}
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-white border border-gray-200 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Growth</h3>
                <div className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">+{revenueData.growth}% MoM</span>
                </div>
              </div>
              
              <div className="h-32 flex items-end gap-1">
                {[65, 72, 68, 75, 80, 78, 82, 85, 88, 90, 92, 95].map((height, index) => (
                  <motion.div
                    key={index}
                    className="flex-1"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <div className="h-full bg-gradient-to-t from-emerald-500 to-teal-400 rounded-t-lg" />
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, i) => (
                  <span key={i}>{month}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Revenue Breakdown */}
          <div className="space-y-6">
            {/* Revenue Sources */}
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-white border border-gray-200 rounded-2xl"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue Sources</h3>
              
              <div className="space-y-4">
                {revenueSources.map((source, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${source.color}`} />
                        <span className="text-sm font-medium text-gray-700">{source.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{source.value}%</span>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${source.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${source.value}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Distribution</span>
                  <span className="font-semibold text-gray-900">100%</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                variants={itemVariants}
                className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <div className="text-sm text-blue-600">Monthly Target</div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ${parseFloat(revenueData.targets.monthly).toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1">88% achieved</div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div className="text-sm text-purple-600">Avg. Value</div>
                </div>
                <div className="text-xl font-bold text-gray-900">$89.50</div>
                <div className="text-xs text-gray-500 mt-1">Per customer</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Recurring Revenue', value: '$24,850', change: '+12.5%', icon: DollarSign, color: 'text-emerald-600' },
              { label: 'One-time Sales', value: '$20,430', change: '+8.2%', icon: BarChart3, color: 'text-blue-600' },
              { label: 'New Customers', value: '1,248', change: '+15.3%', icon: Users, color: 'text-purple-600' },
              { label: 'Renewal Rate', value: '92.5%', change: '+3.1%', icon: PieChart, color: 'text-amber-600' }
            ].map((metric, index) => (
              <div key={index} className="p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${metric.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                </div>
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
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TotalRevenue;