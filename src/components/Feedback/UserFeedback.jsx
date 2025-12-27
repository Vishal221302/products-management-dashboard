// components/feedback/UserFeedback.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Filter,
  Download,
  MoreVertical,
  User,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  MessageCircle,
  AlertCircle
} from 'lucide-react';

const UserFeedback = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [feedbackType, setFeedbackType] = useState('all');

  const timeRanges = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' }
  ];

  const feedbackTypes = [
    { id: 'all', label: 'All Feedback', color: 'from-blue-500 to-cyan-500' },
    { id: 'positive', label: 'Positive', color: 'from-emerald-500 to-teal-500' },
    { id: 'negative', label: 'Negative', color: 'from-rose-500 to-pink-500' },
    { id: 'suggestions', label: 'Suggestions', color: 'from-purple-500 to-indigo-500' }
  ];

  // Sample feedback data
  const feedbackData = [
    {
      id: 1,
      user: 'Alex Johnson',
      avatarColor: 'bg-blue-500',
      rating: 5,
      comment: 'Absolutely love the new dashboard design! The analytics are much easier to understand now.',
      date: '2 hours ago',
      type: 'positive',
      category: 'UI/UX',
      helpful: 24,
      status: 'reviewed',
      tags: ['UI', 'Dashboard', 'Analytics']
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      avatarColor: 'bg-purple-500',
      rating: 2,
      comment: 'Mobile app crashes frequently when loading product images. Please fix this ASAP.',
      date: '5 hours ago',
      type: 'negative',
      category: 'Bug',
      helpful: 18,
      status: 'pending',
      tags: ['Mobile', 'Bug', 'Critical']
    },
    {
      id: 3,
      user: 'Michael Chen',
      avatarColor: 'bg-emerald-500',
      rating: 4,
      comment: 'Could you add export functionality for the reports? It would save us a lot of time.',
      date: '1 day ago',
      type: 'suggestions',
      category: 'Feature Request',
      helpful: 32,
      status: 'in-progress',
      tags: ['Export', 'Reports', 'Feature']
    },
    {
      id: 4,
      user: 'Emma Davis',
      avatarColor: 'bg-amber-500',
      rating: 5,
      comment: 'Customer support was amazing! They resolved my issue within minutes.',
      date: '2 days ago',
      type: 'positive',
      category: 'Support',
      helpful: 45,
      status: 'resolved',
      tags: ['Support', 'Service', 'Helpful']
    },
    {
      id: 5,
      user: 'David Brown',
      avatarColor: 'bg-rose-500',
      rating: 1,
      comment: 'Payment gateway keeps failing during checkout. Lost 3 customers because of this.',
      date: '3 days ago',
      type: 'negative',
      category: 'Bug',
      helpful: 29,
      status: 'pending',
      tags: ['Payment', 'Critical', 'Checkout']
    },
    {
      id: 6,
      user: 'Lisa Taylor',
      avatarColor: 'bg-indigo-500',
      rating: 3,
      comment: 'The search functionality could be improved. Filters are not working properly.',
      date: '4 days ago',
      type: 'suggestions',
      category: 'Improvement',
      helpful: 15,
      status: 'reviewed',
      tags: ['Search', 'Filters', 'Improvement']
    }
  ];

  // Filter feedback based on type
  const filteredFeedback = feedbackType === 'all' 
    ? feedbackData 
    : feedbackData.filter(f => f.type === feedbackType);

  // Calculate statistics
  const totalFeedback = feedbackData.length;
  const positiveFeedback = feedbackData.filter(f => f.type === 'positive').length;
  const negativeFeedback = feedbackData.filter(f => f.type === 'negative').length;
  const averageRating = (feedbackData.reduce((sum, f) => sum + f.rating, 0) / totalFeedback).toFixed(1);

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

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'reviewed': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'pending': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'positive': return 'bg-emerald-500';
      case 'negative': return 'bg-rose-500';
      case 'suggestions': return 'bg-purple-500';
      default: return 'bg-gray-500';
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">User Feedback</h2>
              <p className="text-gray-500 text-sm mt-1">Customer reviews, ratings, and suggestions</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <motion.div 
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-blue-600">Total Feedback</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalFeedback}</div>
            <div className="text-xs text-gray-500 mt-1">This {timeRange}</div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-emerald-600" />
              <div className="text-sm text-emerald-600">Avg. Rating</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{averageRating}/5</div>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(averageRating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <ThumbsUp className="w-5 h-5 text-emerald-600" />
              <div className="text-sm text-emerald-600">Positive</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{positiveFeedback}</div>
            <div className="text-xs text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3 inline mr-1" />
              +12.5% this month
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl"
          >
            <div className="flex items-center gap-3 mb-2">
              <ThumbsDown className="w-5 h-5 text-rose-600" />
              <div className="text-sm text-rose-600">Negative</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">{negativeFeedback}</div>
            <div className="text-xs text-emerald-600 mt-1">
              <TrendingDown className="w-3 h-3 inline mr-1" />
              -8.3% this month
            </div>
          </motion.div>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Time Range Selector */}
            <div className="flex items-center gap-2">
              {timeRanges.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setTimeRange(range.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    timeRange === range.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Feedback Type Selector */}
            <div className="flex flex-wrap gap-2">
              {feedbackTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setFeedbackType(type.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    feedbackType === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedback.map((feedback) => (
            <motion.div
              key={feedback.id}
              variants={itemVariants}
              className="p-5 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-white transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left Column - User & Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    {/* User Avatar */}
                    <div className={`w-12 h-12 rounded-full ${feedback.avatarColor} flex items-center justify-center`}>
                      <User className="w-6 h-6 text-white" />
                    </div>

                    {/* Feedback Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{feedback.user}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(feedback.status)}`}>
                              {feedback.status}
                            </div>
                            <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700`}>
                              {feedback.category}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{feedback.date}</div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < feedback.rating ? 'text-amber-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Comment */}
                      <p className="text-gray-700 mb-4">{feedback.comment}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {feedback.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs text-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Actions & Metrics */}
                <div className="lg:w-48 flex flex-col gap-3">
                  {/* Helpful Count */}
                  <div className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Helpful</span>
                      </div>
                      <span className="font-semibold text-gray-900">{feedback.helpful}</span>
                    </div>
                  </div>

                  {/* Type Indicator */}
                  <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(feedback.type)}`} />
                    <span className="text-sm font-medium text-gray-700 capitalize">{feedback.type}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                      <MessageCircle className="w-4 h-4" />
                      Reply
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200">
                      <CheckCircle className="w-4 h-4" />
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feedback Summary */}
        <motion.div 
          variants={itemVariants}
          className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-gray-600 mb-2">Sentiment Distribution</div>
              <div className="space-y-2">
                {[
                  { label: 'Positive', value: positiveFeedback, color: 'bg-emerald-500', percent: Math.round((positiveFeedback / totalFeedback) * 100) },
                  { label: 'Negative', value: negativeFeedback, color: 'bg-rose-500', percent: Math.round((negativeFeedback / totalFeedback) * 100) },
                  { label: 'Suggestions', value: totalFeedback - positiveFeedback - negativeFeedback, color: 'bg-purple-500', percent: Math.round(((totalFeedback - positiveFeedback - negativeFeedback) / totalFeedback) * 100) }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                      <div className="text-xs text-gray-500">{item.percent}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Response Time</div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">Avg. Response Time</span>
                    <span className="font-semibold text-gray-900">2.4 hours</span>
                  </div>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">Resolution Rate</span>
                    <span className="font-semibold text-gray-900">89.5%</span>
                  </div>
                  <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      initial={{ width: 0 }}
                      animate={{ width: '89.5%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="text-sm text-gray-600 mb-2">Top Categories</div>
              <div className="space-y-2">
                {['UI/UX', 'Bugs', 'Feature Requests', 'Performance', 'Support'].map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-white/50 rounded-lg">
                    <span className="text-sm text-gray-700">{category}</span>
                    <span className="text-sm font-semibold text-gray-900">{Math.floor(Math.random() * 30) + 10}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserFeedback;