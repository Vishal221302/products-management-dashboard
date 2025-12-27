// components/revenue/ARPU.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  LineChart,
  Target,
  Calendar,
  Download,
  Filter,
  ChevronRight,
  Zap,
  Crown,
  Star
} from 'lucide-react';

const ARPU = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [viewType, setViewType] = useState('overview');

  const timeRanges = [
    { id: 'month', label: 'Month', value: '$89.50' },
    { id: 'quarter', label: 'Quarter', value: '$92.80' },
    { id: 'year', label: 'Year', value: '$96.20' }
  ];

  const viewTypes = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trend', label: 'Trend', icon: LineChart },
    { id: 'segments', label: 'Segments', icon: Users }
  ];

  const segmentPlans = [
    { name: 'Basic', icon: Star, value: '$29.50', growth: '+5.7%', users: '1,245' },
    { name: 'Professional', icon: Zap, value: '$89.99', growth: '+12.3%', users: '892' },
    { name: 'Premium', icon: Crown, value: '$249.50', growth: '+8.2%', users: '345' }
  ];

  // Sample ARPU data
  const arpuData = {
    current: 96.20,
    previous: 89.50,
    growth: '+7.5%',
    target: 99.99,
    segments: [
      { segment: 'New Customers', value: 45.80, growth: '+12.5%' },
      { segment: 'Existing Customers', value: 124.50, growth: '+8.2%' },
      { segment: 'Enterprise', value: 485.00, growth: '+15.3%' }
    ],
    monthlyTrend: [78.5, 82.3, 85.6, 89.2, 92.8, 90.5, 93.2, 94.8, 95.6, 96.2, 97.1, 98.4],
    comparison: {
      industry: 85.40,
      competitors: [92.80, 88.50, 94.20, 87.90]
    }
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
      className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">ARPU Analysis</h2>
            <p className="text-gray-500 text-sm mt-1">Average Revenue Per User metrics and insights</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-300">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* View Type Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {viewTypes.map((type) => (
              <motion.button
                key={type.id}
                onClick={() => setViewType(type.id)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewType === type.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-4 h-4" />
                {type.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main ARPU Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Current ARPU */}
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
                  <div className="text-sm text-emerald-600 font-medium">Current ARPU</div>
                  <div className="text-3xl font-bold text-gray-900 mt-1">${arpuData.current.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-600">{arpuData.growth}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Target: ${arpuData.target.toFixed(2)}</span>
                <span>{((arpuData.current / arpuData.target) * 100).toFixed(1)}% achieved</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(arpuData.current / arpuData.target) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Comparison */}
          <motion.div 
            variants={itemVariants}
            className="p-6 bg-white border border-gray-200 rounded-2xl"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Industry Comparison</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Industry Average</div>
                <div className="text-lg font-bold text-gray-900">${arpuData.comparison.industry}</div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs text-gray-500">Competitor Comparison</div>
                <div className="flex items-center justify-between">
                  {arpuData.comparison.competitors.map((value, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-500">C{index + 1}</div>
                      <div className={`text-sm font-bold ${
                        value > arpuData.current ? 'text-rose-600' : 'text-emerald-600'
                      }`}>
                        ${value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-xs text-gray-500">Position</div>
                <div className="text-sm font-semibold text-emerald-600">Top 25% of industry</div>
              </div>
            </div>
          </motion.div>

          {/* Time Range Selector */}
          <motion.div 
            variants={itemVariants}
            className="p-6 bg-white border border-gray-200 rounded-2xl"
          >
            <h3 className="text-sm font-semibold text-gray-900 mb-4">ARPU by Time Period</h3>
            <div className="space-y-3">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                    timeRange === range.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{range.label}</span>
                  </div>
                  <div className="text-lg font-bold text-gray-900">{range.value}</div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ARPU Trend Chart */}
        {viewType !== 'segments' && (
          <motion.div 
            variants={itemVariants}
            className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">ARPU Growth Trend</h3>
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+{arpuData.growth} YoY growth</span>
              </div>
            </div>
            
            <div className="h-64">
              <div className="h-full flex items-end justify-between">
                {arpuData.monthlyTrend.map((value, index) => {
                  const maxValue = Math.max(...arpuData.monthlyTrend);
                  const height = (value / maxValue) * 100;
                  
                  return (
                    <div key={index} className="flex-1 mx-0.5 flex flex-col items-center">
                      <motion.div
                        className="w-10 rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-400"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      />
                      <div className="mt-2 text-xs font-medium text-gray-700">${value.toFixed(1)}</div>
                      <div className="mt-1 text-xs text-gray-500">
                        {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* Segment Analysis */}
        {viewType === 'segments' && (
          <motion.div 
            variants={itemVariants}
            className="mb-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">ARPU by Customer Segment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {segmentPlans.map((plan, index) => (
                <div key={index} className="p-6 bg-white border border-gray-200 rounded-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl ${
                      plan.name === 'Basic' ? 'bg-blue-100' :
                      plan.name === 'Professional' ? 'bg-emerald-100' :
                      'bg-purple-100'
                    }`}>
                      <plan.icon className={`w-6 h-6 ${
                        plan.name === 'Basic' ? 'text-blue-600' :
                        plan.name === 'Professional' ? 'text-emerald-600' :
                        'text-purple-600'
                      }`} />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">{plan.name}</div>
                      <div className="text-sm text-gray-500">{plan.users} users</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-2xl font-bold text-gray-900">{plan.value}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-semibold text-emerald-600">{plan.growth}</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">Contribution to Total ARPU</div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          plan.name === 'Basic' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                          plan.name === 'Professional' ? 'bg-gradient-to-r from-emerald-500 to-teal-500' :
                          'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(parseFloat(plan.value.replace('$', '')) / arpuData.current * 100).toFixed(0)}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Detailed Segments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="p-6 bg-white border border-gray-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">ARPU by Customer Type</h3>
            <div className="space-y-4">
              {arpuData.segments.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-700">{segment.segment}</div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">${segment.value.toFixed(2)}</div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600">{segment.growth}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(segment.value / 485) * 100}%` }}
                      transition={{ delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Insights & Recommendations</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Target:</strong> Achieve ${arpuData.target} ARPU by focusing on upselling
                </p>
              </div>
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Growth:</strong> {arpuData.growth} YoY growth, outperforming industry average
                </p>
              </div>
              <div className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Opportunity:</strong> Enterprise segment shows highest growth potential
                </p>
              </div>
              <div className="pt-3 border-t border-blue-200 mt-4">
                <div className="text-sm font-medium text-gray-900">Next Quarter Forecast</div>
                <div className="text-lg font-bold text-gray-900 mt-1">${(arpuData.current * 1.05).toFixed(2)}</div>
                <div className="text-xs text-emerald-600">+5% projected growth</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ARPU;