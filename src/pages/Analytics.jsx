// pages/Analytics.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  Calendar,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import TotalUsers from '../components/Analytics/TotalUsers';
import UserRoles from '../components/Analytics/UserRoles';
import UserSignupTrend from '../components/Analytics/UserSignupTrend';
import UserActivityTracking from '../components/Analytics/UserActivityTracking';
import ActiveInactiveUsers from '../components/Analytics/ActiveInactiveUsers';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('30d');
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500 mt-2">Monitor user metrics, engagement, and growth trends</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            
            
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div 
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={itemVariants}
        >
          {[
            { label: 'Total Users', value: '1,248', change: '+12.5%', icon: TrendingUp },
            { label: 'Active Users', value: '892', change: '+8.2%', icon: BarChart3 },
            { label: 'Avg. Session', value: '4m 32s', change: '+3.1%', icon: Calendar },
            { label: 'Growth Rate', value: '18.3%', change: '+5.7%', icon: TrendingUp }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main Analytics Grid */}
      <div className="space-y-6">
        <motion.div key={refreshKey} variants={itemVariants}>
          <TotalUsers />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants}>
            <ActiveInactiveUsers />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <UserRoles />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <UserSignupTrend />
        </motion.div>

        <motion.div variants={itemVariants}>
          <UserActivityTracking />
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div 
        className="mt-8 text-center text-sm text-gray-500"
        variants={itemVariants}
      >
        <p>Data updates every 15 minutes • Last full sync: Today, 2:45 PM</p>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;