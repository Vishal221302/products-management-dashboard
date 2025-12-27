// components/analytics/TotalUsers.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  TrendingDown,
  UserPlus,
  Calendar,
  Download,
  MoreVertical
} from 'lucide-react';
import axios from 'axios';

const TotalUsers = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [growthRate, setGrowthRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchUserStats();
  }, [timeRange]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      // Fetch user data from API
      const usersResponse = await axios.get('https://fakestoreapi.com/users');
      const cartsResponse = await axios.get('https://fakestoreapi.com/carts');
      
      const users = usersResponse.data;
      const carts = cartsResponse.data;
      
      // Calculate stats
      const total = users.length;
      const active = carts.reduce((acc, cart) => {
        return acc + (cart.products?.length > 0 ? 1 : 0);
      }, 0);
      const newUsersCount = Math.floor(total * 0.15); // Simulate 15% new users
      const growth = ((active / total) * 100).toFixed(1);
      
      setTotalUsers(total);
      setActiveUsers(active);
      setNewUsers(newUsersCount);
      setGrowthRate(parseFloat(growth));
      
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Fallback data
      setTotalUsers(1248);
      setActiveUsers(892);
      setNewUsers(187);
      setGrowthRate(12.5);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const statCards = [
    {
      id: 1,
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      trend: '+12.5%',
      trendPositive: true
    },
    {
      id: 2,
      title: 'Active Users',
      value: activeUsers,
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-500',
      bg: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      trend: `+${growthRate}%`,
      trendPositive: true
    },
    {
      id: 3,
      title: 'New Users',
      value: newUsers,
      icon: UserPlus,
      color: 'from-purple-500 to-pink-500',
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50',
      border: 'border-purple-200',
      trend: '+8.2%',
      trendPositive: true
    }
  ];

  return (
    <motion.div 
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Overview</h2>
            <p className="text-gray-500 text-sm mt-1">Total user base and activity metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ y: -4 }}
              className={`${card.bg} border ${card.border} rounded-xl p-5`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} shadow-md`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center gap-1">
                  {card.trendPositive ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                  )}
                  <span className={`text-sm font-semibold ${card.trendPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {card.trend}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-3xl font-bold text-gray-900">{card.value}</div>
                <div className="text-sm text-gray-600 mt-1">{card.title}</div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{card.trend}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${card.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: '75%' }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Avg. Session</div>
            <div className="text-lg font-semibold text-gray-900">4m 32s</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Bounce Rate</div>
            <div className="text-lg font-semibold text-gray-900">32.5%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Retention</div>
            <div className="text-lg font-semibold text-gray-900">68.7%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Growth</div>
            <div className="text-lg font-semibold text-gray-900 text-emerald-600">+12.5%</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TotalUsers;