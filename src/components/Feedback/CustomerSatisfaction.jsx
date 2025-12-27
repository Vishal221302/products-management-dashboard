import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, Smile, Frown, Meh, TrendingUp, TrendingDown, 
  MessageSquare, Users, ThumbsUp, ThumbsDown, BarChart3,
  Download, Filter, RefreshCw, ChevronRight
} from 'lucide-react';

const CustomerSatisfaction = ({ data = [] }) => {
  // Default data if none provided
  const defaultData = {
    overallScore: 4.2,
    totalResponses: 1254,
    trend: '+2.5%',
    scores: [
      { month: 'Jan', score: 3.8 },
      { month: 'Feb', score: 4.0 },
      { month: 'Mar', score: 4.1 },
      { month: 'Apr', score: 4.0 },
      { month: 'May', score: 4.3 },
      { month: 'Jun', score: 4.2 },
      { month: 'Jul', score: 4.4 },
      { month: 'Aug', score: 4.5 },
      { month: 'Sep', score: 4.3 },
      { month: 'Oct', score: 4.2 },
    ],
    breakdown: [
      { rating: 5, count: 580, percentage: 46.3, label: 'Very Satisfied' },
      { rating: 4, count: 420, percentage: 33.5, label: 'Satisfied' },
      { rating: 3, count: 180, percentage: 14.4, label: 'Neutral' },
      { rating: 2, count: 50, percentage: 4.0, label: 'Dissatisfied' },
      { rating: 1, count: 24, percentage: 1.9, label: 'Very Dissatisfied' },
    ],
    recentFeedback: [
      { id: 1, rating: 5, comment: 'Excellent support! Issue resolved in under 10 minutes.', date: '2023-11-15', user: 'Alex Johnson', category: 'Support' },
      { id: 2, rating: 4, comment: 'Good product, but could use more documentation.', date: '2023-11-14', user: 'Sarah Miller', category: 'Product' },
      { id: 3, rating: 2, comment: 'Faced multiple bugs after the recent update.', date: '2023-11-14', user: 'Mike Chen', category: 'Technical' },
      { id: 4, rating: 5, comment: 'Love the new dashboard features! Very intuitive.', date: '2023-11-13', user: 'Taylor Swift', category: 'UI/UX' },
      { id: 5, rating: 3, comment: 'Average experience. Nothing special.', date: '2023-11-12', user: 'David Park', category: 'General' },
    ],
    byCategory: [
      { category: 'Support', score: 4.5, responses: 320 },
      { category: 'Product', score: 4.2, responses: 280 },
      { category: 'Technical', score: 3.8, responses: 240 },
      { category: 'UI/UX', score: 4.4, responses: 210 },
      { category: 'Billing', score: 4.0, responses: 180 },
    ]
  };

  const [csatData, setCsatData] = useState(data.overallScore ? data : defaultData);
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showDetails, setShowDetails] = useState(false);

  // Calculate NPS (Net Promoter Score)
  const promoters = csatData.breakdown.find(b => b.rating >= 4)?.percentage || 0;
  const detractors = csatData.breakdown.find(b => b.rating <= 2)?.percentage || 0;
  const nps = promoters - detractors;

  // Get rating icon
  const getRatingIcon = (rating) => {
    if (rating >= 4.5) return <Smile size={20} className="text-green-600" />;
    if (rating >= 3.5) return <Meh size={20} className="text-yellow-600" />;
    return <Frown size={20} className="text-red-600" />;
  };

  // Get rating color
  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-100';
    if (rating >= 4.0) return 'text-green-500 bg-green-50';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-100';
    if (rating >= 3.0) return 'text-yellow-500 bg-yellow-50';
    return 'text-red-600 bg-red-100';
  };

  // Get rating label
  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.0) return 'Good';
    if (rating >= 3.5) return 'Average';
    if (rating >= 3.0) return 'Fair';
    return 'Poor';
  };

  // Filter feedback by category
  const filteredFeedback = selectedCategory === 'all' 
    ? csatData.recentFeedback 
    : csatData.recentFeedback.filter(f => f.category === selectedCategory);

  // Handle refresh data
  const handleRefresh = () => {
    // In a real app, this would fetch new data
    setCsatData(prev => ({
      ...prev,
      overallScore: 4.3, // Simulated updated score
      totalResponses: prev.totalResponses + 25,
    }));
  };

  // Handle export data
  const handleExport = () => {
    // In a real app, this would trigger data export
    alert('Export functionality would be implemented here');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Star size={24} className="text-yellow-500" />
            Customer Satisfaction (CSAT)
          </h2>
          <p className="text-gray-600 mt-1">Measure and analyze customer satisfaction scores</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['week', 'month', 'quarter', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${timeRange === range ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={20} />
          </button>
          
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Overall CSAT Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Overall CSAT Score</p>
              <div className="flex items-end gap-2 mt-2">
                <p className="text-4xl font-bold text-gray-900">{csatData.overallScore.toFixed(1)}</p>
                <span className="text-2xl text-gray-500">/ 5.0</span>
              </div>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
              {getRatingIcon(csatData.overallScore)}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    size={20}
                    className={`${star <= Math.floor(csatData.overallScore) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(csatData.overallScore)}`}>
                {getRatingLabel(csatData.overallScore)}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              {csatData.trend.startsWith('+') ? (
                <TrendingUp size={16} className="text-green-600" />
              ) : (
                <TrendingDown size={16} className="text-red-600" />
              )}
              <span className={`text-sm font-medium ${csatData.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {csatData.trend} from last {timeRange}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Total Responses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Responses</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{csatData.totalResponses.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
              <Users size={24} className="text-green-600" />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ThumbsUp size={16} className="text-green-600" />
              <span className="text-sm text-gray-700">Positive: {csatData.breakdown[0].percentage + csatData.breakdown[1].percentage}%</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsDown size={16} className="text-red-600" />
              <span className="text-sm text-gray-700">Negative: {csatData.breakdown[3].percentage + csatData.breakdown[4].percentage}%</span>
            </div>
          </div>
        </motion.div>

        {/* NPS Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Net Promoter Score (NPS)</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">{nps.toFixed(0)}</p>
            </div>
            <div className="p-3 bg-white rounded-full shadow-sm">
              <BarChart3 size={24} className="text-purple-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Promoters: {promoters.toFixed(1)}%</span>
              <span className="text-gray-600">Detractors: {detractors.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500" style={{ width: '100%' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>Poor</span>
              <span>Average</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Breakdown and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Rating Breakdown */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 size={20} />
            Rating Breakdown
          </h3>
          
          <div className="space-y-4">
            {csatData.breakdown.map((item, index) => (
              <motion.div
                key={item.rating}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={14}
                          className={`${star <= item.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900 ml-1">{item.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600 w-32">{item.label}</span>
                </div>
                
                <div className="flex items-center gap-4 flex-1 max-w-md">
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right w-20">
                    <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                    <span className="text-xs text-gray-500 block">({item.count})</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Score Trend Chart */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            CSAT Trend ({timeRange})
          </h3>
          
          <div className="h-64 flex items-end justify-between gap-2 mt-8">
            {csatData.scores.map((monthData, index) => {
              const height = (monthData.score / 5) * 100;
              return (
                <motion.div
                  key={monthData.month}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  className="flex flex-col items-center flex-1"
                >
                  <div 
                    className="w-full bg-gradient-to-t from-indigo-500 to-indigo-600 rounded-t-lg min-h-[2px]"
                    style={{ height: `${height}%` }}
                  />
                  <div className="mt-2 text-center">
                    <span className="text-xs text-gray-600">{monthData.month}</span>
                    <div className="text-sm font-semibold text-gray-900">{monthData.score.toFixed(1)}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-gray-600">CSAT Score</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-600">Target (4.0)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown and Recent Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* By Category */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Scores by Category</h3>
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="all">All Categories</option>
                {csatData.byCategory.map(cat => (
                  <option key={cat.category} value={cat.category}>{cat.category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="space-y-3">
            {csatData.byCategory.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center justify-between p-4 rounded-lg border ${selectedCategory === category.category ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${getRatingColor(category.score)}`}>
                    {getRatingIcon(category.score)}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{category.category}</h4>
                    <p className="text-sm text-gray-500">{category.responses} responses</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          size={14}
                          className={`${star <= Math.floor(category.score) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-gray-900">{category.score.toFixed(1)}</span>
                  </div>
                  <span className={`text-xs font-medium ${category.score >= 4.0 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {getRatingLabel(category.score)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Feedback */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Feedback</h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
              {showDetails ? 'Show less' : 'View all'}
              <ChevronRight size={16} className={`transform transition-transform ${showDetails ? 'rotate-90' : ''}`} />
            </button>
          </div>
          
          <div className="space-y-4">
            {filteredFeedback.slice(0, showDetails ? filteredFeedback.length : 3).map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${getRatingColor(feedback.rating)}`}>
                      {feedback.rating >= 4 ? <ThumbsUp size={16} /> : <ThumbsDown size={16} />}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feedback.user}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              size={12}
                              className={`${star <= feedback.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{feedback.date}</span>
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {feedback.category}
                  </span>
                </div>
                
                <p className="text-gray-700 text-sm mt-3">{feedback.comment}</p>
                
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                  <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
                    <MessageSquare size={12} />
                    Reply
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    Flag
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-700 ml-auto">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredFeedback.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare size={32} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-600">No feedback found for this category</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Star size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Recommendation</p>
              <p className="font-medium text-gray-900">
                {csatData.overallScore >= 4.0 
                  ? 'Maintain current satisfaction levels' 
                  : 'Focus on improving customer support experience'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>Last updated: Today, 10:42 AM</span>
            <span>•</span>
            <span>Next survey: In 3 days</span>
            <span>•</span>
            <span>Response rate: 68%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;