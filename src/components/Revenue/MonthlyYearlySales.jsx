// components/revenue/MonthlyYearlySales.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  LineChart,
  Target,
  Download,
  Filter,
  ChevronRight
} from 'lucide-react';

const MonthlyYearlySales = () => {
  const [viewType, setViewType] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const years = ['2022', '2023', '2024'];
  const viewTypes = [
    { id: 'monthly', label: 'Monthly', icon: Calendar },
    { id: 'yearly', label: 'Yearly', icon: BarChart3 },
    { id: 'comparison', label: 'Comparison', icon: LineChart }
  ];

  // Sample data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    sales: [12450, 13200, 11800, 14500, 16200, 13800, 15500, 17200, 14800, 16500, 18200, 19500],
    targets: [12000, 12500, 13000, 13500, 14000, 14500, 15000, 15500, 16000, 16500, 17000, 17500]
  };

  const yearlyData = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    sales: [98500, 124500, 156800, 198400, 245600],
    growth: [null, '+26.4%', '+25.9%', '+26.6%', '+23.8%']
  };

  const comparisonData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    current: [43200, 47500, 51200, 54800],
    previous: [38500, 41200, 43800, 46500]
  };

  const currentData = viewType === 'monthly' ? monthlyData : 
                     viewType === 'yearly' ? yearlyData : comparisonData;

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

  // Calculate metrics
  const totalSales = currentData.sales.reduce((a, b) => a + b, 0);
  const avgSales = Math.round(totalSales / currentData.sales.length);
  const maxSales = Math.max(...currentData.sales);
  const growthRate = viewType === 'yearly' ? '23.8%' : '18.3%';

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
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Monthly / Yearly Sales</h2>
              <p className="text-gray-500 text-sm mt-1">Sales performance and growth analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                    selectedYear === year
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Sales', value: `$${totalSales.toLocaleString()}`, icon: DollarSign, color: 'from-blue-500 to-cyan-500' },
            { label: 'Average Sales', value: `$${avgSales.toLocaleString()}`, icon: BarChart3, color: 'from-emerald-500 to-teal-500' },
            { label: 'Growth Rate', value: growthRate, icon: TrendingUp, color: 'from-purple-500 to-pink-500' },
            { label: 'Target Achievement', value: '92.5%', icon: Target, color: 'from-amber-500 to-orange-500' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-4 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Chart */}
        <div className="mb-8">
          <div className="h-80 bg-gray-50 rounded-2xl border border-gray-200 p-6">
            {/* Chart Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {viewType === 'monthly' ? 'Monthly Sales Trend' : 
                   viewType === 'yearly' ? 'Yearly Sales Performance' : 
                   'Year-over-Year Comparison'}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {selectedYear} • {viewType === 'comparison' ? 'vs Previous Year' : 'Sales Performance'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+{growthRate} growth</span>
              </div>
            </div>

            {/* Chart Content */}
            <div className="h-48 relative">
              {/* Y-axis Labels */}
              <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-gray-500">
                {[0, 25, 50, 75, 100].map((percent, i) => (
                  <div key={i} className="text-right pr-2">
                    ${(maxSales * percent / 100 / 1000).toFixed(0)}K
                  </div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="ml-12 h-full relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-t border-gray-200" />
                  ))}
                </div>

                {/* Bars */}
                <div className="h-full flex items-end justify-between">
                  {currentData.sales.map((value, index) => {
                    const height = (value / maxSales) * 100;
                    
                    return (
                      <div key={index} className="flex-1 mx-1 flex flex-col items-center">
                        {/* Bar Container */}
                        <div className="relative w-full h-full flex items-end justify-center">
                          {/* Previous Year Bar (for comparison) */}
                          {viewType === 'comparison' && (
                            <motion.div
                              className="w-6 rounded-t-lg bg-gray-300 absolute"
                              initial={{ height: 0 }}
                              animate={{ height: `${(currentData.previous[index] / maxSales) * 100}%` }}
                              transition={{ duration: 0.8, delay: index * 0.05 }}
                            />
                          )}
                          
                          {/* Current Bar */}
                          <motion.div
                            className={`w-8 rounded-t-lg ${
                              viewType === 'comparison' 
                                ? 'bg-gradient-to-t from-blue-500 to-cyan-500' 
                                : 'bg-gradient-to-t from-emerald-500 to-teal-500'
                            } relative z-10`}
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: index * 0.05 + 0.2 }}
                          />
                        </div>

                        {/* Value */}
                        <div className="mt-2 text-xs font-medium text-gray-700">
                          ${(value / 1000).toFixed(0)}K
                        </div>

                        {/* Label */}
                        <div className="mt-1 text-xs text-gray-500">
                          {currentData.labels[index]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            {viewType === 'comparison' && (
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded" />
                  <span className="text-xs text-gray-600">Current Year</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-300 rounded" />
                  <span className="text-xs text-gray-600">Previous Year</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performing */}
          <motion.div variants={itemVariants} className="p-5 bg-white border border-gray-200 rounded-2xl">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Top Performing Periods</h4>
            <div className="space-y-3">
              {currentData.sales
                .map((value, index) => ({ value, label: currentData.labels[index] }))
                .sort((a, b) => b.value - a.value)
                .slice(0, 5)
                .map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                        <span className="text-sm font-semibold text-emerald-600">{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.label}</div>
                        <div className="text-xs text-gray-500">Sales period</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">${(item.value / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-emerald-600">+15.3%</div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>

          {/* Growth Analysis */}
          <motion.div variants={itemVariants} className="p-5 bg-white border border-gray-200 rounded-2xl">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Growth Analysis</h4>
            <div className="space-y-4">
              {[
                { period: 'Q1 2024', sales: '$124.5K', growth: '+12.5%', target: '$120K' },
                { period: 'Q2 2024', sales: '$136.8K', growth: '+15.3%', target: '$130K' },
                { period: 'Q3 2024', sales: '$148.2K', growth: '+18.7%', target: '$140K' },
                { period: 'Q4 2024', sales: '$162.5K', growth: '+22.1%', target: '$150K' }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">{item.period}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.sales}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Target: {item.target}</span>
                    <span className="text-emerald-600 font-semibold">{item.growth}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(item.sales.replace('$', '').replace('K', '')) / parseFloat(item.target.replace('$', '').replace('K', '')) * 100).toFixed(0)}%` }}
                      transition={{ delay: index * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Insights */}
          <motion.div variants={itemVariants} className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Key Insights</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>Q4 shows highest growth</strong> with 22.1% increase in sales
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Target className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>92.5% target achievement</strong> across all quarters
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700">
                  <strong>December peak</strong> contributes 18% of annual revenue
                </p>
              </div>
              <div className="pt-3 border-t border-blue-200">
                <div className="text-sm text-gray-600">Next Quarter Forecast</div>
                <div className="text-lg font-bold text-gray-900 mt-1">$172.8K</div>
                <div className="text-xs text-emerald-600">+15% projected growth</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MonthlyYearlySales;