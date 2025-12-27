// components/analytics/ActiveInactiveUsers.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  UserCheck, 
  UserX,
  TrendingUp,
  Clock,
  Calendar,
  Download
} from 'lucide-react';
import axios from 'axios';

const ActiveInactiveUsers = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [inactiveUsers, setInactiveUsers] = useState(0);
  const [activePercentage, setActivePercentage] = useState(0);
  const [timeRange, setTimeRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveInactiveStats();
  }, [timeRange]);

  const fetchActiveInactiveStats = async () => {
    try {
      setLoading(true);
      const usersResponse = await axios.get('https://fakestoreapi.com/users');
      const cartsResponse = await axios.get('https://fakestoreapi.com/carts');
      
      const users = usersResponse.data;
      const carts = cartsResponse.data;
      
      // Simulate active users based on cart activity
      const active = Math.floor(users.length * 0.72); // 72% active
      const inactive = users.length - active;
      const percentage = Math.round((active / users.length) * 100);
      
      setActiveUsers(active);
      setInactiveUsers(inactive);
      setActivePercentage(percentage);
      
    } catch (error) {
      console.error('Error fetching stats:', error);
      // Fallback data
      setActiveUsers(892);
      setInactiveUsers(356);
      setActivePercentage(71.5);
    } finally {
      setLoading(false);
    }
  };

  const pieVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        delay: 0.3
      }
    }
  };

  const stats = [
    { label: 'Active Users', value: activeUsers, color: 'bg-emerald-500', percentage: activePercentage },
    { label: 'Inactive Users', value: inactiveUsers, color: 'bg-gray-400', percentage: 100 - activePercentage }
  ];

  const timeRanges = [
    { id: '7d', label: '7D' },
    { id: '30d', label: '30D' },
    { id: '90d', label: '90D' },
    { id: '1y', label: '1Y' }
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Activity className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Active vs Inactive Users</h2>
              <p className="text-gray-500 text-sm mt-1">User engagement and activity analysis</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeRange === range.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            <Calendar className="w-4 h-4 inline mr-1" />
            Last updated: Today
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart Visualization */}
          <div className="relative">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">User Activity Distribution</h3>
              <div className="relative w-64 h-64 mx-auto">
                <svg width="256" height="256" viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* Background circle */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="transparent" 
                    stroke="#e5e7eb" 
                    strokeWidth="10"
                  />
                  
                  {/* Active Users Arc */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 283' }}
                    animate={{ strokeDasharray: `${283 * activePercentage / 100} 283` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  
                  {/* Inactive Users Arc */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="#9ca3af"
                    strokeWidth="10"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 283' }}
                    animate={{ 
                      strokeDasharray: `${283 * (100 - activePercentage) / 100} 283`,
                      strokeDashoffset: -283 * activePercentage / 100 
                    }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </svg>
                
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-gray-900">{activePercentage}%</div>
                  <div className="text-sm text-gray-500">Active</div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Activity Breakdown</h3>
            
            {/* Stats Cards */}
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{stat.label}</div>
                        <div className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{stat.percentage}%</div>
                      <div className="text-xs text-gray-500">of total</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${stat.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percentage}%` }}
                        transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Activity Metrics */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-blue-600">Daily Active</div>
                    <div className="text-lg font-bold text-gray-900">312</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <div>
                    <div className="text-sm text-amber-600">Avg. Session</div>
                    <div className="text-lg font-bold text-gray-900">4m 32s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trend Line */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Activity Trend</h4>
            <div className="flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12.5% growth this month</span>
            </div>
          </div>
          
          <div className="h-32 flex items-end gap-1">
            {[40, 65, 75, 60, 80, 90, 85, 95, 88, 92, 96, 100].map((height, index) => (
              <motion.div
                key={index}
                className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg"
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveInactiveUsers;