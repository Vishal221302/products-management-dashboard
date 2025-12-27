import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flag, Target, TrendingUp, Users, Clock, AlertCircle, Zap, BarChart3, Filter, MoreVertical, ChevronUp, ChevronDown } from 'lucide-react';

const PriorityManagement = () => {
  const [priorities, setPriorities] = useState([
    {
      id: 1,
      title: 'Mobile Performance Optimization',
      priority: 'critical',
      score: 95,
      impact: 9,
      effort: 6,
      urgency: 8,
      team: 'Mobile Team',
      timeline: 'Q1 2024',
      description: 'Critical performance issues affecting 30% of mobile users'
    },
    {
      id: 2,
      title: 'New Payment Integration',
      priority: 'high',
      score: 82,
      impact: 8,
      effort: 7,
      urgency: 7,
      team: 'Backend Team',
      timeline: 'Q1 2024',
      description: 'Integrate new payment gateway to reduce transaction fees'
    },
    {
      id: 3,
      title: 'User Onboarding Redesign',
      priority: 'high',
      score: 78,
      impact: 9,
      effort: 8,
      urgency: 6,
      team: 'Design Team',
      timeline: 'Q2 2024',
      description: 'Improve user activation rates with better onboarding'
    },
    {
      id: 4,
      title: 'Analytics Dashboard Upgrade',
      priority: 'medium',
      score: 65,
      impact: 7,
      effort: 6,
      urgency: 5,
      team: 'Analytics Team',
      timeline: 'Q2 2024',
      description: 'Enhanced analytics for business users'
    },
    {
      id: 5,
      title: 'Dark Mode Implementation',
      priority: 'medium',
      score: 58,
      impact: 6,
      effort: 7,
      urgency: 4,
      team: 'Frontend Team',
      timeline: 'Q3 2024',
      description: 'User-requested feature for better accessibility'
    }
  ]);

  const [sortBy, setSortBy] = useState('score');
  const [expandedPriority, setExpandedPriority] = useState(null);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityLabel = (priority) => {
    switch(priority) {
      case 'critical': return 'Critical';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Unknown';
    }
  };

  const calculateScore = (impact, effort, urgency) => {
    return Math.round((impact * 0.4 + urgency * 0.4 + (10 - effort) * 0.2) * 10);
  };

  const sortedPriorities = [...priorities].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'impact') return b.impact - a.impact;
    if (sortBy === 'effort') return a.effort - b.effort;
    if (sortBy === 'urgency') return b.urgency - a.urgency;
    return 0;
  });

  const handleReprioritize = (id, direction) => {
    const index = priorities.findIndex(p => p.id === id);
    if (index === -1) return;

    const newPriorities = [...priorities];
    if (direction === 'up' && index > 0) {
      [newPriorities[index], newPriorities[index - 1]] = [newPriorities[index - 1], newPriorities[index]];
    } else if (direction === 'down' && index < newPriorities.length - 1) {
      [newPriorities[index], newPriorities[index + 1]] = [newPriorities[index + 1], newPriorities[index]];
    }
    setPriorities(newPriorities);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Flag size={24} className="text-red-600" />
            Priority Management
          </h2>
          <p className="text-gray-600 mt-1">Score and prioritize features based on impact and effort</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="score">Sort by Score</option>
              <option value="impact">Sort by Impact</option>
              <option value="effort">Sort by Effort</option>
              <option value="urgency">Sort by Urgency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Priority Matrix */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Priority Matrix</h3>
          <div className="text-sm text-gray-500">Impact vs Effort Analysis</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Impact vs Effort Grid */}
          <div className="relative h-64 bg-gray-50 rounded-xl border border-gray-200 p-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full grid grid-cols-2 grid-rows-2">
                {/* Quadrant 1: High Impact, Low Effort */}
                <div className="border-r border-b border-gray-300 p-4">
                  <div className="text-green-600 font-medium text-sm">Quick Wins</div>
                  <div className="text-xs text-gray-500 mt-1">High Impact, Low Effort</div>
                </div>
                
                {/* Quadrant 2: High Impact, High Effort */}
                <div className="border-b border-gray-300 p-4">
                  <div className="text-blue-600 font-medium text-sm">Major Projects</div>
                  <div className="text-xs text-gray-500 mt-1">High Impact, High Effort</div>
                </div>
                
                {/* Quadrant 3: Low Impact, Low Effort */}
                <div className="border-r border-gray-300 p-4">
                  <div className="text-yellow-600 font-medium text-sm">Fill-ins</div>
                  <div className="text-xs text-gray-500 mt-1">Low Impact, Low Effort</div>
                </div>
                
                {/* Quadrant 4: Low Impact, High Effort */}
                <div className="p-4">
                  <div className="text-red-600 font-medium text-sm">Thankless Tasks</div>
                  <div className="text-xs text-gray-500 mt-1">Low Impact, High Effort</div>
                </div>
              </div>
            </div>
            
            {/* Data Points */}
            {priorities.map((priority, index) => {
              const x = (priority.impact / 10) * 100;
              const y = 100 - (priority.effort / 10) * 100;
              
              return (
                <div
                  key={priority.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div className={`w-4 h-4 rounded-full ${getPriorityColor(priority.priority)} border-2 border-white shadow-md`} />
                </div>
              );
            })}
          </div>
          
          {/* Scoring Methodology */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Scoring Methodology</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Impact (40%)</span>
                  <span className="font-medium text-gray-900">Business value and user benefit</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full w-2/5" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Urgency (40%)</span>
                  <span className="font-medium text-gray-900">Time sensitivity and deadlines</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full w-2/5" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Inverse Effort (20%)</span>
                  <span className="font-medium text-gray-900">Lower effort = higher score</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full w-1/5" />
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    Score = (Impact × 0.4) + (Urgency × 0.4) + (10-Effort × 0.2)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Priority List */}
      <div className="space-y-4">
        {sortedPriorities.map((priority, index) => (
          <motion.div
            key={priority.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleReprioritize(priority.id, 'up')}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      disabled={index === 0}
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button 
                      onClick={() => handleReprioritize(priority.id, 'down')}
                      className="p-1 text-gray-400 hover:text-gray-600"
                      disabled={index === priorities.length - 1}
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  
                  <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority.priority)}`} />
                  
                  <h3 className="font-semibold text-gray-900">{priority.title}</h3>
                  
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                    #{index + 1} Priority
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{priority.description}</p>
                
                {/* Metrics */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{priority.score}</div>
                    <div className="text-xs text-gray-600">Priority Score</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{priority.impact}/10</div>
                    <div className="text-xs text-gray-600">Impact</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{priority.effort}/10</div>
                    <div className="text-xs text-gray-600">Effort</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{priority.urgency}/10</div>
                    <div className="text-xs text-gray-600">Urgency</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={14} />
                    {priority.team}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {priority.timeline}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical size={18} />
                </button>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getPriorityColor(priority.priority)}`}>
                    {getPriorityLabel(priority.priority)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
              <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
                Re-evaluate
              </button>
              <button className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg text-sm">
                Approve Priority
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PriorityManagement;