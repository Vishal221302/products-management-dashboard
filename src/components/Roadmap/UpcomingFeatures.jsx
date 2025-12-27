import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Flag, Clock, Target, Zap, ChevronRight, MoreVertical, Star, AlertCircle } from 'lucide-react';

const UpcomingFeatures = () => {
  const [upcomingFeatures, setUpcomingFeatures] = useState([
    {
      id: 1,
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive analytics with predictive insights and customizable reports',
      priority: 'high',
      timeline: 'Q2 2024',
      progress: 15,
      team: 'Analytics Team',
      dependencies: 3,
      votes: 42,
      tags: ['analytics', 'dashboard', 'ai']
    },
    {
      id: 2,
      title: 'Mobile App Redesign',
      description: 'Complete UI/UX overhaul for better mobile experience',
      priority: 'medium',
      timeline: 'Q3 2024',
      progress: 10,
      team: 'Design Team',
      dependencies: 2,
      votes: 28,
      tags: ['mobile', 'design', 'ux']
    },
    {
      id: 3,
      title: 'AI-Powered Recommendations',
      description: 'Machine learning based recommendations engine',
      priority: 'high',
      timeline: 'Q1 2024',
      progress: 25,
      team: 'AI Team',
      dependencies: 5,
      votes: 56,
      tags: ['ai', 'machine-learning', 'recommendations']
    },
    {
      id: 4,
      title: 'Multi-language Support',
      description: 'Add support for 10+ international languages',
      priority: 'medium',
      timeline: 'Q2 2024',
      progress: 5,
      team: 'Localization',
      dependencies: 1,
      votes: 34,
      tags: ['localization', 'international']
    },
    {
      id: 5,
      title: 'Real-time Collaboration',
      description: 'Live collaboration features for team workspaces',
      priority: 'low',
      timeline: 'Q4 2024',
      progress: 0,
      team: 'Collaboration',
      dependencies: 4,
      votes: 19,
      tags: ['collaboration', 'real-time']
    }
  ]);

  const [expandedFeature, setExpandedFeature] = useState(null);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVote = (id) => {
    setUpcomingFeatures(prev => prev.map(feature => 
      feature.id === id ? { ...feature, votes: feature.votes + 1 } : feature
    ));
  };

  const toggleExpand = (id) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Target size={24} className="text-purple-600" />
            Upcoming Features
          </h2>
          <p className="text-gray-600 mt-1">Planned features for future releases</p>
        </div>
        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
          View all
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {upcomingFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow ${expandedFeature === feature.id ? 'ring-2 ring-indigo-100' : ''}`}
            >
              <div 
                className="p-5 cursor-pointer"
                onClick={() => toggleExpand(feature.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                        {feature.priority} priority
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {feature.timeline}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {feature.team}
                      </span>
                      <span className="flex items-center gap-1">
                        <Flag size={14} />
                        {feature.dependencies} dependencies
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <MoreVertical size={18} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(feature.id);
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm"
                    >
                      <Star size={14} />
                      {feature.votes}
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Planning progress</span>
                    <span className="font-medium text-gray-900">{feature.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${feature.progress}%` }}
                    />
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {feature.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Expanded Details */}
              <AnimatePresence>
                {expandedFeature === feature.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-200 bg-gray-50"
                  >
                    <div className="p-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <AlertCircle size={16} />
                            Prerequisites
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              Complete user research
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                              Finalize design mockups
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              Secure budget approval
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <Zap size={16} />
                            Next Actions
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Kickoff meeting</span>
                              <span className="text-xs text-gray-500">Due in 2 weeks</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Technical specs</span>
                              <span className="text-xs text-gray-500">Due in 3 weeks</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Resource allocation</span>
                              <span className="text-xs text-gray-500">Due in 1 week</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                        <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
                          Move to In Progress
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm">
                          Start Planning
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UpcomingFeatures;