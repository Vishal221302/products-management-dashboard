// components/revenue/RefundsCancellations.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RefreshCw,
  XCircle,
  AlertTriangle,
  DollarSign,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  ChevronRight,
  CheckCircle,
  Clock,
  UserX
} from 'lucide-react';

const RefundsCancellations = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [viewType, setViewType] = useState('refunds');

  const timeRanges = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' }
  ];

  const viewTypes = [
    { id: 'refunds', label: 'Refunds', color: 'from-rose-500 to-pink-500' },
    { id: 'cancellations', label: 'Cancellations', color: 'from-amber-500 to-orange-500' },
    { id: 'disputes', label: 'Disputes', color: 'from-purple-500 to-indigo-500' }
  ];

  // Sample data
  const refundData = {
    total: '$12,450',
    count: 124,
    rate: '2.8%',
    trend: '-15.3%',
    categories: [
      { name: 'Product Issues', value: 45, amount: '$4,850' },
      { name: 'Service Quality', value: 32, amount: '$3,250' },
      { name: 'Shipping Delays', value: 28, amount: '$2,120' },
      { name: 'Customer Changed Mind', value: 12, amount: '$1,430' },
      { name: 'Technical Problems', value: 7, amount: '$800' }
    ],
    recent: [
      { id: '#REF-001245', customer: 'Alex Johnson', amount: '$249.99', date: '2 hours ago', status: 'pending' },
      { id: '#REF-001244', customer: 'Sarah Wilson', amount: '$149.50', date: '5 hours ago', status: 'completed' },
      { id: '#REF-001243', customer: 'Michael Chen', amount: '$89.99', date: '1 day ago', status: 'processing' },
      { id: '#REF-001242', customer: 'Emma Davis', amount: '$299.00', date: '2 days ago', status: 'completed' }
    ]
  };

  const cancellationData = {
    total: '245',
    rate: '5.2%',
    trend: '-8.7%',
    reasons: [
      { name: 'Found Better Alternative', value: 85, percent: '34.7%' },
      { name: 'Too Expensive', value: 65, percent: '26.5%' },
      { name: 'Service Issues', value: 45, percent: '18.4%' },
      { name: 'Product Not Needed', value: 35, percent: '14.3%' },
      { name: 'Technical Difficulties', value: 15, percent: '6.1%' }
    ],
    retention: [
      { plan: 'Basic', rate: '8.2%', trend: '-12.5%' },
      { plan: 'Professional', rate: '4.5%', trend: '-8.3%' },
      { plan: 'Premium', rate: '2.1%', trend: '-5.7%' },
      { plan: 'Enterprise', rate: '0.8%', trend: '-3.2%' }
    ]
  };

  const currentData = viewType === 'refunds' ? refundData : cancellationData;

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
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              viewType === 'refunds' ? 'bg-rose-100' :
              viewType === 'cancellations' ? 'bg-amber-100' :
              'bg-purple-100'
            }`}>
              {viewType === 'refunds' ? (
                <RefreshCw className="w-6 h-6 text-rose-600" />
              ) : viewType === 'cancellations' ? (
                <XCircle className="w-6 h-6 text-amber-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-purple-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {viewType === 'refunds' ? 'Refunds' : 
                 viewType === 'cancellations' ? 'Cancellations' : 'Disputes'}
              </h2>
              <p className="text-gray-500 text-sm mt-1">Management and analysis of revenue losses</p>
            </div>
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
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  viewType === type.id
                    ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {type.label}
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
              <TrendingDown className="w-4 h-4" />
              <span>{currentData.trend} improvement</span>
            </div>
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl ${
                viewType === 'refunds' ? 'bg-rose-100' :
                viewType === 'cancellations' ? 'bg-amber-100' :
                'bg-purple-100'
              }`}>
                {viewType === 'refunds' ? (
                  <DollarSign className="w-6 h-6 text-rose-600" />
                ) : (
                  <UserX className="w-6 h-6 text-amber-600" />
                )}
              </div>
              <div>
                <div className="text-sm text-gray-600">Total {viewType === 'refunds' ? 'Amount' : 'Count'}</div>
                <div className="text-2xl font-bold text-gray-900">{currentData.total}</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {viewType === 'refunds' ? 'Refunded this month' : 'Cancellations this month'}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600">{viewType === 'refunds' ? 'Refund Rate' : 'Cancellation Rate'}</div>
                <div className="text-2xl font-bold text-gray-900">{currentData.rate}</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 rounded-full">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-600">{currentData.trend}</span>
              </div>
            </div>
            <div className="text-sm text-gray-500">Industry avg: {viewType === 'refunds' ? '3.5%' : '6.8%'}</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600">Impact on Revenue</div>
                <div className="text-2xl font-bold text-gray-900">
                  {viewType === 'refunds' ? '1.8%' : '2.3%'}
                </div>
              </div>
              <div className={`p-3 rounded-xl ${
                viewType === 'refunds' ? 'bg-rose-100' :
                viewType === 'cancellations' ? 'bg-amber-100' :
                'bg-purple-100'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${
                  viewType === 'refunds' ? 'text-rose-600' :
                  viewType === 'cancellations' ? 'text-amber-600' :
                  'text-purple-600'
                }`} />
              </div>
            </div>
            <div className="text-sm text-gray-500">of total revenue affected</div>
          </motion.div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Breakdown */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="p-5 bg-white border border-gray-200 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {viewType === 'refunds' ? 'Refund Categories' : 'Cancellation Reasons'}
              </h3>
              <div className="space-y-4">
                {(viewType === 'refunds' ? currentData.categories : currentData.reasons).map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          {viewType === 'refunds' ? item.amount : item.percent}
                        </div>
                        <div className="text-xs text-gray-500">
                          {viewType === 'refunds' ? `${item.value} cases` : `${item.value} customers`}
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / (viewType === 'refunds' ? 124 : 245)) * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trend Chart */}
            <div className="p-5 bg-white border border-gray-200 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Trend Analysis</h3>
              <div className="h-40">
                <div className="h-full flex items-end justify-between">
                  {[85, 78, 72, 68, 65, 62, 58, 55, 52, 48, 45, 42].map((height, index) => (
                    <div key={index} className="flex-1 mx-0.5">
                      <motion.div
                        className="w-full rounded-t-lg bg-gradient-to-t from-rose-500 to-pink-400"
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((month, i) => (
                    <span key={i}>{month}</span>
                  ))}
                </div>
              </div>
              <div className="mt-4 text-sm text-emerald-600">
                <TrendingDown className="w-4 h-4 inline mr-1" />
                Steady decline in {viewType} rate over past year
              </div>
            </div>
          </motion.div>

          {/* Right Column - Recent Activity & Retention */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Recent Activity */}
            {viewType === 'refunds' ? (
              <div className="p-5 bg-white border border-gray-200 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Refunds</h3>
                <div className="space-y-3">
                  {currentData.recent.map((refund, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-900">{refund.id}</div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          refund.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                          refund.status === 'processing' ? 'bg-amber-100 text-amber-700' :
                          'bg-rose-100 text-rose-700'
                        }`}>
                          {refund.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-600">{refund.customer}</div>
                        <div className="font-semibold text-gray-900">{refund.amount}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{refund.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-5 bg-white border border-gray-200 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Plan Retention Rates</h3>
                <div className="space-y-4">
                  {currentData.retention.map((plan, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{plan.plan}</span>
                        <span className="text-sm font-semibold text-gray-900">{plan.rate}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Cancellation rate</span>
                        <span className="text-emerald-600 font-semibold">{plan.trend}</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${100 - parseFloat(plan.rate)}%` }}
                          transition={{ delay: index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Insights & Actions */}
            <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Top issue:</strong> {viewType === 'refunds' ? 'Product Issues (36%)' : 'Found Better Alternative (35%)'}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Improvement:</strong> {currentData.trend} reduction in {viewType} rate
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Action:</strong> {viewType === 'refunds' ? 'Improve product quality controls' : 'Enhance customer retention programs'}
                  </p>
                </div>
                <div className="pt-3 border-t border-blue-200 mt-4">
                  <div className="text-sm font-medium text-gray-900">Priority Level</div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 w-3/4" />
                    </div>
                    <span className="text-xs font-semibold text-amber-600">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default RefundsCancellations;