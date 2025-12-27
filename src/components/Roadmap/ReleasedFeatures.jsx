import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Users, ThumbsUp, BarChart3, Download, ExternalLink, Calendar, Tag, Star, TrendingUp, MessageSquare } from 'lucide-react';

const ReleasedFeatures = () => {
  const [releasedFeatures, setReleasedFeatures] = useState([
    {
      id: 1,
      title: 'Advanced Search Filters',
      version: 'v2.3.0',
      releaseDate: '2024-01-15',
      impact: 'high',
      satisfaction: 4.8,
      adoption: '78%',
      feedback: 42,
      description: 'Enhanced search capabilities with smart filters and sorting',
      metrics: { users: '15K', engagement: '+45%', retention: '+12%' },
      tags: ['search', 'filters', 'ux']
    },
    {
      id: 2,
      title: 'Mobile Navigation Redesign',
      version: 'v2.2.5',
      releaseDate: '2023-12-10',
      impact: 'medium',
      satisfaction: 4.5,
      adoption: '92%',
      feedback: 28,
      description: 'Completely redesigned mobile navigation for better usability',
      metrics: { users: '28K', engagement: '+32%', retention: '+8%' },
      tags: ['mobile', 'navigation', 'design']
    },
    {
      id: 3,
      title: 'Real-time Notifications',
      version: 'v2.2.0',
      releaseDate: '2023-11-22',
      impact: 'high',
      satisfaction: 4.7,
      adoption: '85%',
      feedback: 56,
      description: 'Instant notifications system with customizable preferences',
      metrics: { users: '22K', engagement: '+68%', retention: '+15%' },
      tags: ['notifications', 'real-time', 'communication']
    },
    {
      id: 4,
      title: 'Export to PDF',
      version: 'v2.1.8',
      releaseDate: '2023-10-30',
      impact: 'medium',
      satisfaction: 4.3,
      adoption: '65%',
      feedback: 34,
      description: 'Export reports and dashboards as PDF files',
      metrics: { users: '12K', engagement: '+28%', retention: '+5%' },
      tags: ['export', 'reports', 'pdf']
    }
  ]);

  const [sortBy, setSortBy] = useState('date'); // 'date', 'impact', 'satisfaction'

  const getImpactColor = (impact) => {
    switch(impact) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedFeatures = [...releasedFeatures].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.releaseDate) - new Date(a.releaseDate);
    if (sortBy === 'impact') return impactValue(b.impact) - impactValue(a.impact);
    if (sortBy === 'satisfaction') return b.satisfaction - a.satisfaction;
    return 0;
  });

  function impactValue(impact) {
    switch(impact) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CheckCircle size={24} className="text-green-600" />
            Released Features
          </h2>
          <p className="text-gray-600 mt-1">Recently shipped features and their impact</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="date">Sort by Date</option>
            <option value="impact">Sort by Impact</option>
            <option value="satisfaction">Sort by Satisfaction</option>
          </select>
          
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
            <Download size={16} />
            Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {releasedFeatures.length}
              </p>
              <p className="text-sm text-gray-600">Features Released</p>
            </div>
            <TrendingUp size={24} className="text-green-600" />
          </div>
          <div className="text-xs text-green-600 mt-2">+3 this quarter</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {releasedFeatures.reduce((sum, f) => sum + f.satisfaction, 0) / releasedFeatures.length}
              </p>
              <p className="text-sm text-gray-600">Avg. Satisfaction</p>
            </div>
            <Star size={24} className="text-blue-600" />
          </div>
          <div className="text-xs text-blue-600 mt-2">+0.4 from last quarter</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {releasedFeatures.reduce((sum, f) => sum + f.feedback, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Feedback</p>
            </div>
            <MessageSquare size={24} className="text-purple-600" />
          </div>
          <div className="text-xs text-purple-600 mt-2">+42 this month</div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {releasedFeatures.reduce((sum, f) => parseFloat(f.adoption), 0) / releasedFeatures.length}%
              </p>
              <p className="text-sm text-gray-600">Avg. Adoption</p>
            </div>
            <Users size={24} className="text-orange-600" />
          </div>
          <div className="text-xs text-orange-600 mt-2">+15% from last release</div>
        </div>
      </div>

      {/* Released Features List */}
      <div className="space-y-4">
        {sortedFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(feature.impact)}`}>
                    {feature.impact} impact
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    {feature.version}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    Released {feature.releaseDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    {feature.satisfaction}/5 satisfaction
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {feature.adoption} adoption
                  </span>
                </div>
                
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{feature.metrics.users}</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{feature.metrics.engagement}</div>
                    <div className="text-xs text-gray-600">Engagement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{feature.metrics.retention}</div>
                    <div className="text-xs text-gray-600">Retention</div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ExternalLink size={18} />
                </button>
              </div>
            </div>
            
            {/* Feedback and Actions */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <MessageSquare size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700">{feature.feedback} feedback items</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-700">View analytics</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
                  View Feedback
                </button>
                <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm">
                  Case Study
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Release Calendar */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Upcoming Releases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { date: '2024-02-15', version: 'v2.4.0', features: 5, status: 'on-track' },
            { date: '2024-03-01', version: 'v2.4.1', features: 3, status: 'on-track' },
            { date: '2024-03-20', version: 'v2.5.0', features: 8, status: 'at-risk' },
          ].map((release, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="font-medium text-gray-900">{release.date}</span>
                  </div>
                  <div className="text-sm text-gray-600">{release.version}</div>
                  <div className="text-sm text-gray-600 mt-1">{release.features} features planned</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${release.status === 'on-track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {release.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReleasedFeatures;