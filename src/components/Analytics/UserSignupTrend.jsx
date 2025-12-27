// components/analytics/UserSignupTrend.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp,
  Calendar,
  Users,
  Target,
  LineChart,
  Download,
  Filter,
  ChevronRight
} from 'lucide-react';

const UserSignupTrend = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [selectedMetric, setSelectedMetric] = useState('signups');

  const timeRanges = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' }
  ];

  const metrics = [
    { 
      id: 'signups', 
      label: 'Signups', 
      buttonColor: 'from-blue-500 to-cyan-500',
      barColor: 'bg-gradient-to-t from-blue-500 to-cyan-500',
      lineColor: '#3b82f6', // Blue for line
      dotColor: 'bg-blue-500',
      type: 'bar'
    },
    { 
      id: 'active', 
      label: 'Active', 
      buttonColor: 'from-emerald-500 to-teal-500',
      barColor: 'bg-gradient-to-t from-emerald-500 to-teal-500',
      lineColor: '#10b981', // Emerald for line
      dotColor: 'bg-emerald-500',
      type: 'line'
    },
    { 
      id: 'retention', 
      label: 'Retention', 
      buttonColor: 'from-purple-500 to-pink-500',
      barColor: 'bg-gradient-to-t from-purple-500 to-pink-500',
      lineColor: '#8b5cf6', // Purple for line
      dotColor: 'bg-purple-500',
      type: 'line'
    }
  ];

  // Sample data for different time ranges
  const data = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      signups: [45, 52, 38, 65, 72, 48, 55],
      active: [120, 135, 110, 145, 160, 130, 140],
      retention: [85, 88, 82, 90, 92, 87, 89]
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      signups: [280, 320, 295, 350],
      active: [850, 920, 880, 950],
      retention: [88, 90, 87, 92]
    },
    year: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      signups: [1250, 1320, 1180, 1450, 1620, 1380, 1550, 1720, 1480, 1650, 1820, 1950],
      active: [3850, 4120, 3980, 4250, 4420, 4180, 4350, 4520, 4280, 4450, 4620, 4850],
      retention: [85, 86, 84, 88, 89, 87, 90, 91, 88, 92, 93, 94]
    }
  };

  const currentData = data[timeRange] || data.year;
  const maxValue = Math.max(...currentData[selectedMetric]);
  const selectedMetricData = metrics.find(m => m.id === selectedMetric);

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

  // Line Chart Component
  const LineGraph = () => {
    const points = currentData[selectedMetric].map((value, index) => {
      const x = (index / (currentData[selectedMetric].length - 1)) * 100;
      const y = 100 - (value / maxValue) * 80;
      return { x, y, value };
    });

    // Create SVG path for the line
    const pathData = points.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    return (
      <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 p-4 relative">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          <line x1="0" y1="20" x2="100" y2="20" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#e5e7eb" strokeWidth="0.5" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="#e5e7eb" strokeWidth="0.5" />
          
          {/* Vertical grid lines */}
          {currentData.labels.map((_, i) => {
            const x = (i / (currentData.labels.length - 1)) * 100;
            return (
              <line 
                key={i} 
                x1={x} 
                y1="0" 
                x2={x} 
                y2="100" 
                stroke="#e5e7eb" 
                strokeWidth="0.5" 
              />
            );
          })}
          
          {/* Line path */}
          <motion.path
            d={pathData}
            fill="none"
            stroke={selectedMetricData?.lineColor || '#10b981'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="white"
              stroke={selectedMetricData?.lineColor || '#10b981'}
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.5 }}
            />
          ))}
        </svg>
        
        {/* Labels at bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
          {currentData.labels.map((label, index) => (
            <div 
              key={index} 
              className="text-xs text-gray-500 text-center"
              style={{ width: `${100 / currentData.labels.length}%` }}
            >
              {label}
            </div>
          ))}
        </div>
        
        {/* Values on top of points */}
        {points.map((point, index) => (
          <motion.div
            key={index}
            className="absolute text-xs font-medium text-gray-700 bg-white px-1 py-0.5 rounded border border-gray-200 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            style={{
              left: `${point.x}%`,
              top: `${point.y - 15}%`,
              transform: 'translateX(-50%)'
            }}
          >
            {point.value}
          </motion.div>
        ))}
      </div>
    );
  };

  // Bar Chart Component
  const BarGraph = () => {
    return (
      <div className="h-64 bg-gray-50 rounded-xl border border-gray-200 p-4">
        <div className="h-full flex items-end justify-between">
          {currentData[selectedMetric].map((value, index) => {
            const heightPercentage = (value / maxValue) * 100;
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center justify-end h-full flex-1 mx-1"
              >
                <motion.div
                  className={`w-10 rounded-t-lg ${selectedMetricData?.barColor || 'bg-gradient-to-t from-blue-500 to-cyan-500'} shadow-md`}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.05,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                />
                
                <motion.div
                  className="mt-2 text-xs font-medium text-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + index * 0.05 }}
                >
                  {value}
                </motion.div>
                
                <div className="mt-1 text-xs text-gray-500">
                  {currentData.labels[index]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">User Signup Trends</h2>
            <p className="text-gray-500 text-sm mt-1">Growth patterns and user acquisition</p>
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
        {/* Metrics Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {metrics.map((metric) => (
              <motion.button
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedMetric === metric.id
                    ? `bg-gradient-to-r ${metric.buttonColor} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {metric.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            {timeRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setTimeRange(range.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeRange === range.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Last updated: Today</span>
            </div>
            <div className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+18.3% growth</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          {selectedMetric === 'signups' ? (
            <BarGraph />
          ) : (
            <LineGraph />
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-blue-600">Total {selectedMetric}</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {currentData[selectedMetric].reduce((a, b) => a + b, 0).toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">This {timeRange}</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <LineChart className="w-5 h-5 text-emerald-600" />
              <div className="text-sm text-emerald-600">Growth Rate</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">+18.3%</div>
            <div className="text-xs text-gray-500 mt-1">MoM growth</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div className="text-sm text-purple-600">Conversion</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">4.8%</div>
            <div className="text-xs text-gray-500 mt-1">Signup to active</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              <div className="text-sm text-amber-600">Forecast</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">22.5K</div>
            <div className="text-xs text-gray-500 mt-1">Next {timeRange}</div>
          </motion.div>
        </div>

        {/* Insights */}
        <motion.div
          variants={itemVariants}
          className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200"
        >
          <h4 className="font-semibold text-gray-900 mb-3">Key Insights</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ChevronRight className="w-4 h-4 text-emerald-500" />
              <span>Signups increased by <strong>18.3%</strong> compared to last {timeRange}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ChevronRight className="w-4 h-4 text-emerald-500" />
              <span><strong>Weekdays</strong> show 25% higher signup rates than weekends</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ChevronRight className="w-4 h-4 text-emerald-500" />
              <span>Mobile signups account for <strong>68%</strong> of total acquisitions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserSignupTrend;