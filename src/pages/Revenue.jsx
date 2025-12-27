// pages/Revenue.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import TotalRevenue from '../components/Revenue/TotalRevenue';
import SubscriptionPlans from '../components/Revenue/SubscriptionPlans';
import MonthlyYearlySales from '../components/Revenue/MonthlyYearlySales';
import RefundsCancellations from '../components/Revenue/RefundsCancellations';
import ARPU from '../components/Revenue/ARPU';


const Revenue = () => {
  const [dateRange, setDateRange] = useState('month');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

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
      className="min-h-screen bg-gray-50 p-4 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Revenue Analytics</h1>
            <p className="text-gray-500 mt-2">Monitor revenue performance, growth, and financial metrics</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
              <option value="year">Last year</option>
            </select>
            
           
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Revenue Stats Summary */}
        <motion.div 
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          {[
            { label: 'Total Revenue', value: '$587,420', change: '+18.3%', icon: DollarSign },
            { label: 'Monthly Recurring', value: '$73,480', change: '+12.8%', icon: BarChart3 },
            { label: 'Avg. Revenue Per User', value: '$96.20', change: '+7.5%', icon: TrendingUp },
            { label: 'Refund Rate', value: '2.8%', change: '-15.3%', icon: PieChart }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className={`text-xs font-semibold ${
                  stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Revenue Grid */}
      <div className="space-y-6">
        <motion.div key={`total-revenue-${refreshKey}`} variants={itemVariants}>
          <TotalRevenue />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <motion.div variants={itemVariants}>
            <SubscriptionPlans />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <MonthlyYearlySales />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <RefundsCancellations />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ARPU />
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div 
        className="mt-8 text-center text-sm text-gray-500"
        variants={itemVariants}
      >
        <p>Revenue data updates every 30 minutes • Last full sync: Today, 3:15 PM</p>
      </motion.div>
    </motion.div>
  );
};

export default Revenue;