import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UpcomingFeatures from '../components/Roadmap/UpcomingFeatures';
import InProgressTasks from '../components/Roadmap/InProgressTasks';
import ReleasedFeatures from '../components/Roadmap/ReleasedFeatures';
import PriorityManagement from '../components/Roadmap/PriorityManagement';
import TimelineKanbanView from '../components/Roadmap/TimelineKanbanView';
import { 
  Map, Filter, Calendar, Grid, List, Plus, 
  TrendingUp, Users, Target, Zap, ChevronRight,
  Download, RefreshCw, Settings
} from 'lucide-react';

const Roadmap = () => {
  const [activeView, setActiveView] = useState('timeline'); // 'timeline', 'kanban', 'list'
  const [timeFrame, setTimeFrame] = useState('quarter'); // 'month', 'quarter', 'year'
  const [activeFilter, setActiveFilter] = useState('all');

  // Roadmap stats
  const roadmapStats = [
    { label: 'Total Features', value: '48', icon: <Map size={20} />, change: '+12%', color: 'bg-blue-500' },
    { label: 'In Progress', value: '18', icon: <TrendingUp size={20} />, change: '+5', color: 'bg-yellow-500' },
    { label: 'Upcoming', value: '22', icon: <Target size={20} />, change: '+3', color: 'bg-purple-500' },
    { label: 'Released', value: '8', icon: <Zap size={20} />, change: '+2 this month', color: 'bg-green-500' },
    { label: 'Teams Involved', value: '6', icon: <Users size={20} />, change: '+1', color: 'bg-indigo-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-12">
  {/* Glass Header */}
  <div className="relative mb-10">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
    
    <div className="relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-soft">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-md"></div>
              <div className="relative p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-hard">
                <Map size={28} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Product Roadmap
              </h1>
              <p className="text-gray-600 mt-1">Visualize and manage your product development</p>
            </div>
          </div>
          
          {/* Status Indicators */}
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-700">All systems operational</span>
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl shadow-hard hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10 flex items-center gap-2">
              <Plus  size={20} />
              <span>New Feature</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </motion.button>
          
          <button className="p-3 bg-white/60 backdrop-blur-sm border border-white/40 text-gray-600 hover:text-gray-900 rounded-xl shadow-soft hover:shadow-hard transition-all duration-300">
            <Settings size={20} />
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Glass Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mb-10">
    {roadmapStats.map((stat, index) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group relative overflow-hidden bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-5 shadow-soft hover:shadow-hard transition-all duration-300"
      >
        {/* Gradient Background Effect */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${stat.color}`}></div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600 mt-1">{stat.label}</p>
            </div>
            <div className={`p-2.5 rounded-xl ${stat.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
              <div className={stat.color.replace('bg-', 'text-white')}>
                {stat.icon}
              </div>
            </div>
          </div>
          
          {/* Animated Change Indicator */}
          <div className="flex items-center gap-2">
            <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
              stat.change.startsWith('+') 
                ? 'bg-green-500/10 text-green-700' 
                : 'bg-red-500/10 text-red-700'
            }`}>
              {stat.change.startsWith('+') ? (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.change}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {stat.change}
                </span>
              )}
            </div>
            <span className="text-xs text-gray-500">vs last week</span>
          </div>
        </div>
        
        {/* Bottom Border Animation */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      </motion.div>
    ))}
  </div>

  {/* Progress Overview Bar */}
  <div className="mb-8">
    <div className="bg-gradient-to-r from-indigo-500/5 to-purple-500/5 backdrop-blur-sm border border-indigo-200/30 rounded-2xl p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">Current Sprint Progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Sprint #24 • Ends Feb 15</span>
                <span className="font-medium text-gray-900">42%</span>
              </div>
              <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">12</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="h-8 w-px bg-indigo-200/50"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">8</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="h-8 w-px bg-indigo-200/50"></div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Controls Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setActiveView('timeline')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${activeView === 'timeline' ? 'bg-white shadow-md text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Calendar size={18} />
                  Timeline
                </button>
                <button
                  onClick={() => setActiveView('kanban')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${activeView === 'kanban' ? 'bg-white shadow-md text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Grid size={18} />
                  Kanban
                </button>
                <button
                  onClick={() => setActiveView('list')}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${activeView === 'list' ? 'bg-white shadow-md text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <List size={18} />
                  List
                </button>
              </div>
            </div>

            {/* Filters and Timeframe */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Time Frame Selector */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Timeframe:</span>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {['month', 'quarter', 'year'].map(time => (
                    <button
                      key={time}
                      onClick={() => setTimeFrame(time)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${timeFrame === time ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {['all', 'high', 'medium', 'low', 'design', 'development', 'qa'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeFilter === filter ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {filter === 'all' ? 'All Items' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                  <RefreshCw size={20} />
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium">
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="space-y-8">
          {/* Priority Management Section */}
          <PriorityManagement />

          {/* View-Based Content */}
          {activeView === 'timeline' && (
            <TimelineKanbanView view="timeline" />
          )}
          
          {activeView === 'kanban' && (
            <TimelineKanbanView view="kanban" />
          )}

          {activeView === 'list' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <InProgressTasks />
                <UpcomingFeatures />
              </div>
              <div>
                <ReleasedFeatures />
              </div>
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Need help prioritizing?</h3>
                <p className="text-indigo-100">Schedule a roadmap review with our product experts</p>
              </div>
              <button className="flex items-center gap-2 bg-white text-indigo-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-colors">
                Book a Session
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;