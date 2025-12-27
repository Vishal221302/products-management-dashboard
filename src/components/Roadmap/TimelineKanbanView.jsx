import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Grid, ChevronLeft, ChevronRight, Plus, Filter, Download, RefreshCw, Move, Clock, Users, Flag } from 'lucide-react';

const TimelineKanbanView = ({ view = 'timeline' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFeature, setSelectedFeature] = useState(null);

  // Kanban board data
  const kanbanColumns = [
    {
      id: 'backlog',
      title: 'Backlog',
      color: 'bg-gray-100',
      features: [
        { id: 1, title: 'Multi-language Support', priority: 'medium', assignee: 'Localization Team', points: 5 },
        { id: 2, title: 'Advanced Search Filters', priority: 'low', assignee: 'Search Team', points: 3 },
        { id: 3, title: 'Export to CSV', priority: 'low', assignee: 'Backend Team', points: 2 },
      ]
    },
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-blue-100',
      features: [
        { id: 4, title: 'User Profile Redesign', priority: 'high', assignee: 'Design Team', points: 8 },
        { id: 5, title: 'API Documentation', priority: 'medium', assignee: 'DevOps', points: 5 },
      ]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      color: 'bg-yellow-100',
      features: [
        { id: 6, title: 'Dark Mode Implementation', priority: 'high', assignee: 'Frontend Team', points: 13 },
        { id: 7, title: 'Payment Gateway Update', priority: 'critical', assignee: 'Backend Team', points: 8 },
      ]
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'bg-purple-100',
      features: [
        { id: 8, title: 'Mobile Navigation', priority: 'medium', assignee: 'Mobile Team', points: 7 },
      ]
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-100',
      features: [
        { id: 9, title: 'Login Security Update', priority: 'high', assignee: 'Security Team', points: 5 },
        { id: 10, title: 'Analytics Dashboard', priority: 'medium', assignee: 'Analytics Team', points: 10 },
      ]
    }
  ];

  // Timeline data
  const timelineMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const timelineFeatures = [
    { id: 1, title: 'Q1 Planning', start: 0, end: 2, team: 'All Teams', type: 'planning' },
    { id: 2, title: 'Mobile Redesign', start: 1, end: 4, team: 'Mobile Team', type: 'development' },
    { id: 3, title: 'API v3 Launch', start: 3, end: 6, team: 'Backend Team', type: 'development' },
    { id: 4, title: 'Analytics v2', start: 4, end: 7, team: 'Analytics Team', type: 'development' },
    { id: 5, title: 'User Testing', start: 6, end: 8, team: 'QA Team', type: 'testing' },
    { id: 6, title: 'Q2 Planning', start: 8, end: 10, team: 'All Teams', type: 'planning' },
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'planning': return 'bg-purple-500';
      case 'development': return 'bg-blue-500';
      case 'testing': return 'bg-yellow-500';
      case 'design': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const handleDragStart = (e, featureId) => {
    e.dataTransfer.setData('featureId', featureId);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const featureId = e.dataTransfer.getData('featureId');
    console.log(`Moving feature ${featureId} to ${columnId}`);
    // In a real app, you would update state here
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  if (view === 'kanban') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Grid size={24} className="text-indigo-600" />
              Kanban Board
            </h2>
            <p className="text-gray-600 mt-1">Drag and drop to manage feature workflow</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
              <Filter size={16} />
              Filter
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {kanbanColumns.map(column => (
            <div
              key={column.id}
              className="bg-gray-50 rounded-xl p-4 min-h-[600px]"
              onDrop={(e) => handleDrop(e, column.id)}
              onDragOver={handleDragOver}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${column.color.replace('bg-', 'text-')} ${column.color}`}>
                  {column.features.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {column.features.map(feature => (
                  <motion.div
                    key={feature.id}
                    drag
                    draggable
                    onDragStart={(e) => handleDragStart(e, feature.id)}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm cursor-move"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(feature.priority)}`} />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{feature.assignee}</span>
                      <div className="flex items-center gap-2">
                        <span>{feature.points} pts</span>
                        <Move size={14} className="text-gray-400" />
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                <button className="w-full py-3 border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Add Feature
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Board Stats */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {kanbanColumns.map(column => (
              <div key={column.id} className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {column.features.length}
                </div>
                <div className="text-sm text-gray-600">{column.title}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {column.features.reduce((sum, f) => sum + f.points, 0)} story points
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Timeline View
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Calendar size={24} className="text-indigo-600" />
            Timeline View
          </h2>
          <p className="text-gray-600 mt-1">Visual roadmap with dependencies and milestones</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-gray-900">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Timeline Header */}
          <div className="flex border-b border-gray-200">
            <div className="w-48 flex-shrink-0 p-4 font-medium text-gray-700">Features</div>
            <div className="flex-1 grid grid-cols-12">
              {timelineMonths.map(month => (
                <div key={month} className="text-center p-4 border-r border-gray-200 font-medium text-gray-700">
                  {month}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Rows */}
          <div className="space-y-8 py-6">
            {timelineFeatures.map(feature => (
              <div key={feature.id} className="flex items-center">
                <div className="w-48 flex-shrink-0 p-4">
                  <div className="font-medium text-gray-900">{feature.title}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Users size={14} />
                    {feature.team}
                  </div>
                </div>
                
                <div className="flex-1 relative h-12">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((feature.end - feature.start + 1) / 12) * 100}%` }}
                    transition={{ duration: 0.5 }}
                    className={`absolute h-8 ${getTypeColor(feature.type)} rounded-lg flex items-center justify-center text-white text-sm font-medium`}
                    style={{ left: `${(feature.start / 12) * 100}%` }}
                  >
                    <div className="flex items-center gap-2 px-3">
                      {feature.title}
                      <span className="text-xs opacity-90">{feature.type}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Legend</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-600">Planning</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Testing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-500 rounded"></div>
            <span className="text-sm text-gray-600">Design</span>
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="mt-8">
        <h4 className="font-medium text-gray-900 mb-4">Upcoming Milestones</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { date: 'Feb 15, 2024', title: 'Q1 Release', status: 'on-track' },
            { date: 'Mar 30, 2024', title: 'Mobile Launch', status: 'at-risk' },
            { date: 'Apr 20, 2024', title: 'Enterprise Rollout', status: 'planned' },
          ].map((milestone, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Flag size={16} className="text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{milestone.title}</div>
                  <div className="text-sm text-gray-500">{milestone.date}</div>
                </div>
                <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${milestone.status === 'on-track' ? 'bg-green-100 text-green-800' : milestone.status === 'at-risk' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                  {milestone.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimelineKanbanView;