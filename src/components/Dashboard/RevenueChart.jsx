import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MoreVertical, DollarSign, BarChart3, LineChart } from 'lucide-react';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('stacked'); // 'stacked' or 'line'
  
  const revenueData = [
    { month: 'Jan', total: 38, growth: 12 },
    { month: 'Feb', total: 47, growth: 24 },
    { month: 'Mar', total: 43, growth: 18 },
    { month: 'Apr', total: 58, growth: 35 },
    { month: 'May', total: 69, growth: 41 },
    { month: 'Jun', total: 64, growth: 38 },
    { month: 'Jul', total: 75, growth: 45 },
  ];

  const maxTotal = Math.max(...revenueData.map(d => d.total));

  // Simple Bar Chart Component (Working Version)
  const SimpleBarChart = () => {
    return (
      <div className="h-48 mt-4">
        <div className="h-full flex items-end justify-between px-4">
          {revenueData.map((data, index) => {
            const barHeight = (data.total / maxTotal) * 80; // 80% of container
            
            return (
              <div key={index} className="flex flex-col items-center h-full justify-end w-10">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut" 
                  }}
                  className="w-8 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all"
                  whileHover={{ scaleY: 1.1 }}
                />
                
                {/* Month Label */}
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500">{data.month}</span>
                  <div className="text-xs font-medium text-gray-700 mt-1">
                    ${data.total}K
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Simple Line Chart Component (Working Version)
  const SimpleLineChart = () => {
    return (
      <div className="h-48 mt-4 relative">
        {/* Simple line implementation */}
        <div className="h-full flex items-end justify-between px-4">
          {revenueData.map((data, index) => {
            const pointHeight = (data.total / maxTotal) * 80;
            
            return (
              <div key={index} className="relative h-full flex flex-col items-center justify-end w-10">
                {/* Connect points with lines */}
                {index < revenueData.length - 1 && (
                  <div 
                    className="absolute top-0 h-full w-px"
                    style={{ 
                      left: '50%',
                      transform: 'translateX(-50%)',
                      height: 'calc(100% - 20px)'
                    }}
                  >
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ 
                        duration: 1, 
                        delay: index * 0.1,
                        ease: "easeOut" 
                      }}
                      className="w-px bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 h-full"
                    />
                  </div>
                )}
                
                {/* Data Point */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 + 0.5,
                    ease: "easeOut" 
                  }}
                  className="relative z-10"
                >
                  <div 
                    className="w-4 h-4 rounded-full bg-white border-2 border-blue-500 shadow-sm"
                    style={{ marginBottom: `${pointHeight}%` }}
                  />
                </motion.div>
                
                {/* Month Label */}
                <div className="mt-2 text-center">
                  <span className="text-xs text-gray-500">{data.month}</span>
                  <div className="text-xs font-medium text-gray-700 mt-1">
                    ${data.total}K
                  </div>
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
      className="bg-white rounded-lg border border-gray-200 p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">Revenue Analysis</h3>
          <p className="text-sm text-gray-500 mt-0.5">Monthly revenue trends</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('stacked')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                chartType === 'stacked' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                chartType === 'line' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LineChart className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span>+24.7%</span>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Chart Display - NOW VISIBLE */}
      {chartType === 'stacked' ? <SimpleBarChart /> : <SimpleLineChart />}

      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-blue-500"></div>
            <span className="text-xs text-gray-600">Monthly Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-blue-500 bg-white"></div>
            <span className="text-xs text-gray-600">Data Points</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>Values in thousands ($K)</span>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-xs text-blue-600 mb-1">Current Month</div>
          <div className="font-semibold text-gray-900">$75K</div>
          <div className="text-xs text-gray-500">July Revenue</div>
        </div>
        <div className="bg-emerald-50 p-3 rounded-lg">
          <div className="text-xs text-emerald-600 mb-1">Growth</div>
          <div className="font-semibold text-gray-900">+24.7%</div>
          <div className="text-xs text-gray-500">vs last month</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-xs text-purple-600 mb-1">YTD Total</div>
          <div className="font-semibold text-gray-900">$396K</div>
          <div className="text-xs text-gray-500">Jan-Jul 2024</div>
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;